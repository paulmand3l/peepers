import _ from 'lodash'
import React from 'react'
import LEDMatrix from './LEDMatrix'


class Eye extends React.PureComponent {
  componentDidMount() {
    this.updateLids();
  }

  updateLids() {
    const {
      intensity,
      positivity,
      prospection,
      externality,
      surprise,
    } = this.props;

    this.upperLid = {
      x: this.props.size/2,
      y: 50 - this.props.size/2*surprise,
      slope: (externality - .5) * (1 - positivity),
      curvature: 0,
    };

    this.lowerLid = {
      x: this.props.size/2,
      y: this.props.size - this.props.size/2*positivity,
      slope: 0,
      curvature: positivity/2,
    };
  }

  getBrightness = (x, y) => {
    if (this.props.flipX) x = this.props.size - x;

    const cx = 2 * x / this.props.size - 1;
    const cy = 2 * y / this.props.size - 1;
    const angle = Math.atan2(cy, cx);

    const openness = Math.max(0.001, this.props.openness);
    const cr = Math.sqrt(cx**2 + (cy/openness)**2);
    let brightness = 1 - cr**(1 + this.props.dilation*3);

    let blurRadius = 30;

    if (this.props.shape === 'star') {
      const section = Math.floor(angle / (Math.PI / 5));
      const sr = (angle - section);
    }

    //upper lid
    const uly = this.upperLid.y - this.upperLid.slope * (x - this.upperLid.x) + 2 * this.upperLid.curvature * (x - this.upperLid.x)**2 / this.props.size;
    brightness *= Math.max(0, Math.min(1, (y - uly)/blurRadius));

    const lly = this.lowerLid.y - this.lowerLid.slope * (x - this.lowerLid.x) + 2 * this.lowerLid.curvature * (x - this.lowerLid.x)**2 / this.props.size;
    brightness *= Math.max(0, Math.min(1, (lly - y)/blurRadius));

    return brightness;
  }

  render() {
    this.updateLids();

    return (
      <LEDMatrix width={240} height={240} brightness={this.getBrightness} />
    )
  }
}


Eye.defaultProps = {
  intensity: 0,
  positivity: 0,
  prospection: 0,
  externality: 0,
  surprise: 0,

  size: 240,
  dilation: .2,
  openness: 1,

  flipX: false,
};


export default Eye
