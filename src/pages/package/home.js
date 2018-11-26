import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from '../../components/title'

import * as echarts from '../../components/ec-canvas/echarts'
import './echarts.scss'
import initChart from '../../utils/echarts'

// function initChart(canvas, width, height) {
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   })
//   canvas.setChart(chart)

//   const option = {
//     backgroundColor: '#fff',
//     series: [{
//       label: {
//         normal: {
//           fontSize: 14
//         }
//       },
//       type: 'pie',
//       roseType: true,
//       center: ['50%', '50%'],
//       radius: [0, '80%'],
//       data: [{
//         value: 55,
//         name: '北京'
//       }, {
//         value: 20,
//         name: '武汉'
//       }, {
//         value: 10,
//         name: '杭州'
//       }, {
//         value: 20,
//         name: '广州'
//       }, {
//         value: 38,
//         name: '上海'
//       }],
//       itemStyle: {
//         emphasis: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 2, 2, 0.3)'
//         }
//       }
//     }]
//   }

//   chart.setOption(option)
//   return chart
// }
export default class Home extends Component {

  config = {
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  constructor() {
    super(...arguments)
    this.state = {
      // ec: {
      //   onInit: initChart
      // }
    }
  }

  chartData (materials) {
    return materials && materials.map(item => ({
      value: item.number,
      name: item.name
    }))
  }

  render () {
    let {
      isShow
    } = this.props
    const data = this.chartData(this.props.materials)
    const _ec = {
      onInit: initChart(data)
    }

    return (
      <View style={isShow ? 'display: block' : 'display: none'}>
        <Title title='仓库' />
        <View className='echarts-wrapper'>
          <View className='echarts'>
            <ec-canvas canvas-id='mychart-area' ec={_ec}></ec-canvas>
          </View>
        </View>
      </View>
    )
  }
}