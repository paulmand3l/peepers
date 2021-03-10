import React from 'react'
import { Stage, Layer, Circle } from 'react-konva'


const LEDMatrix = props => {
  const {
    width = 240,
    height = 240,
    dotsPerRow = 15,
    dotsPerCol = 15,
    dotRadius = 3,
    dotBlurRadius = 3,
    color = "#3498db",
  } = props;

  const colSpacing = width / (dotsPerRow + 1);
  const rowSpacing = height / (dotsPerCol + 1);

  const dots = [];

  for (let row = 0; row < dotsPerCol; row++) {
    for (let col = 0; col < dotsPerRow; col++) {
      const x = (col + 1) * colSpacing;
      const y = (row + 1) * rowSpacing;
      const brightness = Math.max(0, Math.min(1, props.brightness(x, y)));

      dots.push(
        <Circle key={`${row},${col}`} x={x} y={y} radius={dotRadius + dotBlurRadius}
          fillRadialGradientStartPoint={{ x: 0, y: 0 }}
          fillRadialGradientStartRadius={dotRadius}
          fillRadialGradientEndPoint={{ x: 0, y: 0 }}
          fillRadialGradientEndRadius={dotRadius + dotBlurRadius}
          fillRadialGradientColorStops={[0, color, 1, '#000000']}
          fillPriority="radial-gradient"
          opacity={brightness}/>
      )
    }
  }

  return (
    <Stage width={width} height={height}>
      <Layer>
        { dots }
      </Layer>
    </Stage>
  )
}


export default LEDMatrix
