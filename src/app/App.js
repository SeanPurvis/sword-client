import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Navigationbar from '../navigationbar/index.js'
import Users from '../users'
import Login from '../login/components/'

// import { store } from '../configureStore'

// TODO: Implement Authorization

class App extends Component {
  render() {
    //  let loggedIn = store.getState().client.token
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigationbar />
            <Route
              path="/login"
              // render={() => (loggedIn ? <Redirect to="/users" /> : <Login />)}
              render={() => <Login />}
            />
            <Route path="/" render={() => <Redirect to="/login" />} />
            <Route
              path="/users"
              // render={() => (loggedIn ? <Users /> : <Redirect to="/login" />)}
              render={() => <Users />}
            />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
