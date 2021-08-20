import axios from 'axios'
import { Toast } from 'zarm';
import { useHistory } from 'react-router-dom';
const http = axios.create({
  timeout: 10000,
  baseURL: ' http://api.chennick.wang'
})


// 请求拦截
// 每一次发请求前做的事情
http.interceptors.request.use((config: any) => {
  // 验证用户身份 
  // token: 令牌
  // 在登录成功之后后端签发令牌
  // 每一次发请求的时候 加上这个令牌
  const token = localStorage.getItem('token')
  if (token) {
    // headers属性是后端约定的
    config.headers['Authorization'] = token
  }
  return config
}, (err: any) => {
  return Promise.reject(err)
})


// 响应拦截
// 响应拦截每一次请求结束做的事情
http.interceptors.response.use((res: any) => {
  return res.data
}, (err: any) => {
  console.log(err)
  const status: number = err.response! && err.response.status
  if (status === 400) {
    Toast.show('参数错误');
  }
  if (status === 401) {
    Toast.show('登录过期')
    useHistory().push('/login')
  }
  if (status === 403) {
    Toast.show('没有全选')
  }
  if (status === 404) {
    Toast.show('路径错误')
  }
  if (status === 500) {
    Toast.show('服务器错误')
  }
  if (status === 503) {
    Toast.show('服务器维护')
  }
  return Promise.reject(err)

})


export default http
