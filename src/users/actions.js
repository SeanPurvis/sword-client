import {
  USER_CREATING,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR
} from './constants'

/**
@param client current logged in client
@param user user object to be created in database
**/
export const userCreate = function usercreate(client, user) {
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
