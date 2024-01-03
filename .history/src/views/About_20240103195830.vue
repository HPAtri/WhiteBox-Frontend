<template>
  <div>
   <div class="main">
    <div class="article">
    <div class="article-item" v-for="(item,index) in artList" :key="index" @click="toArticle(item.articleId)">
          <h4 class="title">{{item.title}}</h4>
          <h6 class="content">{{item.content}}</h6>
          <div class="pictures">
          <div v-for="(item,index) in pichandle(index)" :key="index">
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
  <div id="add">
      <el-popover placement="left-end" trigger="focus" content="新增文章">
        <el-button slot="reference" class="topBtn" icon="el-icon-plus" @click="addArticle()"></el-button>      
      </el-popover>
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
        let classification = this.$route.query.classification
        axios({
        url:"http://192.168.137.44:10086/information/queryarticles",
        method:'post',
        headers:{
        'accept': "application/json",
    },
        data:{
        classification:classification,
        gameId:0,
        }})
        .then(res=>{
            this.artList = res.data.data.articleEntityList;
            console.log(this.artList[8].picture.split(' '))
        })
    },
    pichandle(index){
      return artList[index].picture.split(' ')
    },

    toArticle(artId){
        let id = artId
         this.$router.push({ 
           path:'/content',
           query: {id:id}
           })
      },
    addArticle(){
        this.$router.push({ 
           path:'/addarticle',
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
  watch: {
			$route(){
				this.getArticle();
			}
		},
  created(){
    this.getArticle()
  }
}
</script>

<style scoped>
.main{
  padding-top:80px;
  height: auto;
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
.article{
  width: 1200px;
  border-radius: 5px;
  margin: auto;
  padding: 20px;
  background-color: white;
}

.article-item{
    width: 1000px;
    margin:8px auto;
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
#add {
    position: fixed;
    right: 100px;
    bottom: 50px;
    z-index: 999;
    width: 60px;
    height: 60px;
  }
#add .topBtn {
    width: 60px;
    height: 60px;
    background-color: #a5c1f8;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    cursor: pointer;
    font-size: 35px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    -webkit-animation: wobble 250ms  infinite;
    animation: wobble 250ms  infinite;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
