import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Navigationbar from '../navigationbar/index.js'
import Users from '../users'
import Login from '../login/components/'
import { store } from '../configureStore'
import { checkIndexAuthorization } from '../lib/check-auth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigationbar />
            <Route path="/" onEnter={checkIndexAuthorization(store)} />
            <Route path="/login" component={Login} />
            <Route path="/users" component={Users} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
