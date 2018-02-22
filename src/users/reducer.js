import {
  USER_CREATING,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_REQUESTING,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_ERROR
} from './constants'

const initialState = {
  list: [],
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
            body: `User: ${action.user.username} being created...`,
            time: new Date()
          }
        ],
        errors: []
      }

    // On Success include the new user into the list
    case USER_CREATE_SUCCESS:
      return {
        list: state.list.concat([action.user]),
        requesting: false,
        successful: true,
        messages: [
          {
            body: `User: ${action.user.username} created!`,
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

    default:
      return state
  }
}

export default reducer
