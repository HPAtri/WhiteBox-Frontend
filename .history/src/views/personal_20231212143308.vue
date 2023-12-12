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
            <div class="user-v" v-if="v === 3">
              <!-- <img src="@/assets/img/V.png" class="user-v-img" /> -->
              <span class="user-v-font">优质媒体作者</span>
            </div>
            <div class="user_qianming">
              <span> {{ design }}</span>
            </div>
            <div class="user_anniu">
            </div>
          </div>
          <div class="user_num">
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
        <div class="article-item" v-for="(item,index) in myArticles" :key="index">
          <h3 class="game-name">{{item.title}}</h3>
          <h4 class="game-name">{{item.content}}</h4>
          <div class="article-item" v-for="(item,index) in myArticles" :key="index"></div>
          <img :src="item.pic" class="article-img">
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
        myArticles:[{title:"这是标题",inf:"这是介绍信息",pic:"https://cdn.hk01.com/di/media/images/dw/20210720/494233049202954240095127.jpeg/Gtaq3XCs2uf6M9GekdCXNBW9HVM_YoBE0mHODdJhzg0?v=w800"}],
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
    }
};
  </script>
  
  <style scoped>
  .main{
    width: 80%;
    height: 800px;
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
    margin-top:1px;
    box-shadow: -2px -2px 12px 0 rgba(0, 0, 0, 0.1)

  }
  .article-img{
    width: 240px;
    height: 240px;
    object-fit: cover;
  }

  </style>
  