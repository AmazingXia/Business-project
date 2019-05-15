<template>
  <div class='login-wrap'>
    <div class='login-contaniner'>
      <el-form
      :rules="loginFormRules"
      label-position='top'
      label-width='80px'
      :model="loginFormData"
      ref='loginFormEl'>
        <el-form-item label='用户名' prop='username'>
          <el-input v-model='loginFormData.username'></el-input>
        </el-form-item>
        <el-form-item label='密码' prop='password'>
          <el-input v-model='loginFormData.password' type='password'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class='login-btn' type='primary' @click.prevent='handleLogin'>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      loginFormData: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginFormEl.validate((valid) => {
        if (valid) {
          this.Login()
        } else {
          return false
        }
      })
    },
    Login () {
      // 'http://localhost:8080/#/login'
      axios.post('http://localhost:8888/api/private/v1/login', this.loginFormData).then(res => {
        const { data, meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          window.localStorage.setItem('token', data.token)
          this.$router.replace('/')
        } else {
          this.$message.error(`登录失败: ${meta.msg}`)
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #2f4050;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-contaniner {
  width: 30%;
  /* height: 200px; */
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 50px;
}

.login-btn {
  width: 100%;
}
</style>
