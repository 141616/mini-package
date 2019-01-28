import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import Home from './home'
import Me from './me'
import Record from './record'
import Message from './message'
import {
  getMaterialsById,
  getMaterialsByType,
  getTopMaterials
} from '../../actions/materials'


function mapStateToProps(state) {
  return {
    materialsState: state.materials.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      dispatchGetMaterialsById: getMaterialsById,
      dispatchGetMaterialsByType: getMaterialsByType,
      dispatchGetTopMaterials: getTopMaterials
    }, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Package extends Component {
  config = {
    navigationBarTitleText: '明细'
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
    const pid = this.$router.params.objectId
    this.props.dispatchGetMaterialsById(pid)
    this.props.dispatchGetTopMaterials({
      pid,
      types: ['steel', 'cement', 'block']
    })
    // this.props.getMaterialsByType({ id, type: 'steel' })
    // this.props.getMaterialsByType({ id, type: 'cement' })
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
        <Home isShow={this.state.current === 0} materials={materials} getMaterialsById={getMaterialsById} />
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