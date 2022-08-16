// 处理一下post请求与其他请求(get等)传参不一样情况
export function transformConfigByMethod(params, config) {
  const { method } = config
  const bool = ['delete', 'get', 'head', 'options'].includes(method.toLocaleLowerCase())
  const props = bool ? 'params' : 'data'
  return {
    ...config,
    [props]: params,
  }
}
