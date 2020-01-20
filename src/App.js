import React, { Component } from 'react';
import { View } from 'react-native';
import Router from './Router';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router />
    );
  }
}

export default App;