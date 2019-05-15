<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <NavMenu />
      <el-main>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <Bread :list="getBread()" />
          </div>
          <router-view></router-view>
        </el-card>
        <!-- Layout 的子路由将被渲染到这里 -->

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from '@/utils/token'
import NavMenu from './navmenu'
import Header from './header'
import Bread from '@/components/bread'
export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    logOut () {
      removeToken()
      this.$router.replace('/login')
    },
    getBread () {
      // console.log(this.$route)
      const breads = [{ label: '首页', path: '/' }]
      this.$route.matched.slice(1).forEach(route => {
        breads.push({
          label: route.meta.label
        })
      })
      return breads
    }
  },
  components: {
    NavMenu,
    Header,
    Bread
  }
}
</script>
<style scoped>
/* .add-goods,
.el-card,
.el-main,
.add-goods {
  height: 100%;
} */
/* .el-card,
.tabs {
  background: pink;
  height: 500px;
} */
/* .add-goods {
  background-color: yellow;
} */
/* .el-container {
  height: 100%;
} */

.el-card {
  min-height: 100%;
}
</style>
