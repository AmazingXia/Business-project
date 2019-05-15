<template>
<div class="part-user">
  <el-dialog title="添加用户" :visible.sync="partUserFormVisible">
    <el-form :model="userSingleObj" ref="dialogForm">
      <el-form-item label="用户名" label-width="15%" prop="username" disabled>
        <el-input v-model="userSingleObj.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请选择角色" label-width="15%">
        <el-select v-model="userSingleObj.rid" placeholder="请选择">
          <el-option :value="-1" label="请选择">请选择</el-option>
          <!-- <el-option label="请选择" :value="-1"></el-option> -->
          <el-option
            v-for="item in roleArr"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="partUserFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmitPart">确 定</el-button>
       <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
    </div>
  </el-dialog>
</div>
</template>
<script>
import { getRoles } from '@/api/role.js'
// { id, rid }
import { partUserRole, queryUserById } from '@/api/user'

export default {
  name: 'PartUser',
  data () {
    return {
      partUserFormVisible: false,
      options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          roleArr: [],
          // children: (5) [{…}, {…}, {…}, {…}, {…}]
          // id: 30
          // roleDesc: "技术负责人"
          // roleName: "主管"
          userSingleObj: {}
          // email: "adsfad@qq.com"
          // id: 500
          // mobile: "12345678"
          // rid: 0
          // username: "admin"
    }
  },
  methods: {
    partHandel () {

    },
    async handelPartUserShow (item) {
      this.partUserFormVisible = true
      const { data: roleData, meta: roleMeta } = await getRoles()
      this.roleArr = roleData
      console.log(roleData);
      const { data: userData, meta: userMeta } = await queryUserById(item.id)
      this.userSingleObj = userData
      console.log(userData);
    },
    async handleSubmitPart () {
      const { data, meta } = await partUserRole(this.userSingleObj)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${meta.msg}`
        })
        this.partUserFormVisible = false
      }
    }
  }
}
</script>
<style scoped>
.part-user {
  height: 50%;
}
</style>
