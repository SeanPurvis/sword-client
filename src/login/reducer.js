import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants'

const initialState = {
  requesting: false,
  succesful: false,
  messages: [],
  errors: []
}

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: []
      }

    // reset the state and add a body message of success!
    case LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        succesful: true
      }

    // reset the state with errors!
    case LOGIN_ERROR:
      return {
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ]),
        messages: [],
        requesting: false,
        successful: false
      }

    default:
      return state
  }
}

export default reducer
