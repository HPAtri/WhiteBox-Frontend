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
            <div style="cursor: pointer" @click="myfan">
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
            </div>
          </div>
        </div>
      </div>
      <div class="person_body">
    <el-tabs :tab-position="left" style="height: 200px;">
      <el-tab-pane label="用户信息">
        <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">{{this.userList[0].user_name}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{phone_number}}</el-descriptions-item>
    <el-descriptions-item label="生日">{{birthday}}</el-descriptions-item>
    <el-descriptions-item label="性别">{{sex}}</el-descriptions-item>
    <el-descriptions-item label="个人简介">{{profile}}</el-descriptions-item>
</el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="发帖">发帖</el-tab-pane>
      <el-tab-pane label="收藏">收藏</el-tab-pane>
    </el-tabs>
      </div>
      <personal-dia ref="dia" @flesh="reload" />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "Personal",
    inject: ["reload"],
    data() {
      return {
        userList:[],
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
    watch: {
      $route(to) {
        if (to.path == `/newsuser/personal/${this.$store.state.id}`) {
          this.reload();
        } else if (to.path == `/newsuser/personal/${this.$route.params.id}`) {
          this.reload();
        }
      },
    },
    methods: {
        edit() {
        this.$refs.dia.open();
      },
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
        })
        },
    }
};
  </script>
  
  <style scoped>
  .main{
    margin-top:70px
  }
  .me-video-player {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    position: fixed;
    left: 0;
    z-index: 0;
    top: 0;
  }
  .PersonTop {
    width: 1000px;
    height: 140px;
    padding-top: 20px;
    background-color: white;
    margin-top: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
  
  .user_num > div {
    text-align: center;
    border-right: 1px dotted #999;
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    line-height: 20px;
  }
  
  .num_text {
    color: #999;
  }
  
  .num_number {
    font-size: 20px;
    color: #333;
  }
  .el-menu-item>span {
    font-size: 16px;
    color: #999;
  }
  
  /*下面部分样式*/
  .person_body {
    width: 1000px;
    margin-top: 210px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }
  
  
  .person_body_list {
    width: 100%;
    height: 50px;
    margin-top: 25px;
    font-size: 22px;
    border-bottom: 1px solid #f0f0f0;
    background-image: -webkit-linear-gradient(
      left,
      rgb(42, 134, 141),
      #e9e625dc 20%,
      #3498db 40%,
      #e74c3c 60%,
      #09ff009a 80%,
      rgba(82, 196, 204, 0.281) 100%
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
  }
  
  .el-menu-item {
    margin-top: 22px;
  }
  
  
  .box-card {
    height: 500px;
  }
  
  /*ui样式*/
  .el-button {
    width: 84px;
  }
  </style>
  