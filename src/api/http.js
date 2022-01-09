import http from '@/api/axios.js'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

// request 拦截器
http.interceptors.request.use(
  config => {
    let params = {}
    const token = getToken('token')
    if (!config.url.match('login') && !window.hiddenBar) {
      // 除开登录逻辑，其他接口自动添加token请求头
      config.headers.Authorization = token

      params = { sign: token }
    }
    config.params = {
      ...params,
      ...config.params
    }
    return config
  },
  error => {
    // eslint-disable-next-line no-console
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// respone 拦截器
http.interceptors.response.use(
  response => {
    const status = response.status
    const res = response.data
    if (status === 200) {
      return Promise.resolve(res)
    } else {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 1 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  error => {
    Message({
      message: '服务异常！',
      type: 'error',
      duration: 1 * 1000
    })
    return Promise.reject(error)
  }
)
export default http
