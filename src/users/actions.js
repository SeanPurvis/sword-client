import {
  USER_CREATING,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_REQUESTING,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_ERROR
} from './constants'

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

export const userRequest = function userRequest(client) {
  return {
    type: USER_REQUESTING,
    client
  }
}

export const userRequestSuccess = function userRequestSuccess(users) {
  return {
    type: USER_REQUEST_SUCCESS,
    users
  }
}

export const userRequestError = function userRequestError(error) {
  return {
    type: USER_REQUEST_ERROR,
    error
  }
}
