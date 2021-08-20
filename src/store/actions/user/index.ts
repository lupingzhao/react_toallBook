import api from "../../../http/api"
import { Toast } from "zarm"
import http from "../../../http"
import { Dispatch } from 'redux'
// 注册接口
export const register = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    // 发请求
    api.register(username, password).then((res: any) => {
      // 触发reducer的方法
      if (res.code === 200) {
        dispatch({
          type: 'register',
          data: true,
        })
        Toast.show(res.msg)
      } else {
        Toast.show(res.msg)
        dispatch({
          type: 'register',
          data: false,
        })
      }
      // console.log(res)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 登陆接口 login
export const login = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    // 发请求
    api.login(username, password).then((res: any) => {
      // 触发reducer的方法
      // console.log(res)
      if (res.code === 200) {
        dispatch({
          type: 'login',
          data: res.data.data
        })
        Toast.show(res.message)
        localStorage.setItem('token', res.data.token)
        window.location.href = "/";
      } else Toast.show(res.message)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 获取用户信息
export const userInfo = () => {
  return (dispatch: Dispatch) => {
    // 发请求
    api.userInfo().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'userInfo',
        data: res.data
      })
      localStorage.setItem('user', JSON.stringify(res.data))

    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 上传接口
export const upLoad = (files: any) => {
  return (dispatch: Dispatch) => {
    // 发请求
    api.upLoad(files).then((res: any) => {
      // 触发reducer的方法
      console.log(res)
      dispatch({
        type: 'upLoad',
        data: res.data.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 修改个性签名

export const signature = (signature: string, avatar: string) => {
  return (dispatch: Dispatch) => {
    // 发请求
    api.signature(signature, avatar).then((res: any) => {
      // 触发reducer的方法
      // console.log(res)
      dispatch({
        type: 'signature',
        data: res
      })
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 修改用户密码
export const editPassword = (old_pass: string, new_pass: string, new_pasa2: string) => {
  return (dispatch: Dispatch) => {
    // 发请求
    api.editPassword(old_pass, new_pass, new_pasa2).then((res: any) => {
      // 触发reducer的方法
      // console.log(res)
      if (res.code === 200) {
        dispatch({
          type: 'editPassword',
          data: res.data
        })
        Toast.show(res.msg)
      } else Toast.show(res.msg)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 消费列表
export const consumption = () => {
  return (dispatch: Dispatch) => {
    // 发请求
    api.consumption().then((res: any) => {
      // console.log(res)
      // 触发reducer的方法
      if (res.code === 200) {
        // console.log(res.data.list)
        dispatch({
          type: 'consumption',
          data: res.data.list
        })
      } else Toast.show(res.msg)
    }).catch((err: any) => {
      console.log(err)
    })
  }
}

