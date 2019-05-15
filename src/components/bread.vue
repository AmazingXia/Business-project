<template>
  <!-- <template v-for="item in [{path: '/',label: '首页'},{path: '/',label: '用户管理'},{path: '/roles',label: '角色列表'},]"
              :key="item.path">
      <template v-if="list.path">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template v-else>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </template> -->

  <!-- 面包屑 -->
  <div class="bread">

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="item in list">
        <template v-if="item.path">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">{{}}</el-breadcrumb-item> -->
          <el-breadcrumb-item :to="{ path: item.path }">{{ item.label }}
          </el-breadcrumb-item>
        </template>
        <template v-else>
          <el-breadcrumb-item>{{ item.label }}</el-breadcrumb-item>
        </template>
        <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item> -->
      </template>
    </el-breadcrumb>
  </div>

</template>
<script>
export default {
  name: '',
  props: ['list'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>
