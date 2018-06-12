import {
  USER_CREATING,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_REQUESTING,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_ERROR
} from './constants'

const initialState = {
  list: [], // where we'll store users
  requesting: false,
  successful: false,
  messages: [],
  errors: []
}

const reducer = function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: `User: ${action.user.name} being created...`,
            time: new Date()
          }
        ],
        errors: []
      }

    // On success include the new user into our list
    case USER_CREATE_SUCCESS:
      return {
        list: state.list.concat([action.user]),
        requesting: false,
        successful: true,
        messages: [
          {
            body: `User: ${action.user} created!`,
            time: new Date()
          }
        ],
        errors: []
      }

    case USER_CREATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ])
      }

    case USER_REQUESTING:
      return {
        ...state, // ensure that we don't erase fetched ones
        requesting: true,
        successful: false,
        messages: [
          {
            body: 'Fetching users...!',
            time: new Date()
          }
        ],
        errors: []
      }

    case USER_REQUEST_SUCCESS:
      return {
        list: action.users, // replace with fresh list
        requesting: false,
        successful: true,
        messages: [
          {
            body: 'Users refreshed',
            time: new Date()
          }
        ],
        errors: []
      }

    case USER_REQUEST_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors:
          state.errors.concat[
            {
              body: action.error.toString(),
              time: new Date()
            }
          ]
      }

    default:
      return state
  }
}

export default reducer
