import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Table
} from 'react-bootstrap'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import { userCreate, userRequest } from './actions'

const usernameRequired = value => (value ? undefined : 'Username Required')

function ReduxFormControl({ input, meta, ...props }) {
  return <FormControl {...props} {...input} />
}

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
    userRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.fetchUsers()
  }

  fetchUsers = () => {
    const { client, userRequest } = this.props
    return userRequest(client)
  }
  submit = user => {
    const { client, userCreate, reset } = this.props
    userCreate(client, user)
    reset()
  }

  render() {
    const {
      handleSubmit,
      invalid,
      users: { list, requesting, successful, messages, errors }
    } = this.props
    return (
      <div className="users">
        <div className="user-form">
          <form className="col-xs-4" onSubmit={handleSubmit(this.submit)}>
            <h2>CREATE USER</h2>
            <FormGroup>
              <ControlLabel>Username:</ControlLabel>
              <Field
                name="username"
                type="text"
                id="username"
                className="username"
                label="Username"
                component={ReduxFormControl}
                validate={usernameRequired}
              />
              <ControlLabel>Name:</ControlLabel>
              <Field
                name="name"
                type="text"
                id="name"
                className="name"
                label="name"
                component={ReduxFormControl}
              />
              <ControlLabel>Phone:</ControlLabel>
              <Field
                name="phone"
                type="text"
                id="phone"
                className="phone"
                label="phone"
                component={ReduxFormControl}
              />
              <ControlLabel>Password:</ControlLabel>
              <Field
                name="password"
                type="password"
                id="password"
                className="password"
                label="password"
                component={ReduxFormControl}
              />
              <ControlLabel>Employer:</ControlLabel>
              <Field
                name="employer"
                type="text"
                id="employer"
                className="employer"
                label="employer"
                component={ReduxFormControl}
              />
              <ControlLabel>Email:</ControlLabel>
              <Field
                name="email"
                type="email"
                id="email"
                className="email"
                label="email"
                component={ReduxFormControl}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Role:</ControlLabel>
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
            </FormGroup>
            <Button
              className="btn btn-primary"
              disabled={invalid}
              action="submit">
              CREATE
            </Button>
            <Button className="btn btn-primary" onClick={this.fetchUsers}>
              REFRESH
            </Button>
          </form>
          <hr />
          <div className="user-messages">
            {requesting && <span>Creating user...</span>}
            {!requesting &&
              !!errors.length && (
                <Errors
                  message="Failure to create user due to:"
                  errors={errors}
                />
              )}
            {!requesting &&
              successful &&
              !!messages.length && <Messages messages={messages} />}
          </div>
        </div>
        <div className="user-list">
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Employer</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                !!list.length &&
                list.map(user => (
                  <tr key={user.id}>
                    <td>
                      <strong>{`${user.name}`}</strong>
                    </td>
                    <td>{`${user.username}`}</td>
                    <td>{`${user.phone}`}</td>
                    <td>{`${user.employer}`}</td>
                    <td>{`${user.role}`}</td>
                    <td>{`${user.email}`}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
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
const connected = connect(mapStateToProps, { userCreate, userRequest })(Users)
const formed = reduxForm({
  form: 'users'
})(connected)

export default formed
