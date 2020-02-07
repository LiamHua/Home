<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img
          src="../assets/image/icon.jpeg"
          alt="头像"
        >
      </div>

      <el-form
        ref="LoginFormRef"
        :model="LoginForm"
        :rules="LoginFormRules"
        class="login_form"
        label-width="auto"
      >
        <!-- username -->
        <el-form-item prop="username">
          <el-input
            v-model="LoginForm.username"
            prefix-icon="iconfont icon-yonghu"
          />
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            v-model="LoginForm.password"
            prefix-icon="iconfont icon-mima"
            type="password"
          />
        </el-form-item>
        <!-- button -->
        <el-form-item class="buttons">
          <el-button
            type="primary"
            @click="loginValidate"
          >
            登录
          </el-button>
          <el-button
            type="info"
            @click="resetLoginForm"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      LoginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单重置
    resetLoginForm () {
      this.$refs.LoginFormRef.resetFields()
    },
    loginValidate () {
      // 登录前校验
      this.$refs.LoginFormRef.validate(async status => {
        if (!status) return this.$message.error('格式错误！')
        // 发起登录请求
        // 深拷贝实现解除双向绑定
        let loginForm = JSON.parse(JSON.stringify(this.LoginForm))
        // 加密
        loginForm.password = this.$md5(loginForm.password)
        const { data: res } = await this.$http.post('login', loginForm)
        if (res !== 200) return this.$message.error('账号或密码错误，请重新输入！')
        window.sessionStorage.setItem('token', 'fhsdhfshfiudhfuishfuisdhfui')
        this.$message.success('登录成功！')
        await this.$router.push('/home')
        // TODO 有一个小bug：点击退出登陆后需要刷新页面才能输入信息进行登录，否则无法输入
        // 一天后，这个 bug 莫名其妙的好了
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container {
    background-image: url('../assets/image/login.jpeg');
    height: 100%;
  }

  .login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 7px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
