import Taro from '@tarojs/taro'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILE,
  GET_USERINFO,
  CLEAR_LOGIN_ERROR
} from '../constants'

export const getUserInfo = () => {
  return async dispatch => {
    let userInfo = {}
    await Taro.getUserInfo().then(data => {
      userInfo = data.userInfo
      dispatch({
        type: GET_USERINFO,
        userInfo
      })
    })
  }
}

export const login = params => {
  return async dispatch => {
    setTimeout(() => {
      const { name, password } = params
      if (name === '1' && password === '1') {
        dispatch({
          type: LOGIN_SUCCESS,
          userInfo: params,
          success: true
        })
      } else {
        dispatch({
          type: LOGIN_FAILE
        })
      }
    }, 300)
  }
}

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR
  }
}