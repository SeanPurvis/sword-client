import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import Messages from '../../notifications/Messages'
import Errors from '../../notifications/Errors'

import loginRequest from '../actions'

function ReduxFormControl({ input, meta, ...props }) {
  return <FormControl {...props} {...input} />
}

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
      <div className="login col-xs-4 center">
        <form className="login-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Login</h1>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <Field name="username" type="text" component={ReduxFormControl} />
            <ControlLabel>Password</ControlLabel>
            <Field
              name="password"
              type="password"
              component={ReduxFormControl}
            />
          </FormGroup>
          <Button
            className="btn btn-primary"
            onClick={handleSubmit(this.submit)}
            action="submit">
            LOGIN
          </Button>
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
                Login Successful! Click <Link to="/users">here</Link> to go to
                the users page
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
