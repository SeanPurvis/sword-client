import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './configureStore'

import 'bootstrap/dist/css/bootstrap.min.css'

// Import our app
import App from './app/App'

// Setup top level router component with React Router
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
