<template>
<div class="main">
  <div class="mainbody">
    <div class="article">
    <h4 class="title">{{title}}</h4>
    <div class="inf">
      <!-- <span>作者：{{author}}</span>
      <span>{{time}}</span>
      <span>{{like}}喜欢</span> -->
      <div class="information">
        <span style="font-size: 14px; margin-right: 40px;">来自板块：{{section}}</span>
        <div class="empty"></div>
        <div class="view">
        <i class="el-icon-view">{{views}}</i>
      </div>
      <div class="time">
        <i class="el-icon-time">{{releaseTime.slice(0, 10)}}</i>
      </div>
      </div>
      </div>
    <h6 class="content">{{content}}</h6>
  

  </div>

  <div class="release">
    <mavon-editor
              class="mavon"
              ref="md"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
              :imageFilter="uploadBefore"
              v-model="releaseForm.content"/>
  </div>
  <div class="comment">
  </div>
  </div>
  <div class="extra">
    <div class="author">1571095159180-9196</div>
    <div class="gameInf">
      <div class="gameName">相关游戏</div>
      <div class="gamecover">{{cover}}</div>
    </div>


</div>
  
  <!-- <img :src="banner" alt="" class="banner">
  
  <div class="main">
    <div class="connect-game" v-if="gameName" @click="toGame">相关游戏：{{gameName}}</div>
    <div class="title">{{art.title}}</div>
    <div class="author">
      <span>作者：{{art.author}}</span>
      <span>{{time}}</span>
      <span>{{like}}喜欢</span>
      <span>分类：{{art.classify}}</span>
    </div>
    <div v-html="art.article">{{art.article}}</div>
       <b-button :pressed="flag" pill variant="outline-danger" class="mb-2 like-btn" @click="likeIt">
      <b-icon icon="heart" aria-hidden="true" class="heart-icon"></b-icon> {{like}}人喜欢
    </b-button> -->
    <!-- </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      releaseForm:{
        content:"",
      },
      gameList:{},
      name:"",
      cover:"",
      author:"",
      like:0,
      time:"",
      banner:'',
      flag:false,
      likeState:true,//false时不再增加点赞数量了
      id:'',
      gameId:"",
      userId:"",
      gameName:"",
      title:"",
      classification:"",
      section:"",
      content:"",
      views:"",
      releaseTime:"",
    }
  },
  methods:{
    getContent(){
      let id = this.$route.query.id
        axios({
        url:"http://192.168.137.44:10086/information/viewarticle",
        method:'post',
        headers:{
        'accept': "application/json",
    },
        data:{
        id:id
        }})
        .then(res=>{
            this.article = res.data.data.articleEntity;
            this.title = this.article.title
            this.classification = this.article.classification
            this.content = this.article.content
            this.views = this.article.views
            this.releaseTime = this.article.releaseTime
            this.gameId = this.article.gameId
            this.getclassification(this.classification)
            this.getgame(this.gameId)
        })
    },
    getclassification(classification){
      switch(classification){
        case 1:
          this.section = "全部"
          break;
        case 2:
          this.section = "精品"
          break;
        case 3:
          this.section = "杂谈"
          break;
        case 4:
          this.section = "攻略"
          break;
      }
    },
    getgame(gameId){
      axios({
        url:"http://192.168.137.44:10086/games/viewgame",
        method:'post',
        headers:{
        'accept': "application/json",
    },
        data:{
        id:gameId
        }})
        .then(res=>{
            this.gameList = res.data.data.Game;
            this.tagList = res.data.data.Tags;
            this.name = this.gameList[0].name;
            this.cover = this.gameList[0].cover;
        })
    },
    uploadBefore(f) {
          if (f.size > 7355608) {
            this.$message({
              message: "图片过大",
              type: "error"
            });
            return false;
          } else {
            return true;
          }
        },
    $imgAdd(pos, $file){
          // 将图片上传到服务器
          var formdata = new FormData();
          formdata.append('image', $file);
          const token =  localStorage.getItem("token");
          axios({
            url: 'http://192.168.137.44:10086/picture/save',
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
              'token':token
            },
            data:formdata,
          }).then((res) => {
            // 将返回的url替换到文本原位置![...](0) -> ![...](url)
            if (res.status === 200) {
              this.$refs.md.$img2Url(pos, res.data.data.url);
            } else {
              this.$message({
                message: "图片上传失败",
                type: "error"
              }).catch(() => {
                this.$message({
                  message: "图片上传失败",
                  type: "error"
                });
                this.$refs.md.$img2Url(pos, "");
              });
              this.$refs.md.$img2Url(pos, "");
            }
          })
    },
    likeIt(){
        this.flag = !this.flag
        if(this.flag){
          this.like =  this.like+1
        }
        if(this.flag==false){
          this.like = this.like-1
      }
    },
    toGame(){
      this.$router.push({
        path:"/game",
        query:{game:this.gameName}
      })
    }
  },
  mounted(){
    this.getContent()
    // console.log(this.$route.query.id)
    // let id = this.$route.query.id
    // this.id = id
    // let query = new this.$av.Query('information')
    // query.get(id).then(res=>{
    //   console.log("我是结果：",res)
    //   if(res.attributes.gamename)
    //   {this.gameName=res.attributes.gamename}
    //   this.art = res.attributes
    //   let date = res.createdAt
    //   let y = date.getFullYear()
    //   let m = date.getMonth() + 1//月份从0开始
    //   m = m < 10 ? '0' + m : m
    //   let d = date.getDate()
    //   d = d < 10 ? ('0' + d) : d
    //   this.time = y + '-' + m + '-' +d
    //   this.banner = res.attributes.img.attributes.url
    //   this.like = res.attributes.like//文章的点赞数
    // })
    // let query2 = new this.$av.Query("_User")
    // let user = this.$av.User.current()
    // let userid =user.id
    // this.userId = userid
    // let artId = this.id
    // query2.get(userid).then(
    //   todo=>{
    //     console.log("这里",todo)
    //     let likeList = todo.attributes.like
    //     let res = likeList.indexOf(artId)
    //     if (res!==-1){
    //       this.flag = true
    //       this.likeState = false
    //       console.log("点过赞了吗",this.likeState)
    //     }
    //   })
  },
  // beforeDestroy(){
  //   let query = new this.$av.Query("information")
  //   let query2 = new this.$av.Query("_User")
  //   let userId = this.userId
  //   query.get(this.id).then((todo)=>{
  //       if(this.flag&&this.likeState){
  //       todo.increment("like",1)
  //       todo.save().then(()=>{
  //         query2.get(userId).then((res)=>{
  //           res.add("like",this.id)
  //           console.log("加入","this.id")
  //           res.save()
  //         })
  //       })
  //     }
  //     if(!this.flag&&!this.likeState){
  //       todo.increment("like",-1)
  //        todo.save().then(()=>{
  //         query2.get(userId).then((res)=>{
  //           res.remove("like",this.id)
  //           console.log("去掉",this.id)
  //           res.save()
  //         })
  //       })
  //     }
  //   }) 
  // }
}
</script>

<style scoped> 
.main{
  margin-top:120px;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction:row
}
.mainbody{
  flex:3;
  margin-left: 320px;
  margin-right: 25px;
}
.article{
  margin: auto;
  background-color: white;
}
.extra{
  flex:1;
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  margin-right: 120px;
  
}
.author{
  padding: 10px;
  margin-bottom: 10px;
  width: 320px;
  height: 320px;
  background-color: white;
  border-radius: 10px 10px 10px 10px;

}
.gameInf{
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  width: 320px;
  height: 320px;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
}
.inf{
  padding:10px 25px 10px 25px;
  margin: 10px 50px 20px 50px;
  background-color:aliceblue
}
.release{
  padding-top: 10px;
  margin: auto;
}
.banner{
  width: 800px;
  height: 300px;
  object-fit: cover;
}
.connect-game{
  color:#fff;
  background:cornflowerblue;
}
.title{
  padding-top:30px;
  padding-bottom:20px;
  font-size: 36px;
  text-align:center;

}
.content{
  padding:40px 40px;
  width: 640px;
  white-space: pre-wrap;
}
.like-btn{
  margin: 0 auto;
  display: flex;
  align-items: center;
  line-height: 1.5;
}
.heart-icon{
  margin-right: 10px;
}
.information{
  display: flex;
  position: relative;
}
.empty{
    flex:20
  }
.view{
  font-size: 14px;
  flex:5;
  text-align: left;
}
.time{
  font-size: 14px;
  flex:5;
  text-align: right;
  margin-right:20px;
}
</style>