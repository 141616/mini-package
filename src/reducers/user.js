import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { GET_USERINFO } from '../constants'

export default createReducer(fromJS({
  userInfo: {}
}), {
  [GET_USERINFO]: (state, actions) => {
    const { userInfo } = actions
    return state.merge({
      userInfo: userInfo
    })
  }
})
