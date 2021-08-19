import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'zarm'

ReactDOM.render(
  // 路由跳转
  <Provider store={store}>
    <ConfigProvider primaryColor="#1890ff">
      <App />
    </ConfigProvider>

  </Provider>,
  document.getElementById('root')
)

