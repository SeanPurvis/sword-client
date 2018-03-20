import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Dashboard from './dashboard/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SWORD</h1>
        </header>
        <Dashboard />
        {this.props.children}
      </div>
    )
  }
}

export default App
