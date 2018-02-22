import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import { userCreate } from './actions'

const usernameRequired = value => (value ? undefined : 'Username Required')

class Users extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      token: PropTypes.object.isRequired
    }),
    users: PropTypes.shape({
      list: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array
    }).isRequired,
    userCreate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
  }
  submit = user => {
    const { client, userCreate, reset } = this.props
    userCreate(client, user)
    reset()
  }

  render() {
    return (
      <div className="users">
        <form className="user-form">
          <h2>CREATE USER</h2>
          <label htmlFor="username">Username:</label>
          <Field
            name="username"
            type="text"
            id="username"
            className="username"
            label="Username"
            component="input"
          />
          <br />
          <label htmlFor="name">Name:</label>
          <Field
            name="name"
            type="text"
            id="name"
            className="name"
            label="name"
            component="input"
          />
          <br />
          <label htmlFor="phone">Phone:</label>
          <Field
            name="phone"
            type="text"
            id="phone"
            className="phone"
            label="phone"
            component="input"
          />
          <br />
          <label htmlFor="password">Password:</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="password"
            component="input"
          />
          <br />
          <label htmlFor="employer">Employer:</label>
          <Field
            name="employer"
            type="text"
            id="employer"
            className="employer"
            label="employer"
            component="input"
          />
          <br />
          <label htmlFor="email">Email:</label>
          <Field
            name="email"
            type="email"
            id="email"
            className="email"
            label="email"
            component="input"
          />
          <br />
          <label htmlFor="role">Role:</label>
          <Field
            name="role"
            id="role"
            className="role"
            label="role"
            component="select">
            <option />
            <option value="adminjail">adminjail</option>
            <option value="admincourt">admincourt</option>
            <option value="nurse">nurse</option>
            <option value="jailer">jailer</option>
            <option value="clerk">clerk</option>
            <option value="counselor">counselor</option>
          </Field>
        </form>
      </div>
    )
  }
}

// Pull in client and user state
const mapStateToProps = state => ({
  client: state.client,
  users: state.users
})

// Make client, user, and userCreate() available in props
const connected = connect(mapStateToProps, { userCreate })(Users)
const formed = reduxForm({
  form: 'users'
})(connected)

export default formed
