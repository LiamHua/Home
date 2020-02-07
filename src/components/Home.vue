<template>
  <div class="container">
    <div class="loginBtn">
      <el-button type="primary" round @click="toLogin" v-show="!isLogin">登录</el-button>
    </div>
    <div class="search">
      <img src="../assets/image/icon.jpeg" alt="">
      <el-input v-model="searchWord" placeholder="瞅你咋地~" @keyup.enter.native="clickSearch">
        <el-button type="primary" @click="clickSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="favorites">
      <a href=""><img src="../assets/image/icon.jpeg" alt="" class="fav"></a>
      <a href=""><img src="../assets/image/icon.jpeg" alt="" class="fav"></a>
      <a href=""><img src="../assets/image/icon.jpeg" alt="" class="fav"></a>
      <a href=""><img src="../assets/image/icon.jpeg" alt="" class="fav"></a>
      <a href=""><img src="../assets/image/icon.jpeg" alt="" class="fav"></a>
      <a href=""><img src="../assets/image/icon.jpeg" alt="" class="fav"></a>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchWord: '',
    searchEngine: '',
    isLogin: false
  }),
  methods: {
    clickSearch () {
      window.open('https://cn.bing.com/search?q=' + this.searchWord)
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-image: url("../assets/image/background.jpeg");

  .loginBtn {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    padding-right: 10px;
  }

  .search {
    width: 500px;
    margin: 0 auto;
    margin-top: 150px;

    img {
      margin-left: 190px;
      height: 120px;
      width: 120px;
      margin-bottom: 30px;
      border-radius: 50%;
    }
  }

  .favorites {
    width: 500px;
    margin: 70px auto;
    display: flex;
    justify-content: space-around;

    .fav {
      height: 48px;
      width: 48px;
      border-radius: 50%;
    }
  }
}
</style>
