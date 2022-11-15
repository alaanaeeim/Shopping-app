import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigations/AppNavigation';
import store from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
