import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../common';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
        <Text style={{
          // fontFamily: 'DigitalDisco-Thin',
          color: 'white',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 40,
          padding: 20
        }}>
          PONG
        </Text>
        <Button
          style={{ flex: 0 }}
          onPress={() => this.props.navigation.navigate('Game')}>
          PLAY
        </Button>
      </View>
    );
  }
}

export default HomeScreen;
