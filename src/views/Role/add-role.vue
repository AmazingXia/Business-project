<template>
  <el-dialog title="添加角色"
             :visible.sync="formVisible">
    <el-form :model="dataForm"
             ref="dialogFormEl"
             :rules="rules">
      <el-form-item label="角色名称"
                    label-width="15%"
                    prop="roleName">
        <el-input v-model="dataForm.roleName"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述"
                    label-width="15%"
                    prop="roleDesc">
        <el-input v-model="dataForm.roleDesc"
                  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="formVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="handelCommit">确 定</el-button>
      <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
// addRole = ({ roleName, roleDesc })
// <el-tag
//   v-for="tag in tags"
//   :key="tag.name"
//   closable
//   :type="tag.type">
//   {{tag.name}}
// </el-tag>
import { addRole } from '@/api/role'
export default {
  name: 'AddRole',
  data () {
    return {
      formVisible: false,
      rules: {
        roleDesc: [
          { required: true, message: '请输入用户描述', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      dataForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    show () {
      this.formVisible = true
    },

    handelCommit () {
      this.$refs.dialogFormEl.validate(valid => {
        if (!valid) return
        this.handelSubmit()
      })
    },
    async handelSubmit () {
      const { meta } = await addRole(this.dataForm)
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: `${meta.msg}`
        })
        this.$refs.dialogFormEl.resetFields()
        this.formVisible = false
      }
    }
  }
}
</script>
<style scoped>
</style>
