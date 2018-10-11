import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import './index.css'
import Login from './loginForm'

import * as Actions from '../../actions/counter'
import { login, clearLoginError } from '../../actions/user'

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
      clearLoginError
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
      showError: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.isLoginedIn) {
      Taro.navigateTo({
        url: '../packageList/index'
      })
    }
    if (nextProps.user.loginErr && nextProps.user.loginErr.message) {
      this.setState({
        showError: true
      })
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
      showError: false
    })
  }

  getUserInfo (info) {
    console.log(info)
  }

  render () {
    return (
      <View className='index'>
        <View style='width: 50px; margin: 0 auto'>
          <AtAvatar
            image={this.state.logo}
            openData={{type: ''}}
          >
          </AtAvatar>
        </View>
        <Login 
          name={this.state.name}
          onChangeName={this.changeName}
          password={this.state.password}
          onChangePw={this.changePw}
          onLogin={this.login}
        />
        <AtToast
          isOpened={this.state.showError}
          duration={3000}
          text={this.props.user.loginErr.message}
          onClose={this.onCloseError}
        ></AtToast>
      </View>
    )
  }
}

