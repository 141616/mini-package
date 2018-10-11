import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { AtButton, AtForm, AtInput } from 'taro-ui'

class Login extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let {
      name,
      password,
      editable,
      onLogin,
      onChangeName,
      onChangePw,
      border
    } = this.props
    return (
      <View>
        <AtForm style='margin: 20px;'>
          <AtInput
            name='user'
            type='text'
            placeholder='手机号/邮箱'
            border={border}
            editable={editable}
            value={name}
            onChange={onChangeName}
          />
          <AtInput
            name='password'
            type='text'
            editable={editable}
            placeholder='密码'
            value={password}
            onChange={onChangePw}
          />
        </AtForm>
        <AtButton
          onClick={onLogin}
          type='primary'
        >
          登录
        </AtButton>
      </View>
    )
  }
}

// 默认配置
Login.defaultProps = {
  editable: true,
  border: true
}

export default Login