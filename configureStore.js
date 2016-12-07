import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
export default function configureStore () {
  const store = createStore(rootReducer)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}