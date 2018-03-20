import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
class Dashboard extends Component {
  render() {
    return (
      // <div className="dashboard">
      //   <h2>DASHBOARD</h2>
      //   <Link to="/users">
      //     <button type="button">USERS</button>
      //   </Link>
      // </div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/dashboard">SWORD DASHBOARD</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/users">
              USERS
            </NavItem>
            <NavItem eventKey={2} href="/login">
              LOGIN
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Dashboard
