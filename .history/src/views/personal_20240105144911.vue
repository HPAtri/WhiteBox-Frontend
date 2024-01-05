<template>
    <div class="main">
      <el-dialog :title="dialogTitle" :visible.sync="updateVisible" width="50%"  @close="closeForm()">
        <el-form :model="updateform" :rules="rules" ref="updateform" :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
            <el-form-item label="用户名" prop="yonghu">
                <el-input v-model="updateform.nickname" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone_number">
                <el-input v-model="updateform.phone_number" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker
                  v-model="updateform.birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="updateform.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="profile">
                <el-input v-model="updateform.profile" suffix-icon="el-icon-edit" style="width: 620px;"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="icon">
              <el-upload
                action="#"
                list-type="picture-card"
                :limit=1
                :on-change="handlePhoto"
                accept=".jpg,.jpeg,.JPG,.JPEG"
                :on-remove="handleRemove"
                :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" v-show="!isView" @click="submitForm()">确定</el-button>
            <el-button type="info" size="mini" @click="closeForm()">取消</el-button>
        </span>
      </el-dialog>
      <div class="PersonTop">
        <div class="PersonTop_img">
          <img v-image-preview :src="icon" />
        </div>
        <div class="PersonTop_text">
          <div class="user_text">
            <div class="user_name">
              <span> {{ nickname }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="person_body">
      <div style="margin-top:10px; margin-left: 820px;"><el-button type="primary" style=" height:36px;width:90px; font-size: 12px;" @click="update()">修改信息</el-button>
  </div>
    <el-tabs :tab-position="left" v-model="activeName" style="height: 200px;">
      <el-tab-pane label="用户信息" name="用户信息">
        <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名" >{{nickname}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{phone_number}}</el-descriptions-item>
    <el-descriptions-item label="生日">{{birthday}}</el-descriptions-item>
    <el-descriptions-item label="性别">{{sex}}</el-descriptions-item>
    <el-descriptions-item label="个人简介">{{profile}}</el-descriptions-item>

</el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="发帖" name="发帖">
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
      </div></el-tab-pane >
      <el-tab-pane label="收藏" name="收藏">收藏</el-tab-pane>
    </el-tabs>
      </div>
      <el-backtop :bottom="20">
       <div
          style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              }"
        >
          UP
       </div>
    </el-backtop>
</div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        options: [{
          value: 0,
          label: '女'
        }, {
          value: 1,
          label: '男'
        }, {
          value: -1,
          label: '不愿透露'
        },],
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
        activeName:"用户信息",
        fanCounts: "",
        goodCounts: "",
        isfollow: true,
        updateVisible:false,
        followData: {
          fanId: "",
          followId: "",
        },
        updateform:{
          icon: "",
          nickname: "",
          phone_number:"",
          birthday:"",
          sex:"",
          profile:"",
        },
        isfollowid: [],
        fileList: [],
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
        if(localStorage.getItem("activeName")){
          this.activeName = localStorage.getItem("activeName");
        }
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
      localStorage.setItem("activeName",this.activeName);
      console.log(this.articleId);
      let id = articleId
      this.$router.push({
        path:"/about/content",
        query:{id:id}
      })
    },
    update(){
      this.updateform.nickname = this.nickname;
      this.updateform.icon = this.icon;
      this.updateform.phone_number = this.phone_number;
      this.updateform.birthday = this.birthday;
      this.updateform.sex = this.userList[0].sex;
      this.updateform.profile = this.profile;
      this.updateVisible=true
    },
    submitForm(){
      const token =  localStorage.getItem("token");
      const userId =  localStorage.getItem("userId");
      axios({
        url:"http://192.168.137.44:10086//user/updateuser",
        method:'post',
        headers:{
        'accept': "application/json",
        'token':token,
        },
        data:{
          userId : userId,
          userName : this.updateform.nickname,
          icon : this.updateform.icon,
          sex : this.updateform.sex,
          profile : this.updateform.profile,
          birthday : this.updateform.birthday,
          phoneNumber : this.updateform.phoneNumber,
        }}).then((res) => {
          if(res.data.data.retCode == "0000"){
          this.$message({
          message: 'xiugaicg',
          type: 'success'})
        }
        })
    },
    closeForm(){
      this.updateform.nickname = "";
      this.updateform.icon = "";
      this.updateform.phone_number = "";
      this.updateform.birthday = "";
      this.updateform.sex = "";
      this.updateform.profile = "";
      this.updateVisible=false
    },
      handlePhoto(file) {
        const token =  localStorage.getItem("token");
        var formdata = new FormData();
        formdata.append('image', file.raw);
        axios({
            url: 'http://192.168.137.44:10086/picture/save',
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
              'token':token
            },
            data:formdata,
          }).then((res) => {
            this.updateform.icon = res.data.data.url
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
    padding: 6px 20px 2px 10px;
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
.el-input{
width: 250px;
}
.el-date-picker{
width: 250px;
}
.el-select{
  width: 250px;
}
  </style>
  