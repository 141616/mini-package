import Taro from '@tarojs/taro'
import { GET_USERINFO } from '../constants'

const getUserInfo = () => {
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

export default getUserInfo
