import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtForm, AtInput } from 'taro-ui'

export default class create extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      trueState: true
    }
  }

  render () {
    const {
      onChangeDes,
      onChangeName,
      onSubmit,
      onCancel,
      isOpened,
      name,
      description
    } = this.props
    return (
      <View>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>新建仓库</AtModalHeader>
          <AtModalContent>
            <AtForm style='margin: 20px;'>
              <AtInput
                name='name'
                type='text'
                placeholder='仓库名称'
                border={this.state.trueState}
                editable={this.state.trueState}
                onChange={onChangeName}
                value={name}
              />
              <AtInput
                name='description'
                type='text'
                editable={this.state.trueState}
                placeholder='描述'
                onChange={onChangeDes}
                value={description}
              />
            </AtForm>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={onCancel}>取消</Button>
            <Button onClick={onSubmit}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}