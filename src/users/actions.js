import {
  USER_CREATING,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR
} from './constants'

// Create requires that we pass it our current logged in client AND user params
export const userCreate = function userCreate(client, user) {
  return {
    type: USER_CREATING,
    client,
    user
  }
}

export const userCreateSuccess = function userCreateSuccess(user) {
  return {
    type: USER_CREATE_SUCCESS,
    user
  }
}

export const userCreateError = function userCreateError(error) {
  return {
    type: USER_CREATE_ERROR,
    error
  }
}
