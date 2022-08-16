import axios from 'axios'
import { genConfig } from './config'
import { transformConfigByMethod } from './utils'
import { httpStatus } from './httpStatus'
import { Message } from 'element-ui'
class FetchHttp {
  constructor() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  // axios 实例
  static axiosInstance = axios.create(genConfig())
  //每个请求的标识 和 取消函数
  sourceTokenList = []
  // axios取消对象
  CancelToken = axios.CancelToken
  // 本次请求的标识 和 取消函数
  currentCabcelToken = ''

  // 每次请求设置唯一标识
  static setCancelTokenString(config) {
    return `${config.url}&&${JSON.stringify(config.params)}&&${config.data}`
  }
  // 清除唯一标识
  deleteCancelTokenString(cancelKey) {
    this.sourceTokenList =
      this.sourceTokenList.length < 1
        ? this.sourceTokenList.filter((cancelToken) => cancelToken.cancelKey !== cancelKey)
        : []
  }
  // 移除重复多余的请求
  cancelRepeatRequest() {
    const temp = []
    this.sourceTokenList = this.sourceTokenList.reduce((res, cancelToken) => {
      const { cancelKey, cancelHandler } = cancelToken
      if (temp.indexOf(cancelKey) === -1) {
        temp.push(cancelKey)
        res.push(cancelToken)
      } else {
        cancelHandler()
      }
      return res
    }, [])
  }

  // 请求拦截器
  interceptorsRequest() {
    FetchHttp.axiosInstance.interceptors.request.use(
      (config) => {
        const _config = config
        if (!_config.parallel) {
          // 某些情况下需要并行
          // 1.设置一个请求标识
          const cancelKey = FetchHttp.setCancelTokenString(_config)
          this.currentCabcelToken = cancelKey

          // 2.通过axios.CancelToken构造函数生成取消函数
          _config.cancelToken = new this.CancelToken((cancelHandler) => {
            this.sourceTokenList.push({ cancelKey, cancelHandler })
          })
          this.cancelRepeatRequest()
        }

        return _config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截器
  interceptorsResponse() {
    FetchHttp.axiosInstance.interceptors.response.use(
      (response) => {
        const _config = response.config
        // 请求每次成功一次就删除当前canceltoken标记
        const cancelKey = FetchHttp.setCancelTokenString(_config)
        this.deleteCancelTokenString(cancelKey)
        this.currentCabcelToken = ''
        return response.data
      },
      (error) => {
        const $error = error
        // 判断当前的请求中是否在 取消token数组理存在，如果存在则移除（单次请求流程）
        if (this.currentCabcelToken) {
          const haskey = this.sourceTokenList.filter(
            (cancelToken) => cancelToken.cancelKey === this.currentCabcelToken
          ).length
          if (haskey) {
            this.sourceTokenList = this.sourceTokenList.filter(
              (cancelToken) => cancelToken.cancelKey !== this.currentCabcelToken
            )
            this.currentCabcelToken = ''
          }
        }
        $error.isCancelRequest = axios.isCancel($error)
        // 所有的响应异常 区分来源为取消请求/非取消请求
        // httpStatus
        if (!$error.isCancelRequest) {
          httpStatus(error.response && error.response.status, '', Message)
        } else {
          console.warn(error, '请求被取消！')
        }
        return Promise.reject($error)
      }
    )
  }

  // 封装请求
  request(method, url, param, axiosConfig) {
    const config = transformConfigByMethod(param, {
      method,
      url,
      ...axiosConfig,
    })
    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      FetchHttp.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  post(url, params, config) {
    return this.request('post', url, params, config)
  }

  get(url, params, config) {
    return this.request('get', url, params, config)
  }
}
export default FetchHttp
