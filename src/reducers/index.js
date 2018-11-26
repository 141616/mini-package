import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import packages from './packages'
import materials from './materials'

export default combineReducers({
  counter,
  user,
  packages,
  materials
})
