import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import Home from './home'
import Me from './me'
import Record from './record'
import Message from './message'
import { getMaterialsById } from '../../actions/materials'


function mapStateToProps(state) {
  return {
    materialsState: state.materials.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getMaterialsById
    }, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Package extends Component {
  config = {
    navigationBarTitleText: '明细',
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      tabList: [
        { title: '', selectedIconType: 'home', iconType: 'home' },
        { title: '', selectedIconType: 'bullet-list', iconType: 'bullet-list' },
        { title: '', selectedIconType: 'bell', iconType: 'bell' },
        { title: '', selectedIconType: 'user', iconType: 'user' }
      ]
    }
  }

  componentWillMount () {
    const id = this.$router.params.objectId
    this.props.getMaterialsById(id)
  }

  switchTab (current) {
    this.setState({
      current
    })
  }

  render () {
    const { materials } = this.props.materialsState
    return (
      <View>
        <Home isShow={this.state.current === 0} materials={materials} />
        <Record isShow={this.state.current === 1} />
        <Message isShow={this.state.current === 2} />
        <Me isShow={this.state.current === 3} />
        <AtTabBar
          fixed
          tabList={this.state.tabList}
          onClick={this.switchTab}
          current={this.state.current}
        />
      </View>
    )
  }
}