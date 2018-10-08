import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { AtButton, AtForm, AtInput, AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import './index.css'

import * as Actions from '../../actions/counter'
import getUserInfo from '../../actions/user'

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
      value: '',
      editable: true,
      userInfo: ''
    }
  }

  componentWillMount () {
    Taro.getUserInfo({
      success: res => {
        this.setState({
          userInfo: res.userInfo
        })
      }
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  login () {
    Taro.navigateTo({
      url: '../packageList/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <View style='width: 50px; margin: 0 auto'>
          <AtAvatar
            circle
            image={this.state.userInfo.avatarUrl}
            openData={{type: ''}}
          >
          </AtAvatar>
        </View>
        <AtForm style='padding: 20px;'>
          <AtInput
            name='user'
            type='text'
            placeholder='手机号/邮箱'
            editable={this.state.editable}
            onChange={this.handleChange}
            value={this.state.value}
          />
          <AtInput
            name='password'
            type='text'
            editable={this.state.editable}
            placeholder='密码'
          />
        </AtForm>
        <Input />
        <AtButton
          onClick={this.login}
          type='primary'
        >
          登录
        </AtButton>
        <View>value: {this.props.counter.num}</View>
        <AtButton
          onClick={this.props.add}
          type='primary'
        >
          add
        </AtButton>
        <View>UserName: {this.props.user.userInfo.nickName}</View>
        <AtButton
          onClick={this.props.getUserInfo}
          type='primary'
        >
          getUser
        </AtButton>
      </View>
    )
  }
}

