import React from 'react';
import { Spring } from 'react-spring/renderprops'
import Eye from 'Eye';
import './Face.css';


class Face extends React.PureComponent {
  state = {
    positivity: 0,
    intensity: 0,
    prospection: 0,
    externality: 0,
    surprise: 0,
  }

  componentDidMount() {
    this.loop();
  }

  componentWillUnmount() {
    clearTimeout(this.beatTimeout);
  }

  loop = () => {
    this.updateEmotions();

    this.beatTimeout = setTimeout(this.loop, 1000 + 2000 * Math.random());
  }

  updateEmotions = () => {
    this.setState({
      intensity: Math.random(),
      positivity: Math.random(),
      prospection: Math.random(),
      externality: Math.random(),
      surprise: Math.random(),
    });
  }

  render() {
    return (
      <Spring from={{...this.state}} to={{...this.state}}>
        { emotion => (
          <div className="face">
            <Eye {...emotion} />
            <div className="spacer" />
            <Eye {...emotion} flipX={true} />
          </div>
        )}
      </Spring>
    )
  }
}


export default Face
