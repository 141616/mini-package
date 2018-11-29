import Taro, { Component }  from '@tarojs/taro'
import { View } from '@tarojs/components'

import Title from '../title'
import './index.css'
import chartInitFn from '../../utils/echarts'

class MaterialItem extends Component {
  config = {
    usingComponents: {
      'ec-canvas': '../ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  constructor() {
    super(...arguments)
    this.state = {
      ec: {
        lazyload: true
      }
    }
  }

  setCom (com) {
    this.ecCom = com
  }

  initEc (data) {
    if (!this.ecCom) {
      return
    }
    this.ecCom.init(chartInitFn(data))
  }

  render () {
    const {
      title,
      materials
    } = this.props

    if (materials.length) {
      // 延迟渲染echarts
      this.initEc(materials)
    }

    return (
      <View>
        <Title title={title} />
        <View className='echarts-wrapper'>
          <View className='echarts'>
            <ec-canvas ref={this.setCom} canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
          </View>
        </View>
      </View>
    )
  }
}

MaterialItem.defaultProps = {
  title: '',
  materials: []
}

export default MaterialItem