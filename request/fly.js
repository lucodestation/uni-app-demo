/* 
豆瓣api http://t.yushu.im/v2/movie/top250
*/

import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
/* 
全局配置

fly.config 默认值

fly.config = {
  baseURL: '',
  headers: {},
  method: 'GET',
  params: {},
  parseJson: true,
  timeout: 0,
  withCredentials: false
}
 */
// 全局配置
fly.config.baseURL = 'http://localhost:3030/api'

// 请求拦截器
fly.interceptors.request.use(request => {
  console.log('请求拦截器')
  //可以显式返回 request, 也可以不返回，没有返回值时拦截器中默认返回 request
  return request
})

// 响应拦截器，响应拦截器会在 then/catch 处理之前执行
fly.interceptors.response.use(
  response => {
    console.log('响应拦截器 response')
    // 只将请求结果的 data 字段返回
    return response.data
  },
  error => {
    console.log('响应拦截器 error', error)
    // 发生网络错误（响应状态码非 2XX）后会走到这里
    return Promise.resolve(false)
  }
)

export default fly
