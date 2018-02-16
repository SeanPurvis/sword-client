import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import {
  checkIndexAuthorization,
  checkDashboardAuthorization,
} from './lib/check-auth'

// Import our components
import App from './App'
import Login from './login'
import Dashboard from './dashboard'
import './index.css'

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
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */
const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // Allows Redux DevTools to watch sagas
)
// End Optional

// Begin Index saga
sagaMiddleware.run(IndexSagas)

// Setup top level router component with React Router
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute onEnter={checkIndexAuthorization(store)} />
        <Route onEnter={checkIndexAuthorization(store)} path="/login" component={Login}/>
        <Route onEnter={checkDashboardAuthorization(store)} path="/dashboard" component={Dashboard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
  )
