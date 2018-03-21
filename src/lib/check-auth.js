import { setClient } from '../client/actions'

function checkAuthorization(dispatch) {
  // Grab token from local localstorage
  const storedToken = localStorage.getItem('token')

  if (storedToken) {
    const token = JSON.parse(storedToken)

    // Compare total seconds of created token vs. time to live (ttl)
    const createdDate = new Date(token.created)
    const created = Math.round(createdDate.getTime() / 1000)
    const ttl = 1209600
    const expiry = created + ttl

    // if expired return false
    if (created > expiry) return false

    // otherwise dispatch token to setClient action
    dispatch(setClient(token))
    return true
  }

  return false
}
export function checkIndexAuthorization({ dispatch }) {
  /**
  @param nextState the next route being navigated to in the Router
  @param replace a helper to change the route
  @param next callback
  **/
  return (nextState, replace, next) => {
    if (checkAuthorization(dispatch)) {
      replace('users')

      return next()
    }

    replace('login')
    return next()
  }
}

export function checkDashboardAuthorization({ dispatch, getState }) {
  /**
  @param nextState the next route being navigated to in the Router
  @param replace a helper to change the route
  @param next callback
  **/
  return (nextState, replace, next) => {
    const client = getState().client

    // Is client defined and does it have a token?
    if (client && client.token) return next()

    // Not defined or set yet? Try to set token, if successful, go to dashboard
    if (checkAuthorization(dispatch)) return next()

    // Not successful? Back to login
    replace('login')
    return next()
  }
}
