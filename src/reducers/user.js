import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import {
  GET_USERINFO,
  LOGIN_FAILE,
  LOGIN_SUCCESS,
  CLEAR_LOGIN_ERROR
} from '../constants'

export default createReducer(fromJS({
  userInfo: {},
  isLoginedIn: false,
  loginErr: {}
}), {
  [GET_USERINFO]: (state, actions) => {
    const { userInfo } = actions
    return state.merge({
      userInfo: userInfo
    })
  },
  [LOGIN_FAILE]: (state) => {
    return state.merge({
      isLoginedIn: false,
      loginErr: { message: '用户名或者密码不正确' }
    })
  },
  [LOGIN_SUCCESS]: (state, actions) => {
    return state.merge({
      isLoginedIn: true,
      loginErr: {},
      userInfo: actions.userInfo
    })
  },
  [CLEAR_LOGIN_ERROR]: (state) => {
    return state.merge({
      loginErr: {}
    })
  }
})
