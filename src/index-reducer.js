import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import login from './login/reducer'
import users from './users/reducer'

const IndexReducer = combineReducers({
  login,
  client,
  users,
  form
})

export default IndexReducer
