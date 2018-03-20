import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

// Bootstrap Stuff
import 'bootstrap/dist/css/bootstrap.min.css'

// Import our app
import App from './app/App'

// Import index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// Setup saga middleware to watch between reducers and actions
const sagaMiddleware = createSagaMiddleware()

/**
Redux DevTools - optional chrome extension to debug state changes.
This is neccessary for it to work with redux saga.
If you do not wish to use this extension edit this to:
const store = createStore(
  IndexReducer,
  applyMiddleware(sagaMiddleware)
)
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
// End Optional

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)) // Allows Redux DevTools to watch sagas
)

// Begin Index saga
sagaMiddleware.run(IndexSagas)

// Setup top level router component with React Router
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
