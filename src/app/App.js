import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Navigationbar from '../navigationbar/index.js'
import Users from '../users'
import Login from '../login'
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigationbar />
            <Route exact path="/login" component={Login} />

            <Route exact path="/users" component={Users} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
