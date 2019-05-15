import axios from 'axios'
import router from '@/router'
import { getToken } from '@/utils/token'
// 创建axios实例,设置基准地址

const http = axios.create({
  baseURL:'http://localhost:8888/api/private/v1/'
})

http.interceptors.request.use(
  config => {
    if (config.url !== '/login') {
    // 请求的地址如果不是login页面, 就写入token,因为访问列表页面都需要携带token
    // api要求在请求头中写入字段 Authorization
    // 在axios事例中http的请求头设置信息https://github.com/axios/axios
      config.headers.Authorization = getToken()
      return config
    }
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (response.data.meta.status === 401) {
      return router.replace(`/login`)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
