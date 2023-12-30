<template>
    <div class="main">
        <div class="game">
            <img :src="cover" class="header">
            <h3 class="name">游戏名：{{name}}</h3>
            <div class="info">
                <div class="info-detail">
                  <span class="info-name">厂商：</span>
                  <span>{{publisher}}</span>
                </div>
                <div class="info-detail">
                  <span class="info-name">发行日期：</span>
                  <span>{{releaseTime}}</span>
                </div>
               <div class="info-detail">
                  <span class="info-name">平台：</span>
                  <span>{{platform}}</span>
                </div>
            </div>
            <div class="info-detail detail">
                <span class="info-name"> 简介：</span>
                <span>{{description}}</span>
              </div>
        </div>
        <div class="extra">
          <div class="extrabox">
            <div class="scorebox">
                <div class="score">
                    <div class="keybox">
                <span class="key">{{score}}</span>
            </div>
                <div><span class="str">网友评分</span><el-rate
                    v-model="score"
                    disabled
                    text-color="#ff9900">
                </el-rate></div></div>
                <div class="myscore">
                    <el-rate class="rate"
                        v-model="value"
                        :colors="colors">
                    </el-rate>
                </div>
                <div class="buttonbox">
                    <el-button type="primary" style="margin-right: 10px;" @click="collect(gameid)">{{collect}}</el-button>
                    <el-button type="warning" @click="score(gameid)">提交评分</el-button>
                </div>

            </div>
              <div class="tags"><p class="tagtittle">标签</p>
              <div class="taglist">
              <div class="tag" v-for="(item,index) in tagList" :key="index" @click="tagquery(item.tagId)">
          <h6 class="game-name">{{item.tagName}}</h6>
      </div></div></div>
              <div class="articles"><p class="articletittle">推荐文章</p>
                  <div class="articlelist">
                      
              <div class="article" v-for="(item,index) in tagList" :key="index" @click="articlequery(item.tagId)">
          <h6 class="game-name">{{item.tagName}}</h6>
      </div></div></div>
  </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            gameList:[],
            tagList:[],
            articleList:[],
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            name:"",
            collect:"加入收藏",
            value:0,
            cover:"",
            publisher:"",
            releaseTime:"",
            platform:"",
            tags:"",
            score:0,
            detail:"",
            description:"",
            img:"",
        }
    },
    methods:{
        tagquery(tagId){
        let id = tagId
        this.$router.push({
        path:"/search",
        query:{tagId:id}
    })
        },
        articlequery(articleId){
        let id = articleId
        this.$router.push({
        path:"/home"+id,
        //   query:{id:id}
    })
        },
        collect(gameid){
        let id = gameid
        
        
        // },
        // score(gameid){
        // let id = gameid

        // }
    },
    beforeRouteLeave(to,form,next){
    to.meta.keepAlive = true;
    next(0)
  },
    beforeMount(){
        let id = this.$route.query.id
        const token =  localStorage.getItem("token");
        axios({
        url:"http://192.168.137.44:10086/games/viewgame",
        method:'post',
        headers:{
        'accept': "application/json",
        token:token,
    },
        data:{
        id:id
        }})
        .then(res=>{
            this.gameList = res.data.data.Game;
            this.tagList = res.data.data.Tags;
            this.gameid = this.gameList[0].id;
            this.name = this.gameList[0].name;
            this.cover = this.gameList[0].cover;
            this.publisher = this.gameList[0].publisher;
            this.description = this.gameList[0].desc;
            this.releaseTime = this.gameList[0].release_time;
            this.score = this.gameList[0].score;
        })
    },

}
</script>

<style scoped>
.main{
    width: 95%;
    margin-left:20px;
    display:flex;
    margin-top:100px;
    justify-content: center;
    align-items: flex-start;
    flex-direction:row
}
.game{
    width: 70%;
    background: rgb(34,34,34);
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
}
.extra{
    display: table-cell;
    width: 20%;
    margin-left:20px;
    align-items:flex-start
}
.extrabox{
    width:100%;
    height: 200px;
    display: flex;
    flex-direction:column;
    align-items:flex-start
}
.tags{
    width: 100%;
    background: rgb(34,34,34);
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
}
.taglist{
    display: flex;
    padding-bottom: 20px;
}
.articlelist{
    display: flex;
    flex-direction:column;
    padding-bottom: 20px;
}
.articles{
    width: 100%;
    margin-top:20px;
    background: rgb(34,34,34);
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,2);
}
.header{
    width: 100%;
    height: 500px;
    object-fit: cover;
}
.name{
    color: #fff;
    text-align: center;
    padding-top: 20px;
}
.tagtittle{
    margin-top:10px;
    margin-left:10px;
    color: burlywood;
}
.scorebox{
    width: 100%;
    margin-bottom:20px;
    background: rgb(34,34,34);
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
}
.keybox{
    margin-right: 16px;
}
.score{
    display: flex;
    margin:18px 20px; 
}
.key{
    color: coral;
    font-size: 40px;
    line-height:1.5;
    font-family: 华文新魏;
}
.str{
    color:white;
    font-size: 20px;
    font-family: 华文琥珀;
}
.tag{
    color:   #fff;
    margin-left: 15px;
    padding-left:5px;
    padding-right:5px;
    padding-top:6px;
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
    border-radius: 15px 15px 15px 15px;
    cursor:pointer;
}
.article{
    color:   #fff;
    margin:15px;
    padding-left:5px;
    padding-right:5px;
    padding-top:6px;
    cursor:pointer;
}
.articletittle{
    margin-top:10px;
    margin-left:10px;
    color: burlywood;
}
.info{
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
}
.info-detail{
    display: flex;
    flex-direction: column;
}
.info-name{
    color: burlywood;
}
.detail{
    padding: 0 40px 40px 40px; 
    font-size: 20px;
    color: #fff;
}
.el-rate  /deep/ .el-rate__icon{
  font-size: 25px;
}
.rate  /deep/ .el-rate__icon{
  font-size: 40px;
}
.myscore{
    margin-top:20px;
    margin-left:38px;

    }
.buttonbox{
    margin:40px 36px 20px;
}
</style>