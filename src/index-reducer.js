import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import login from './login/reducer'

const IndexReducer = combineReducers({
  login,
  client,
  form
})

export default IndexReducer
