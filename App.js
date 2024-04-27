import React, {useEffect} from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavTabs } from './src/navigation';

export const Tab = createBottomTabNavigator();

const App = () => {
  requestLocationPermission()
  return (
      <NavigationContainer>
        <NavTabs />
      </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  body: {

  },
});