import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/Login/login.vue'
import Layout from '@/views/Layout/layout.vue'
import Home from '@/views/Home/home.vue'
import UserList from '@/views/User/user.vue'
import RoleList from '@/views/Role/role.vue'
import Rights from '@/views/Rights/rights'
import GoodsList from '@/views/GoodsList/goodslist.vue'
import Categories from '@/views/Categories/categories.vue'
import GoodsCate from '@/views/GoodsCate/goodscate.vue'
import Booking from '@/views/Booking/booking.vue'
import Data from '@/views/Data/data.vue'
import AddGoods from '@/views/GoodsList/add-goods'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children: [{
          path: '',
          component: Home
        },
        {
          path: '/users',
          component: UserList
        },
        {
          path: '/roles',
          component: RoleList
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/goodslist',
          component: GoodsList
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/goodscate',
          component: GoodsCate
        },
        {
          path: '/booking',
          component: Booking
        },
        {
          path: '/data',
          component: Data
        },
        {
          path: '/addgoodslist',
          component: AddGoods
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 进入路由之前判断是否有token
  // this.$route.
  // if ()
  next()
})

export default router
