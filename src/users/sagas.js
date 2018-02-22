import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import { USER_CREATING } from './constants'

import { userCreateSuccess, userCreateError } from './actions'

const usersUrl = `${process.env.REACT_APP_API_URL}/MyUser`

function userCreateApi(client, user) {
  return fetch(usersUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    })
}

function* userCreateFlow(action) {
  try {
    const { client, user } = action
    const createdUser = yield call(userCreateApi, client, user)
    yield put(userCreateSuccess(createdUser))
  } catch (error) {
    yield put(userCreateError(error))
  }
}

function* usersWatcher() {
  yield [takeLatest(USER_CREATING, userCreateFlow)]
}

export default usersWatcher
