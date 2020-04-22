<template>
  <div class="container">
    <div class="Btn">
      <el-button class="logoutBtn" type="primary" round @click="toLogout">注销</el-button>
      <el-button type="primary" round @click="toLogin" v-show="!isLogin">登录</el-button>
      <el-button class="manageBtn" type="primary" round @click="toManage" v-show="isLogin">管理</el-button>
    </div>
    <div class="search">
      <img src="../assets/image/icon.jpeg" alt="">
      <el-input v-model="searchWord" placeholder="瞅你咋地~" @keyup.enter.native="clickSearch">
        <el-button slot="append" type="primary" icon="el-icon-search" @click="clickSearch" />
      </el-input>
    </div>
    <div class="favorites">
      <a v-for="item in collections" :key="item.cid" :href="item.link" target="_blank"><img :src="item.link + '/favicon.ico'" alt="" class="fav"></a>
    </div>
    <div class="container-beian">
      <Record class="beian"></Record>
    </div>
  </div>
</template>

<script>
import Record from './Record.vue'
export default {
  components: {
    Record
  },
  data: () => ({
    searchWord: '',
    searchEngine: '',
    isLogin: window.localStorage.getItem('token') !== null,
    collections: [
      {
        cid: 1,
        link: 'https://www.github.com'
      },
      {
        cid: 2,
        link: 'https://www.bilibili.com'
      },
      {
        cid: 3,
        link: 'https://blog.csdn.net'
      }
    ]
  }),
  provide: function () {
    return {
      collections: this.collections
    }
  },
  created () {
    if (window.localStorage.getItem('token') !== null) {
      this.getCollections()
    }
  },
  methods: {
    clickSearch () {
      window.open('https://www.google.com/search?q=' + this.searchWord)
    },
    toLogin () {
      this.$router.push('/login')
    },
    toManage () {
      this.$router.push('/manage')
    },
    toLogout () {
      if (window.localStorage.getItem('token') === null) {
        return this.$message.error('请登录')
      }
      window.localStorage.clear()
      this.$message.success('注销成功')
      setTimeout(function () {
        location.reload()
      }, 2000)
    },
    async getCollections () {
      const { data: res } = await this.$http.post('/getLinks')
      this.collections = res
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-image: url("https://area.sinaapp.com/bingImg");

  .Btn {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;

    .logoutBtn {
      opacity: 0.1;
    }
    .logoutBtn:hover {
      opacity: 1;
    }

    .manageBtn {
      opacity: 0.1;
    }
    .manageBtn:hover {
      opacity: 1;
    }
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
  .container-beian {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
  .beian {
    width: 250px;
    margin: 5px auto;
  }
}
</style>
