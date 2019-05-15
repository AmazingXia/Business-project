<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <img src="./logo.png"
           alt="黑马程序员">
    </el-col>
    <el-col :span="16">
      黑马程序员
    </el-col>
    <el-col :span="4">
      <el-button type="primary"
                 @click="logOut">退出</el-button>
    </el-col>
  </el-row>

</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  methods: {
    logOut () {
      removeToken()
      this.$router.replace('/login')
    }
  }
}
</script>
<style scoped>
.el-header {
  background-color: #ffffff;
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
