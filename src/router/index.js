import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/Login'

Vue.use(VueRouter)

export default {
  routes: [{
    path: '/login',
    componont: Login
  }]
}
