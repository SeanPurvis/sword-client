import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import { unsetClient } from '../client/actions'

class Navigationbar extends Component {
  logout = () => {
    const { dispatch } = this.props
    dispatch(unsetClient())
  }
  render() {
    return (
      <Navbar fluid inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/login">SWORD</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <IndexLinkContainer onClick={this.logout} to="/login">
            <NavItem eventKey={1}>Logout</NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to="/users">
            <NavItem eventKey={2}>Users</NavItem>
          </IndexLinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client
})

connect(mapStateToProps)(Navigationbar)

export default Navigationbar
