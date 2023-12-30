<template>
  <div>
   <div class="main">
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
      </div>
  </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      tab:0,
      artList:[],
      showList:[]
    }
  },
  methods:{
      getArticle(){
        let id = this.$route.query.classification
        axios({
        url:"http://192.168.137.44:10086/games/viewgame",
        method:'post',
        headers:{
        'accept': "application/json",
    },
        data:{
        id:id
        }})
        .then(res=>{
            this.artList = res.data.data.Game;
        })
    },
      },
      toCon(artId){
        let id = artId
         this.$router.push({ 
           path:'/about/content',
           query: {id:id}
           })
      },
    changeTab(num){
      this.tab = num
      const query = new this.$av.Query('information')
      switch(num){
        case 0:
          this.showList = this.artList
          break;
        case 1:
          query.equalTo("good",true)
          query.find().then(res=>{
            this.showList = res
          })
          break;
        case 2:
           query.equalTo("classify","攻略")
           query.find().then(res=>{
            this.showList = res
          })
          break;
        case 3:
          query.equalTo("classify","杂谈")
           query.find().then(res=>{
            this.showList = res
          })
          break;
      }
    }
  },
  beforeMount(){
    this.getArticle()
  }
}
</script>

<style scoped>
ul{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
}
li{
    list-style: none;
    width: 100px;
}

li label{
    font-size: 24px;
    cursor: pointer;
}

.information{
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.info{
  width: 730px;
  background: rgb(34, 34, 34);
  margin: 20px 0;
}
.info-img{
  width: 100%;
  height: 400px;
  background: slategrey;
  object-fit: cover;
}
.info-text{
  padding: 10px 20px; 
  box-sizing: border-box;
  font-size: 20px;
  color: #fff;
}
.info:hover{
  box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
  cursor:pointer;/*鼠标指针变为一个手*/ 
}
.main{
  width: 1500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 100px;
  flex-wrap: wrap;
}
.active{
  color: #D9A86C;
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
</style>
