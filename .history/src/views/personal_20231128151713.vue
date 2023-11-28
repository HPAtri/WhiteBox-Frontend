<template>
    <div>
     <p></p>
    </div>
  </template>
  
  <script>
//   import {
//     myFollow,
//     addFollow,
//     deleteFollow,
//     followAndFanCount,
//   } from "@/api/follow.js";
  import PersonalDia from "./PersonalDia.vue";
  import axios from "axios";
  export default {
    components: { PersonalDia },
    name: "Personal",
    inject: ["reload"],
    data() {
      return {
        avatar: "",
        nickname: "xxx",
        v: 1,
        design: "www",
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
        //load() {
        // userInfo(this.$route.params.id)
        //   .then((res) => {
        //     console.log(res);
        //     this.avatar = res.data.avatar;
        //     this.nickname = res.data.nickname;
        //     this.v = res.data.v;
        //     this.design = res.data.design;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        // }, 
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
        })
        },
        // myFollow(this.$store.state.id)
        //   .then((res) => {
        //     res.data.forEach((res) => {
        //       this.isfollowid.push(res.id);
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
    //     //   });
  
    //     followAndFanCount(this.$route.params.id)
    //       .then((res) => {
    //         this.followCounts = res.data.followCounts;
    //         this.fanCounts = res.data.fanCounts;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   },
    //   myfan() {
    //     this.$router.push({
    //       path: `/newsuser/personal/myfan/${this.$route.params.id}`,
    //     });
    //   },
    //   myfollow() {
    //     this.$router.push({
    //     path:`/newsuser/personal/myfollow/${this.$route.params.id}`,
    //     });
    //   },
    //   follow() {
    //     if (!this.$store.state.id) {
    //       this.$message({
    //         showClose: true,
    //         message: "请登录后再进行操作哦",
    //         type: "warning",
    //       });
    //     } else {
    //       this.followData.followId = this.$route.params.id;
    //       this.followData.fanId = this.$store.state.id;
    //       if (this.isfollowid.indexOf(this.followData.followId) > -1) {
    //         this.isfollow = true;
    //       } else {
    //         this.isfollow = false;
    //       }
    //       if (this.isfollow) {
    //         deleteFollow(this.followData)
    //           .then(() => {
    //             this.isfollow = false;
    //             this.$message({
    //               showClose: true,
    //               message: "已取消关注",
    //               type: "success",
    //             });
    //             this.reload();
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //           });
    //       } else if (!this.isfollow) {
    //         addFollow(this.followData)
    //           .then(() => {
    //             this.isfollow = true;
    //             this.$message({
    //               showClose: true,
    //               message: "已成功关注",
    //               type: "success",
    //             });
    //             this.reload();
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //           });
    //       }
    //     }
    //   },

    }
};
  </script>
  
  <style scoped>
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
  
  .person_body_left {
    width: 27%;
    height: 600px;
    border-radius: 5px;
    margin-right: 3%;
    text-align: center;
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
  
  .person_body_right {
    width: 70%;
    /* height: 500px; */
    border-radius: 5px;
    background-color: white;
  }
  
  .box-card {
    height: 500px;
  }
  
  /*ui样式*/
  .el-button {
    width: 84px;
  }
  </style>
  