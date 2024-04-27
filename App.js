import React, {useEffect} from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { NavTabs } from './src/navigation';

const App = () => {
  return (
      <NavigationContainer>
        <NavTabs />
      </NavigationContainer>
  );
}

export default App;

// const styles = StyleSheet.create({
//   body: {

//   },
// });