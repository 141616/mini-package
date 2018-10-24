import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import '@tarojs/async-await'
// import { init } from '@rematch/core'

import Index from './pages/index'
import './app.css'
// import packages from './models/packages'
import configStore from './store'
import Bmob from './utils/Bmob'

const store = configStore()
// const store = init({
//   models: {
//     packages
//   }
// })
class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/packageList/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    Bmob.User.auth().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
