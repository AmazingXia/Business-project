<template>
<div class='edit-user'>
  <el-dialog title="编辑用户" :visible.sync="editUserFormVisible">
    <el-form :model="editUserForm" :rules="editUserFormRules" ref="dialogForm">
      <el-form-item label="用户名" label-width="15%" prop="username" >
        <el-input v-model="editUserForm.username" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="15%" prop="email">
        <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="15%" prop="mobile">
        <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editUserFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handelSubmit">确 定</el-button>
       <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
    </div>
  </el-dialog>
</div>
</template>
<script>
import { queryUserById, editUserById } from '@/api/user'
export default {
  name: 'UserEdit',
  created () {

  },
  data () {
    return {
      editUserFormVisible: false,
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      editUserFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handelEditUser (item) {
      const { data, meta } = await queryUserById(item.id)
      if (meta.status === 200) {
        this.editUserForm = data
        this.editUserFormVisible = true
      }
    },
    async handelSubmit () {
      const { id, email, mobile } = this.editUserForm
      const { meta } = await editUserById(id, { email, mobile })
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${meta.msg}`
        })
        this.editUserFormVisible = false
        this.$emit('edit-success')
      }
    }
  }
}
</script>
<style scoped>
</style>
