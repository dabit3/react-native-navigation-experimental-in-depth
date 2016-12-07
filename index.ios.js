import React from 'react'
import { AppRegistry } from 'react-native'
import NavRootContainer from './NavRootContainer'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
const store = configureStore()

const App = () => (
  <Provider store={store}>
    <NavRootContainer />
  </Provider>
)

AppRegistry.registerComponent('navexperimentalproject', () => App);