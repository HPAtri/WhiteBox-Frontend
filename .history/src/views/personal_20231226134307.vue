<template>
    <div class="main">
      <div class="PersonTop">
        <div class="PersonTop_img">
          <img v-image-preview :src="icon" />
        </div>
        <div class="PersonTop_text">
          <div class="user_text">
            <div class="user_name">
              <span> {{ nickname }} </span>
            </div>
            <!-- <div class="user-v" v-if="v === 3"> -->
              <!-- <img src="@/assets/img/V.png" class="user-v-img" /> -->
              <!-- <span class="user-v-font">优质媒体作者</span>
            </div>
            <div class="user_qianming">
              <span> {{ design }}</span>
            </div>
            <div class="user_anniu">
            </div>
          </div>
          <div class="user_num"> -->
            <!-- <div style="cursor: pointer" @click="myfan">
              <div class="num_number">{{ fanCounts }}</div>
              <span class="num_text">粉丝</span>
            </div>
            <div style="cursor: pointer" @click="myfollow">
              <div class="num_number">{{ followCounts }}</div>
              <span class="num_text">关注</span>
            </div>
            <div>
              <div class="num_number">{{ goodCounts }}</div>
              <span class="num_text">获赞</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="person_body">
    <el-tabs :tab-position="left" style="height: 200px;">
      <el-tab-pane label="用户信息">
        <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">{{nickname}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{phone_number}}</el-descriptions-item>
    <el-descriptions-item label="生日">{{birthday}}</el-descriptions-item>
    <el-descriptions-item label="性别">{{sex}}</el-descriptions-item>
    <el-descriptions-item label="个人简介">{{profile}}</el-descriptions-item>
</el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="发帖">
        <div class="article-item" v-for="(item,index) in myArticles" :key="index" @click="toArticle(item.articleId)">
          <h4 class="title">{{item.title}}</h4>
          <h6 class="content">{{item.content}}</h6>
          <div class="pictures">
          <div v-for="(item,index) in myArticles[index].picture.split(' ')" :key="index">
          <img :src="item" class="article-img"></div>
        </div>
        <div class="information">
        <div class="empty"></div>
        <div class="view">
        <i class="el-icon-view">{{item.views}}</i>
      </div>
      <div class="time">
        <i class="el-icon-time">{{item.releaseTime.slice(0, 10)}}</i>
      </div>
      </div>
      </div></el-tab-pane>
      <el-tab-pane label="收藏">收藏</el-tab-pane>
    </el-tabs>
      </div>
</div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        userList:[],
        myArticles:[],
        colectArticles:[],
        icon: "",
        nickname: "",
        phone_number:"",
        birthday:"",
        sex:"",
        profile:"",
        v: 1,
        design: "",
        followCounts: "",
        
        fanCounts: "",
        goodCounts: "",
        isfollow: true,
        followData: {
          fanId: "",
          followId: "",
        },
        isfollowid: [],
      };
    },
    mounted() {
      this.load();
    },
    // watch: {
    //   $route(to) {
    //     if (to.path == `/newsuser/personal/${this.$store.state.id}`) {
    //       this.reload();
    //     } else if (to.path == `/newsuser/personal/${this.$route.params.id}`) {
    //       this.reload();
    //     }
    //   },
    // },
    methods: {
        load(){
        const token =  localStorage.getItem("token");
        axios({
        url:"http://192.168.137.44:10086/user/homepage",
        method:'get',
        headers:{
        'accept': "application/json",
        'token':token,
        }})
        .then(res=>{
            this.userList = res.data.data.info;
            console.log(this.userList);
            this.nickname = this.userList[0].user_name;
            this.phone_number=this.userList[0].phone_number;
            this.birthday=this.userList[0].birthday;
            this.profile=this.userList[0].profile;
            this.icon=this.userList[0].icon;
            if(this.userList[0].sex==0){
              this.sex="女";
            }
            if(this.userList[0].sex==1){
              this.sex="男";
            }
            if(this.userList[0].sex==-1){
              this.sex="不愿透露";
            }
        });
        axios({
        url:"http://192.168.137.44:10086/user/myarticles",
        method:'get',
        headers:{
        'accept': "application/json",
        'token':token,
        }})
        .then(res=>{
            this.myArticles = res.data.data.articles ;
            console.log(this.myArticles);
        })
        },
      toArticle(articleId){
      console.log(this.articleId);
      let id = articleId
      this.$router.push({
        path:"/About",
        query:{id:id}
      })
    },
    }
    
};
  </script>
  
  <style scoped>
  .main{
    width: 80%;
    margin: 50px auto;
    display: flex;
    flex-direction:column;
    background-color:white;
  }
  .PersonTop {
    width: 1000px;
    height: 100px;
    margin: 70px auto;
    display: flex;
    border-radius: 5px;
  }
  
  .PersonTop_img {
    width: 150px;
    height: 120px;
    background-color: #8c939d;
    margin-right: 24px;
    margin-left: 20px;
    overflow: hidden;
    border-radius: 20px;
  }
  
  .PersonTop_img img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  
  .PersonTop_text {
    height: 120px;
    width: 880px;
    display: flex;
  }
  
  .user_text {
    width: 60%;
    height: 100%;
    line-height: 30px;
  }
  
  .user_name {
    font-weight: bold;
  }
  .user-v {
    margin-bottom: -5px;
  }
  .user-v-img {
    width: 15px;
    height: 15px;
  }
  .user-v-font {
    font-size: 15px;
    color: #00c3ff;
  }
  .user_qianming {
    font-size: 14px;
    color: #999;
  }
  
  .user_num {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .person_body {
    width: 1000px;
    border-radius: 5px;
    margin: 30px auto;
    padding: 20px;
  }
  .article-item{
    margin:8px;
    padding: 6px 4px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor:pointer;
  }
  .pictures{
    display: flex;
  }
  .article-img{
    margin: 10px 5px;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  .title{
    font-family: "黑体";
  }
  
  .title:hover{
    font-family: "黑体";
    color: #00c3ff;
}
  .content{
    font-family: "微软雅黑";
    color: #8c939d;
  }
  .content:hover{
    font-family: "微软雅黑";
    color: #00c3ff;
}
.information{
  display: flex;
  position: relative;

  height: 25px;
  }
  .empty{
    flex:20
  }
  .view{
    flex:5;
  text-align: left;
}
  .time{
    flex:5;
  text-align: right;
  margin-right:20px;
}

  </style>
  