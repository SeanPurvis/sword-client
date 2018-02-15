import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, browserHistory } from 'react-router'

// Import our components
import App from './App'
import Login from './login'
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
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window._REUDX_DEVTOOLS_EXTENSION_COMPOSE_ ?
  window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ : compose

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
        <Route path="/login" component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
  )
