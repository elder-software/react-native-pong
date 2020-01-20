import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity } from 'react-native';

const BackArrow = ({ onPress, children }) => {
  const { buttonStyle, containerStyle } = styles;

  return (
    <View style={containerStyle} >
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginLeft: Platform.OS === 'ios' ? 10 : 10
        }}>
        <Icon
          name="chevron-left"
          size={25}
          iconStyle={buttonStyle}
          backgroundColor='#053c1f'
          color='white'
        />
      </TouchableOpacity>
    </View>
  );
};


styles = {
  buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 5,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10
  },
  containerStyle: {
    backgroundColor: 'black',
    marginRight: 5
  }
};

export { BackArrow };