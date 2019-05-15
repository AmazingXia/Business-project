<template>
  <div class="contanier">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容"
                  v-model="searchText"
                  class="input-with-select"
                  @input="handleSearch">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary"
                   @click="addUserFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading"
              ref="multipleTable"
              :data="usersDataArr"
              tooltip-effect="dark"
              style="width: 100%"
              border
              stripe
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column label="序号"
                       type="index"
                       width="40">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="username"
                       label="姓名"
                       width="100">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="180">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="电话"
                       width="180">
      </el-table-column>
      <el-table-column label="用户状态"
                       width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     :disabled="scope.row.isDisabled"
                     @change="handleChangeState(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     @click="$refs.userEditEL.handelEditUser(scope.row)">编辑用户</el-button>
          <el-button size="mini"
                     type="success"
                     icon="el-icon-check"
                     @click="$refs.roleEditEl.handelPartUserShow(scope.row)">分配角色</el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-delete"
                     @click="handleDeleteUser(scope.row)">删除用户</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        width="240"
      >
        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      </el-table-column> -->
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[ 3, 5, 10 ]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="usersTotal">
    </el-pagination>

    <el-dialog title="添加用户"
               :visible.sync="addUserFormVisible">
      <el-form :model="addUserForm"
               :rules="addUserFormRules"
               ref="dialogForm">
        <el-form-item label="用户名"
                      label-width="15%"
                      prop="username">
          <el-input v-model="addUserForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      label-width="15%"
                      prop="password">
          <el-input v-model="addUserForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      label-width="15%"
                      prop="email">
          <el-input v-model="addUserForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      label-width="15%"
                      prop="mobile">
          <el-input v-model="addUserForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addUserFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addHandel">确 定</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
      </div>
    </el-dialog>
    <UserEdit ref="userEditEL"
              @edit-success="loadUsers"></UserEdit>
    <PartUser ref="roleEditEl"></PartUser>
  </div>
</template>
<script>
// { query = '', pagenum = 1, pagesize = 20 }
import * as User from '@/api/user.js'
import UserEdit from './edit-user'
import PartUser from './part-user'
export default {
  name: 'User',
  created () {
    this.loadUsers()
  },
  data () {
    const checkUsername = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('用户名已存在'))
      // }
      setTimeout(function () { // 请求验证用户名是否存在的接口
        const isExists = false
        if (isExists) {
          callback(new Error('用户名已存在'))
        } else {
          callback() // 验证通过
        }
      }, 1000)
    }
    return {
      usersTotal: 0,
      currentPage: 1,
      pageSize: 5,

      loading: false,
      isCheckStatus: false,
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      },
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        mg_state: false,
        id: ''
      },
      addUserFormVisible: false,
      searchText: '',
      usersDataArr: []
      // 这是一个item
      // {
      // create_time: 1486720211
      // email: "adsfad@qq.com"
      // id: 500
      // isDisabled: false
      // mg_state: true
      // mobile: "12345678"
      // role_name: "超级管理员"
      // username: "admin"
      // }
    }
  },
  methods: {
    handleSearch () {
      this.currentPage = 1
      this.loadUsers()
    },
    handleSizeChange (p) {
      this.pageSize = p
      this.currentPage = 1
      this.loadUsers()
    },
    handleCurrentChange (p) {
      // console.log(p);
      this.currentPage = p
      this.loadUsers()
    },
    handleEditRole () { },
    handleDelete () { },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 1.0  获取用户数据并显示
    async loadUsers () {
      this.loading = true
      const { data, meta } = await User.getUsers({ query: this.searchText, pagenum: this.currentPage, pagesize: this.pageSize })
      if (meta.status === 200) {
        // console.log(data.users)
        // this.usersDataArr = data.users.concat().map(item => Object.assign(item, { isDisabled: false }))
        // this.usersDataArr = data.users.concat().map(item => )

        this.usersDataArr = data.users.map((item) => {
          item.isDisabled = false
          return item
        })
        // console.log(data.users)
        // this.usersDataArr = data.users
        // console.log(this.usersDataArr)
        this.usersTotal = data.total
        this.loading = false
      }
    },
    // 2.0  添加用户
    addHandel () {
      this.$refs.dialogForm.validate(valid => {
        if (!valid) return
        this.submitAdd()
      })
    },
    // 2.1  提交添加的用户数据
    async submitAdd () {
      const { meta } = await User.addUser(this.addUserForm)
      if (meta.status === 201) {
        this.$message({
          message: `${meta.msg}`,
          type: 'success'
        })
        this.addUserFormVisible = false
        this.$refs.dialogForm.resetFields()
        this.loadUsers() // 刷新数据列表
      } else if (meta.status === 400) {
        this.$message.error(`添加失败: ${meta.msg}`)
      }
    },
    // 3.0  启用或者禁用用户状态
    // 3.1  发送请求时禁用按钮
    async handleChangeState (item) {
      item.isDisabled = true
      const { id: uId, mg_state: type } = item
      // console.log(uId,type)
      const { data, meta } = await User.updataUserState({ uId, type })
      if (meta.status === 200) {
        this.$message({
          message: data.mg_state ? '启用成功' : '禁用成功',
          // message: `${data.mg_state ? '启用' :'禁用'}成功`,
          type: 'success'
        })
        item.isDisabled = false
      }
    },
    // 4.0 删除用户
    async handleDeleteUser (item) {
      const { meta } = await User.delUser(item.id)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${meta.msg}`
        })
        this.loadUsers()
      }
    }
  },
  components: {
    UserEdit,
    PartUser
  }
}
</script>

<style scoped>
</style>
