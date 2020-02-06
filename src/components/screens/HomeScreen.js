import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../common';
import { homeScreenTitleText } from './styles';

/**
 * Home screen, contains the title "PONG" and the button "PLAY"
 */
class HomeScreen extends Component {
  // Removes header from 
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
        <Text style={homeScreenTitleText}>
          PONG
        </Text>
        <View>
          <Button
            style={{ flex: 0 }}
            onPress={() => this.props.navigation.navigate('Game')}>
            PLAY
        </Button>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
