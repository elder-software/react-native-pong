import React from 'react';
import { View } from 'react-native';

/**
 * Used to draw circles within the react native game engine and matter.js
 * Created using a simple View component
 * @param props used to set component props from the calling class
 */
const Circle = ({ body, color, size }) => {
  const { position } = body;

  const x = position.x - size[0] / 2;
  const y = position.y - size[1] / 2;
  return (
    <View style={{
      position: 'absolute',
      width: size[0],
      height: size[1],
      left: x,
      top: y,
      backgroundColor: color,
      borderRadius: size[0]
    }} />
  );
};

export { Circle };
