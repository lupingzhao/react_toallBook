import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { commonRoutes, routes, RouterItem } from './router'

// 配置组件库




const App = () => {
  return (

    <Router>
      <Switch>
        {/* 需要登陆的情况 */}
        {
          commonRoutes.map((item: RouterItem, index: number) => {
            return (
              <Route key={index} path={item.path} exact={item.exact} render={() => {
                // 路由守卫的代码
                document.title = item.meta!.title
                return (
                  <item.component />
                )
              }} />
            )
          })
        }
        {/* 不需要登陆就能访问 */}
        {
          routes.map((item: RouterItem, index: number) => {
            return (
              <Route key={index} path={item.path} exact={item.exact} render={() => {
                // 路由守卫的代码
                document.title = item.meta!.title
                let token = localStorage.getItem('token')
                if (!token) {
                  return (
                    <Redirect to='/login' />
                  )
                }
                return (
                  <item.component />
                )
              }} />
            )
          })
        }
      </Switch>
    </Router>


  )
}

export default App
