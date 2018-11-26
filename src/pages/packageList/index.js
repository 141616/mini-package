import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import './index.css'
import { getPackageList, createPackage } from '../../actions/packages'
import CreateModal from './createModal'
import Bmob from '../../utils/Bmob'

function mapStateToProps(state) {
  return {
    packagesState: state.packages.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getPackageList,
      createPackage
    }, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PackageList extends Component {

  config = {
    navigationBarTitleText: '仓库列表'
  }

  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      description: '',
      isOpened: false
    }
  }

  componentDidMount () {
    this.props.getPackageList()
  }

  create () {
    this.setState({ isOpened: true })
  }

  onChangeDes (description) {
    this.setState({ description })
  }

  onChangeName (name) {
    this.setState({ name })
  }

  onCancel () {
    this.setState({
      isOpened: false,
      name: '',
      description: ''
    })
  }

  onSubmit () {
    const userInfo = Bmob.User.current()
    this.props.createPackage({
      name: this.state.name,
      description: this.state.description,
      creator: userInfo.nickName
    })
    this.setState({
      isOpened: false
    })
  }

  onClickPackage (tapArg, clickArg) {
    const { target: { dataset: data } } = clickArg
    Taro.navigateTo({
      url: `../package/index?objectId=${data.oid}`
    })
  }

  render () {
    const { packages } = this.props.packagesState
    return (
      <View>
        <View>
          {
            packages.map(pack => {
              return (
                <View key={pack.objectId} className='package-card'>
                  <AtCard title={pack.name} thumb={pack.icon} onClick={this.onClickPackage} data-oid={pack.objectId}>
                    {pack.description}
                  </AtCard>
                </View>
              )
            })
          }
        </View>
        <View className='float-right-bottom'>
          <Button onClick={this.create} className='add-btn'> + </Button>
        </View>
        <CreateModal
          onChangeDes={this.onChangeDes}
          onChangeName={this.onChangeName}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          name={this.state.name}
          description={this.state.description}
          isOpened={this.state.isOpened}
        >
        </CreateModal>
      </View>
    )
  }
}
