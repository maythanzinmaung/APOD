import React from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Overall from './overall.js';
import DetailData from './detail.js';



const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Overall,
    },
    Detail: {
      screen: DetailData,
    },
  },
  {
    initialRouteName : "Home" 
  },
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppContainer;