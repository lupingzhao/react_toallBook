// 配置两种路由 一种是不需要权限的 一种是需要权限的
import Home from "../views/home/Home"
import Login from "../views/login/Login"
import My from "../views/my/My"
import Statistical from "../views/statistical/Statistical"
import EditBills from '../views/editBill/EditBills'
import SetPassWord from '../views/setPassword/SetPassWord'
import SetUserInfo from '../views/setUserInfo/SetUserInfo'
import About from '../views/about/About'
import Demo from "../views/Demo"
export interface Meta {
  title: string,
  icon?: string
}

export interface RouterItem {
  path: string,
  component: any,
  // 精准匹配 只有路径完全相同的时候才匹配
  exact: boolean,
  meta?: Meta
}


export const commonRoutes: RouterItem[] = [
  {
    path: '/login',
    component: Login,
    exact: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/Demo',
    component: Demo,
    exact: true,
    meta: {
      title: '登录'
    }
  }
]

export const routes: RouterItem[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/My',
    component: My,
    exact: true,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/Statistical',
    component: Statistical,
    exact: true,
    meta: {
      title: '统计'
    }
  },
  {
    path: '/EditBill',
    component: EditBills,
    exact: true,
    meta: {
      title: '编辑账单'
    }
  },
  {
    path: '/SetPassWord',
    component: SetPassWord,
    exact: true,
    meta: {
      title: '重置密码'
    }
  },
  {
    path: '/SetUserInfo',
    component: SetUserInfo,
    exact: true,
    meta: {
      title: '修改用户信息'
    }
  },
  {
    path: '/About',
    component: About,
    exact: true,
    meta: {
      title: '关于我们'
    }
  },
]



