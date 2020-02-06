import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Router from './Router';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <Router />
      </View>
    );
  }
}

export default App;