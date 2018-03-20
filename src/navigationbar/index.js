import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

class Navigationbar extends Component {
  render() {
    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Sword</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <IndexLinkContainer to="/login">
            <NavItem eventKey={2}>Login</NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to="/users">
            <NavItem eventKey={4}>Users</NavItem>
          </IndexLinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigationbar
