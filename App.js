import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AppNavigation } from './src/navigation/AppNavigation';
import AppLoading from 'expo-app-loading';
import { bootstrap } from './src/bootstrap';
import { Provider } from 'react-redux';
import {store} from './src/store/store';


export default function App() {
  const [isReady, setIsReady] = useState(false)

  if(!isReady) {
    return (
      <AppLoading 
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
