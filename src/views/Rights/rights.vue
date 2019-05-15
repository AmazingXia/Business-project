<template>
  <el-table :data="rightList"
            height="250"
            border
            stripe
            style="width: 100%">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column prop="authName"
                     label="权限名称"
                     width="180">
    </el-table-column>
    <el-table-column prop="path"
                     label="路径"
                     width="180">
    </el-table-column>

    <el-table-column label="层级">
      <template slot-scope="scope">
        {{['一级','二级','三级'][scope.row.level]}}
      </template>
    </el-table-column>

  </el-table>
</template>

<script>

import { getAllRights } from '@/api/rights'

export default {
  created () {
    this.getAllRights()
  },
  name: '',
  data () {
    return {
      rightList: []
    }
  },
  methods: {
    async getAllRights () {
      const { data, meta } = await getAllRights('list')
      if (meta.status === 200) {
        this.rightList = data
      }
    }
  }
}
</script>
<style scoped>
.el-card__body,
.el-card,
.el-main {
  min-height: 100%;
}
.el-table__body-wrapper {
  min-height: 100%;
}
</style>
