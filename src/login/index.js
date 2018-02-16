import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import loginRequest from './actions'

// If testing, you'd want to export this component
// so that you can test the component and not
// test whether or not Redux and Redux Form are doing their jobs
class Login extends Component {
  // pass correct proptypes for validation
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array
    })
  }

  // Redux Form will call this function with the values of
  // the Login form fields when the form is submitted.
  // the function will call the action
  submit = values => {
    this.props.loginRequest(values)
  }

  render() {
    // Grab what is needed from props. The handleSubmit from reduxForm
    // and pieces of the global state.
    const {
      handleSubmit,
      login: { requesting, successful, messages, errors }
    } = this.props

    return (
      <div className="login">
        <form className="sword-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Login</h1>
          <label htmlFor="username">Username</label>
          <Field
            name="username"
            type="text"
            id="username"
            className="username"
            label="Username"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="Password"
            component="input"
          />
          <button action="submit">LOGIN</button>
        </form>
        <div className="auth-messages">
          {/* if there are messages or errors we show them here*/}
          {!requesting &&
            !!errors.length && (
              <Errors message="Failure to loin due to:" errors={errors} />
            )}
          {!requesting && !!Messages.length && <Messages messages={messages} />}
          {requesting && <div>Logging in...</div>}
          {!requesting &&
            successful && (
              <div>
                Login Successful!{' '}
                <Link to="/dashboard">Click here to go to the Dashboard</Link>
              </div>
            )}
        </div>
      </div>
    )
  }
}

// Grab the only piece of state needed
const mapStateToProps = state => ({
  login: state.login
})

// Connect component to redux and attach `login` piece
// of state to our `props` in the component. Attach the
// `loginRequest` action to our `props` also.
const connected = connect(mapStateToProps, { loginRequest })(Login)

// Connect the now connected component to Redux Form. It will namespace
// the form we use in this component as `login`
const formed = reduxForm({
  form: 'login'
})(connected)

export default formed
