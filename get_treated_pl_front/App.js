import React from 'react'
import { Provider } from 'react-native-paper'

import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import { FIREBASE_CONFIG } from './src/core/config'
import RootNavigator from './src/navigation/RootNavigator'
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs();

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

const App = () => {
  return (
    <Provider theme={theme}>
      <RootNavigator />
    </Provider>
  )
}

export default App
