import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar, AtToast, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import './index.css'
// import Login from './loginForm'
import * as Actions from '../../actions/counter'
import { login, clearLoginError, getUserInfo } from '../../actions/user'
import Bmob from '../../utils/Bmob'
import cloud from '../../utils/cloud'

if (process.env.TARO_ENV === 'weapp') {
  require('taro-ui/dist/weapp/css/index.css')
} else if (process.env.TARO_ENV === 'h5') {
  require('taro-ui/dist/h5/css/index.css')
}

function mapStateToProps(state) {
  return {
    counter: state.counter.toJS(),
    user: state.user.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      ...Actions,
      login,
      clearLoginError,
      getUserInfo
    }, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = {
      logo: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/962bd40735fae6cdc6b4ba5f0db30f2442a70f8f.jpg',
      name: '',
      password: '',
      showMsg: false,
      showMsgText: ''
    }
  }

  componentDidMount () {
    // this.props.getUserInfo()
    const userInfo = Bmob.User.current()
    if(userInfo.nickName) {
      Taro.redirectTo({
        url: '../packageList/index'
      })
      Taro.showToast({
        title: '登录成功',
        icon: 'none',
        duration: 1000
      })
    }

    cloud.packages.get().then(data => {
      console.log(data)
    })

    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
    })
      .then(res => {
        console.log(res.result) // 3
      })
      .catch(console.error)
  }

  login () {
    // 请求登录
    this.props.login({
      name: this.state.name,
      password: this.state.password
    })
  }

  changeName (name) {
    this.setState({ name })
  }

  changePw (password) {
    this.setState({ password })
  }

  onCloseError () {
    this.props.clearLoginError()
    this.setState({
      showMsg: false,
      showMsgText: ''
    })
  }

  register () {
    console.log('注册')
  }

  forgetPw () {
    console.log('忘记密码')
  }

  onGetUserInfo (e) {
    const { detail: { userInfo: user } } = e
    console.log(user)
    Bmob.User.upInfo(user).then(res => {
      console.log(res)
      this.redirect()
    }).catch(err => {
      console.warn(err)
    })
  }

  redirect () {
    Taro.navigateTo({
      url: '../packageList/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <View style='width: 50px; margin: 0 auto'>
          <AtAvatar
            image={this.state.logo}
          >
          </AtAvatar>
        </View>
        {/* <Login
          name={this.state.name}
          onChangeName={this.changeName}
          password={this.state.password}
          onChangePw={this.changePw}
          onLogin={this.login}
        /> */}
        <AtToast
          isOpened={this.state.showMsg}
          duration={3000}
          text={this.state.showMsgText}
          onClose={this.onCloseError}
        ></AtToast>
        {/* <View className='at-row at-row__justify--between login-tip'>
          <View
            onClick={this.forgetPw}
            className='at-col at-col-3'
          >忘记密码？</View>
          <View
            onClick={this.register}
            className='at-col at-col-3' style='text-align: right;'
          >马上注册</View>
        </View> */}
        <AtButton
          openType='getUserInfo'
          onGetUserInfo={this.onGetUserInfo}
        >微信授权登录</AtButton>
      </View>
    )
  }
}

