<template>
     <div class="top flex">
      <div class="left">
        <img src="@/assets/logo.png" class="logo"/>
        <router-link to="/" class="tabbar-item">首页</router-link>
        <router-link to="/index" class="tabbar-item">游戏</router-link>
        <el-dropdown>
        <span class="tabbar-item">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>全部</el-dropdown-item>
          <el-dropdown-item>杂谈</el-dropdown-item>
          <el-dropdown-item>资讯</el-dropdown-item>
          <el-dropdown-item>资讯</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        <router-link to="/about" class="tabbar-item">资讯</router-link>
      </div>
      <div class="right flex">
        <input class="search" placeholder="search" v-model="find" @keyup.enter="search">
        <span class="search-btn"><img src="@/assets/icon/search.png" class="search-icon" @click="search"></span>
        <router-link to="/login" class="login tabbar-item" v-if="flag==false" >登录</router-link>
        <router-link to="/login" class="reg tabbar-item" v-if="flag==false">注册</router-link>
        <b-dropdown :text="nickname" variant="dark" class="user" size="sm" v-if="flag">
           <b-dropdown-item href="#" @click="toNext">个人中心</b-dropdown-item>
           <b-dropdown-item href="#" @click="toNext">我的文章</b-dropdown-item>
           <b-dropdown-item href="#" @click="toNext">我的点赞</b-dropdown-item>
           <b-dropdown-item href="#" @click="logOut">登出</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

</template>

<script>

export default {
    name:"navbar",
    components: {},
    data() {
      return {
      tabIndex:1,
      flag:false,
      nickname:'',
      find:'',
    };
  },
  methods:{
    toNext(){
      this.$router.push({
        path:"/personal"
      })
    },
    logOut(){
      localStorage.clear()
      this.$router.push({
        path:"/home"
      });
      this.$router.go(0)
    },
    search(){
      if(this.find){
      this.$router.push({
        path:"/search",
        query:{key:this.find}
      })
      this.find = ''
    }
  }
  },
  beforeMount(){
      const token =  localStorage.getItem("token");
      if (token) {
        this.flag = true
      } else {
      this.flag = false
      }
    }
}
</script>

<style>
.top{
  width: 100%;
  background: rgba(1, 1, 1, 0.9);
  z-index: 999;
  justify-content: space-between;
  padding:10px 40px;
  box-sizing: border-box;
  box-shadow: 0 3px 10px rgba(1,1,1,0.9);
  position: fixed;
}
.tabbar-item{
  color: rgb(221, 221, 221);
  font-size:25px;
  margin-right: 50px;
  margin-left: 10px;
}
.tabbar-item:hover{
   color: burlywood;
  text-decoration:none;
}

.logo{
  height: 60px;
  width: 60px;
  margin: 0 20px;
}
.right{
  width:680px;
  justify-content: flex-end;
}
.flex{
  display: flex;
  align-items: center;
  flex-wrap:wrap;
}

.search{
  width: 300px;
  border-radius: 20px 0 0 20px;
  height: 40px;
  font-size: 16px;
  line-height: 25px;
  padding: 0 20px;
  outline:none;
  border:0;
}
.search-btn{
  height: 40px;
  border-radius: 0 20px 20px 0;
  width: 30px;
  background: #fff;
  margin-right: 50px;
}

.search-icon{
  padding-top:10px;
  padding-right:10px;
  width: 30px;
  height: 30px;
  cursor:pointer;/*鼠标指针变为一个手*/ 
}

.user{
  margin: 0 ;
}
a.router-link-exact-active{
  color: burlywood;
}

input:focus{ outline:none; }
</style>