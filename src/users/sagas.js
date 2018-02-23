import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import { USER_CREATING, USER_REQUESTING } from './constants'

import {
  userCreateSuccess,
  userCreateError,
  userRequestSuccess,
  userRequestError
} from './actions'

const usersUrl = `${process.env.REACT_APP_API_URL}/MyUser`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest(request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    })
}

function userCreateApi(client, user) {
  const request = fetch(usersUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return handleRequest(request)
}

function* userCreateFlow(action) {
  try {
    const { client, user } = action
    const createdUser = yield call(userCreateApi, client, user)
    // creates the action with the format of
    // {
    //   type: USER_CREATE_SUCCESS,
    //   user,
    // }
    // Which we could do inline here, but again, consistency
    yield put(userCreateSuccess(createdUser))
  } catch (error) {
    // same with error
    yield put(userCreateError(error))
  }
}

function userRequestApi(client) {
  const request = fetch(usersUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleRequest(request)
}

function* userRequestFlow(action) {
  try {
    // grab the client from our action
    const { client } = action
    // call to our userRequestApi function with the client
    const users = yield call(userRequestApi, client)
    // dispatch the action with our users!
    yield put(userRequestSuccess(users))
  } catch (error) {
    yield put(userRequestError(error))
  }
}

function* usersWatcher() {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(USER_CREATING, userCreateFlow),
    takeLatest(USER_REQUESTING, userRequestFlow)
  ]
}

export default usersWatcher
