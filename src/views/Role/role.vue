<template>
  <div class="contanier">

    <el-row :gutter="20">
      <el-col :span="4">
        <el-button type="primary"
                   @click="$refs.roleAddEL.show()">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="roleList"
              row-key="id"
              style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children"
                  :key="first.id">
            <el-col :span="4">
              <el-tag closable
                      type="info">{{ first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children"
                      :key="second.id">
                <el-col :span="4">
                  <el-tag closable
                          type="success">{{ second.authName}}</el-tag>
                </el-col>
                <el-col :span="16">
                  <el-tag closable
                          v-for="third in second.children"
                          :key="third.id"
                          type="warning"
                          @close="handelDelSingleRight(scope.row,third)">{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称"
                       prop="roleName"></el-table-column>
      <el-table-column label="描述"
                       prop="roleDesc"></el-table-column>
      <el-table-column label="描述"
                       prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini"
                     type="warning"
                     @click="handlePart(scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[ 3, 5, 10 ]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="rolesTotal"></el-pagination>

    <AddRole ref="roleAddEL" />

    <RoleEdit ref="roleEditEL"
              @edit-success="loadRoles">
    </RoleEdit>
    <!-- <authRole ref="authRoleEl"></authRole> -->
    <PartRole ref="partRoleEL"
              @part-success="loadRoles"
              @click="$refs.partRoleEL.show()" />
  </div>
</template>
<script>
import AddRole from "./add-role"
import RoleEdit from "./edit-role"
import PartRole from "./part-role"
import { getRoles, delSpecialRight, delRole } from "@/api/role"

export default {
  name: "RoleList",
  created () {
    this.loadRoles()
  },
  components: {
    RoleEdit,
    AddRole,
    PartRole
  },
  data () {
    return {
      currentPage: 0,
      pageSize: 0,
      rolesTotal: 0,
      addRoleFormVisible: false,
      roleList: []
    }
  },
  methods: {
    handleSizeChange () { },
    handleCurrentChange () { },
    async loadRoles () {
      const { data, meta } = await getRoles()
      if (meta.status === 200) {
        this.roleList = data
      }
    },
    // 2.0 编辑
    handleEdit (item) {
      this.$refs.roleEditEL.show(item)
    },
    // 3.0删除指定权限delSpecialRight = ({ roleId, rightId })
    async handelDelSingleRight (item, third) {
      // console.log(item, third)
      const { roleId, rightId } = { roleId: item.id, rightId: third.id }
      const { meta, data } = await delSpecialRight({ roleId, rightId })
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: `${meta.msg}`
        })
        // console.log(data)
        // console.log(item)
        // 将服务端返回的最新角色权限列表重新赋值给当前角色
        item.children = data
        // console.log(item)
      }
    },
    // 4.0授权角色
    handlePart (item) {
      // 显示授权角色树
      this.$refs.partRoleEL.show()
      // 授权角色树时,  需要将当前用户传入到part-role中
      // 在
      this.$refs.partRoleEL.partHandel(item)
    },
    // 5.0 删除角色
    async handleDelete (item) {
      const { meta } = await delRole(item.id)
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: `${meta.msg}`
        })
        this.loadRoles()
      }
    }
  }
}
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-tag {
  margin-top: 5px;
  margin-right: 5px;
}
</style>
