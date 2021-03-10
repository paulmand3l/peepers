import _ from 'lodash'
import {
  matrix,
  zeros,
  size,
  transpose,
  multiply
} from 'mathjs'
import Vector2 from 'lib/Vector2'


class ExpressionSimulator {
  constructor(features, muscles, recipes, options={}) {
    this.features = features;
    this.muscles = muscles;
    this.recipes = recipes;
    this.state = {};
    this.options = {};

    this.forEachPoint((point, i, featureName) => {
      point.origin = new Vector2(point.x, point.y);
      point.position = point.origin.clone();
      point.velocity = new Vector2(0, 0);
      point.acceleration = new Vector2(0, 0);
      point.muscles = {};

      _.forEach(this.muscles, (muscle, muscleName) => {
        muscle.activation = 0;
        if (muscle.attachments[featureName] && muscle.attachments[featureName][i]) {
          point.muscles[muscleName] = muscle;
        }
      });
    })
  }

  forEachPoint(fn) {
    _.forEach(this.features, (feature, featureName) => {
      feature.forEach((point, i) => {
        fn(point, i, featureName);
      });
    });
  }

  setState(state) {
    _.forEach(this.muscles, muscle => muscle.activation = 0)
    _.forEach(state, (value, attribute) => {
      _.forEach(this.recipes[attribute], (weight, name) => {
        const muscle = this.muscles[name];
        muscle.activation = 1 - ((1 - weight*value) * (1 - muscle.activation))
      });
    })
  }

  loop(dt) {
    if (dt === 0) return;

    this.forEachPoint((point, i, featureName) => {
      const force = this.getForceOnPoint(point, i, featureName);

      point.acceleration = force;
      point.velocity.plusEquals(point.acceleration.scale(dt));
      point.position.plusEquals(point.velocity.scale(dt));
    });
  }

  getForceOnPoint(point, i, featureName) {
    // Gravity
    const force = new Vector2(0, 1);

    // Skin pull
    const offset = point.position.minus(point.origin);
    if (offset.length() > 0) {
      // const pull = Math.max(...[
      //   offset.length() / 5,
      //   offset.length() - 40,
      //   offset.length() * 3 - 200,
      // ]);
      const pull = 1 / (Math.cos(Math.PI/2 * offset.length() / 100)**2) - 1;
      const skinPullForce = offset.unit().scale(-pull);
      // console.log('skin pull', skinPullForce);
      force.plusEquals(skinPullForce);
    }

    // Damping
    const dampingForce = point.velocity.scale(-10);
    // console.log('damping force', dampingForce);
    force.plusEquals(dampingForce);

    // Muscles
    _.forEach(point.muscles, (muscle, muscleName) => {
      const originalLength = point.origin.minus(muscle.origin).length();
      const freeLength = originalLength - muscle.stroke * muscle.activation;
      // console.log('originalLength', originalLength, 'freeLength', freeLength)

      const delta = point.position.minus(muscle.origin);
      const displacement = Math.max(0, delta.length() - freeLength);
      // console.log('delta', delta, 'deltaLength', delta.length(), 'displacement', displacement);

      if (delta.length() === 0 || displacement === 0) return;

      const weight = muscle.attachments[featureName][i];
      const pull = displacement * muscle.strength * muscle.activation * weight;
      const muscleForce = delta.unit().scale(-pull);
      // console.log(muscleName, 'force', muscleForce);

      force.plusEquals(muscleForce);
    });

    return force
  }
}


export default ExpressionSimulator
