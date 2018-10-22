import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from "taro-ui"
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import { getPackageList } from '../../actions/packages'

function mapStateToProps(state) {
  return {
    packages: state.packages.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getPackageList
    }, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PackageList extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
  }

  componentDidMount () {
    this.props.getPackageList()
    console.log(1)
  }

  render () {
    const { packages } = this.props.packages
    return (
      <View>
        {
          packages.map(pack => {
            return (
              <AtCard
                title={pack.name}
                thumb={pack.icon}
                key={pack.objectId}
              >
                {pack.description}
              </AtCard>
            )
          })
        }
      </View>
    )
  }
}
