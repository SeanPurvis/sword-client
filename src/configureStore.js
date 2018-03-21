import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore, compose } from 'redux'

import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// Setup saga middleware to watch between reducers and actions
const sagaMiddleware = createSagaMiddleware()

/**
Redux DevTools - optional chrome extension to debug state changes.
This is neccessary for it to work with redux saga.
**/
// Begin Optional
/*eslint-disable */
const composeSetup =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
/*eslint-enable */
// End Optiona

export const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)) // Allows Redux DevTools to watch sagas
)

sagaMiddleware.run(IndexSagas)
