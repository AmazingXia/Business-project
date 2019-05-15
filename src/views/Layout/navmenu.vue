<template>
  <el-aside width="200px">
    <el-menu default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :router="true"
             background-color="#21262a"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="fas fa-user-lock fa-lg"
             data-fa-transform="grow-6"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="users">
          <template slot="title">
            <i class="fas fa-user-plus fa-lg"></i>
            <span>用户列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fas fa-poo fa-lg"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="roles">
          <template slot="title">
            <i class="fas fa-user-secret fa-lg"></i>
            <span>角色列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="rights">
          <template slot="title">
            <i class="fas fa-user-secret fa-lg"></i>
            <span>权限列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fas fa-shopping-cart fa-lg"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="goodslist">
          <template slot="title">
            <!-- <i class="fas fa-user-secret fa-lg"></i> -->
            <i class="fas fa-list-alt fa-lg"></i>
            <span>商品列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="categories">
          <template slot="title">
            <i class="fas fa-list fa-lg"></i>
            <span>分类参数</span>
          </template>
        </el-menu-item>
        <el-menu-item index="goodscate">
          <template slot="title">
            <i class="fas fa-list-ul fa-lg"></i>
            <span>商品分类</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fas fa-th  fa-lg"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="booking">
          <template slot="title">
            <i class="fab fa-buysellads fa-lg"
               style="margin-right: 10px"></i>
            <span>订单列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="fas fa-table fa-lg"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="data">
          <template slot="title">
            <i class="fas fa-database fa-lg"></i>
            <span>数据报表</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: 'NavMenu',
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
    // logOut () {
    //   removeToken()
    //   this.$router.replace('/login')
    // }
  }
}
</script>
<style scoped>
.el-aside {
  background-color: #21262a;
}
.el-menu {
  height: 100%;
}

.fas {
  margin-right: 10px;
}
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #21262a;
}

.el-main {
  background-color: #f1f1f1;
}

.el-row {
  display: flex;
  align-items: center;
}

.el-menu {
  height: 100%;
}

.fas {
  margin-right: 10px;
}
</style>
