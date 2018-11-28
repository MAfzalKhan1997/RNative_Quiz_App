import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigation/AppNavigator' 

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
      </View>
    );
  }
}