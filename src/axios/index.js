import { BASE_URL } from '@/consts/urls'
import axios from 'axios'
import { message } from 'ant-design-vue'

const instance = axios.create({
  baseURL: BASE_URL
})

// 利用axios的cancelToken来取消请求
const CancelToken = axios.CancelToken
const cache = {}
/**
 * axios请求拦截器
 */
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.token = localStorage.getItem('token') || [] // 将token放到请求头发送给服务器
  if (config.cache) {
    const source = CancelToken.source()
    config.cancelToken = source.token
    let data = cache[config.url]
    if (config.params && cache[config.url]) {
      data = cache[config.url][JSON.stringify(config.params)]
    }
    if (data && Date.now() - data.time < 60000) {
      source.cancel(data)
    }
  }
  return config
}, function (error) {
  // Do something with request error
  message.error(error.toString())
  return Promise.reject(error)
})

/**
 * axios回应拦截器
 */
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.config.cache && response.config.method === 'get') {
    // console.log(response.config)
    const data = {
      time: Date.now(),
      data: response.data
    }
    if (response.config.params) {
      if (!cache[response.config.url]) cache[response.config.url] = {}
      cache[response.config.url][JSON.stringify(response.config.params)] = data
    } else {
      cache[response.config.url] = data
    }
  }
  return response
}, function (error) {
  if (axios.isCancel(error)) {
    // console.log(error)
    return Promise.resolve(error.message)
  }
  // 对响应错误做点什么
  switch (error.response.status) {
    case 401: {
      message.error('权限错误！你无权进行该操作！')
      break
    }
    default: {
      // message.error(error.toString())
      console.log(error.response)
      break
    }
  }
  return Promise.reject(error)
})

export default instance
