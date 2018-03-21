import { take, fork, cancel, cancelled, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { handleApiErrors } from '../lib/api-errors'
// Login Constants
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants'
// Modify Client state
import { setClient, unsetClient } from '../client/actions'

import { CLIENT_UNSET } from '../client/constants'

// url fron .env config file
const loginUrl = `${process.env.REACT_APP_API_URL}/jwt/authenticate`

function loginApi(username, password) {
  // call to the "fetch" native function
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    })
}

function* logout() {
  // Dispatch CLIENT_UNSET action
  // Remove token
  // Redirect to LOGIN
  yield put(unsetClient())
  localStorage.removeItem('token')
  push('/login')
}

// This will be run when the LOGIN_REQUESTING
// Action is found by the watcher
function* loginFlow(username, password) {
  let token
  try {
    // Sagas will pause herre until API Call is successful or
    // return an error
    token = yield call(loginApi, username, password)

    // Inform Redux to set the client token and that login was successful
    yield put(setClient(token))
    yield put({ type: LOGIN_SUCCESS })
    // Set stringified version of access token to localstorage
    localStorage.setItem('token', JSON.stringify(token))

    // redirect to users page
    push('/users')
  } catch (error) {
    // If error is caught, send it to Redux
    yield put({ type: LOGIN_ERROR, error })
  } finally {
    // If the forked login API call task was cancelled, redirect to login
    if (yield cancelled()) {
      push('/login')
    }
  }

  return token
}

// Our watcher(saga)
function* loginWatcher() {
  // Generators halt execution until their next step
  // Therefore this loop will not be executing a Bazillion times a second
  while (true) {
    // `take` pauses the sagas and will pause here until
    // a `LOGIN_REQUESTING` action is seen. It will then
    // take that action's payload, the username and password.
    // ONLY when this happens while the loop proceed.
    const { username, password } = yield take(LOGIN_REQUESTING)

    // Passes the action payload {username, password} to
    // the loginFlow() function. fork() will spin up
    // another process that does not block the loop
    const task = yield fork(loginFlow, username, password)

    // Now the sagas watches for CLIENT_UNSET or LOGIN_ERROR!
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])

    // If user decides to logout during the LOGIN_REQUESTING action
    // CLIENT_UNSET action will be dispatched. Knowing this, we can
    // cancel the forked task trying to login the client.
    if (action.type === CLIENT_UNSET) yield cancel(task)

    // Finally we logout the client
    // This unsets the client's access token
    // Start back at the top of the while loop... -->
    yield call(logout)
  }
}
export default loginWatcher
