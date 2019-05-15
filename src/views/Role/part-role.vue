
<!--
 :default-expanded-keys="[2, 3]"
 -->
<template>
  <div class="part-role">
    <el-dialog title="角色授权"
               :visible.sync="formVisible">
      <el-tree default-expand-all
               :data="rightTree"
               show-checkbox
               node-key="id"
               ref="tree"
               highlight-current
               :default-checked-keys="rightCheckedLsit"
               :props="defaultProps"></el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handelCommit">确 定</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
//  rightManagement = (roleId, { rids })
// import { rightManagement } from '@/api/role'
import { rightManagement } from "@/api/role"

import { getAllRights } from "@/api/rights"
// rightManagement = (roleId, { rids })
// import { close } from 'fs';

export default {
  name: "",
  data () {
    return {
      formVisible: false,
      rightTree: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      rightCheckedLsit: [],
      halfList: [],
      checkedNodeList: [],
      roleId: 0
    }
  },
  methods: {
    show () {
      this.formVisible = true
      this.getDataTree()
    },
    async getDataTree () {
      const { data, meta } = await getAllRights()
      if (meta.status === 200) {
        this.rightTree = data
      }
    },

    partHandel (item) {
      // 再点击授权时把item传入到子组件
      // item是一个用户,保存了用户角色以及id还有权限
      // 根据用户信息求情所对应的权限
      // 把权限展示在tree中
      this.roleId = item.id
      item.children.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            this.rightCheckedLsit.push(third.id)
          })
        })
      })
    },

    async handelCommit () {
      this.halfList = this.$refs.tree.getHalfCheckedKeys()
      this.checkedNodeList = this.$refs.tree.getCheckedKeys()
      const roleId = this.roleId
      const { rids } = { rids: [...this.halfList, ...this.checkedNodeList].join(',') }
      const { data, meta } = await rightManagement(roleId, { rids })
      if (meta.status === 200) {
        this.$message({
          message: `${meta.msg}`,
          type: 'success'
        })
        this.formVisible = false
        this.$emit('part-success')
      }

    }
  }
}
</script>
<style scoped>
</style>
