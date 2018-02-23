import React, { Component } from 'react'
import { Link } from 'react-router'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <h2>DASHBOARD</h2>
        <Link to="/users">
          <button type="button">USERS</button>
        </Link>
      </div>
    )
  }
}

export default Dashboard
