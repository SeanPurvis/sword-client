import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { unsetClient } from '../client/actions'

class Navigationbar extends Component {
  logout = values => {
    this.props.unsetClient()
  }
  render() {
    const onLogoutClick = this.props
    return (
      <Navbar fluid inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/login">SWORD</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <IndexLinkContainer
            onClick={(() => onLogoutClick, localStorage.clear())}
            to="/login">
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

connect(mapStateToProps, { unsetClient })(Navigationbar)

export default Navigationbar
