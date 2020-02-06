import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

/**
 * Simple reusable button component
 */
const Button = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'DigitalDisco',
  },
  buttonStyle: {
    // flex: 1,
    // alignSelf: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  }
};

export { Button };
