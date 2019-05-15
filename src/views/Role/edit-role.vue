<template>
  <el-dialog title="编辑用户"
             :visible.sync="formVisible">
    <el-form :model="dataForm"
             ref="dialogForm"
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
                 @click="handelSubmit">确 定</el-button>
      <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import { editRole } from '@/api/role'
export default {
  name: '',
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
    show (item) {
      this.formVisible = true
      this.dataForm = item
    },
    handelSubmit () {
      this.$refs.dialogForm.validate(valid => {
        if (!valid) return
        // (id, { roleName, roleDesc })
        this.SendData()
      })
    },
    async SendData () {
      const id = this.dataForm.id
      const { meta } = await editRole(id, this.dataForm)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `编辑成功`
        })
        this.$emit('edit-success')
        this.$refs.dialogForm.resetFields()
        this.formVisible = false
      } else {
        this.$message({
          type: 'danger',
          message: '编辑失败'
        })
      }

    }

  }
}
</script>
<style scoped>
</style>
