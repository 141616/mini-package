import Taro from '@tarojs/taro'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILE,
  GET_USERINFO,
  CLEAR_LOGIN_ERROR
} from '../constants'
import Bmob from '../utils/Bmob'

export const getUserInfo = () => {
  const userInfo = Bmob.User.current()
  // const { nickName, userPic, openid } = userInfo
  // if (nickName && userPic && openid) {
  //   return {
  //     type: GET_USERINFO_SUCCESS,
  //     userInfo: userInfo
  //   }
  // }
  return {
    type: GET_USERINFO,
    userInfo: userInfo
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