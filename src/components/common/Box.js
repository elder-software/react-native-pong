import React, { Component } from 'react';
import { View } from 'react-native';

/**
 * Used to draw boxes within the react native game engine and matter.js
 * Created using a simple View component
 * @param props used to set component props from the calling class
 */
const Box = ({ body, size, xAdjustment, yAdjustment, color }) => {
  const width = size[0];
  const height = size[1];
  const xAdjust = xAdjustment ? xAdjustment : 0;
  const yAdjust = yAdjustment ? yAdjustment : 0;

  const x = body.position.x - width / 2 + xAdjust;
  const y = body.position.y - height / 2 - yAdjust;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: color
      }}
    />
  );
};

export { Box };
