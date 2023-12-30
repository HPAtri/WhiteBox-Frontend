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
            <div class="tags">
                <el-rate
                    v-model="score"
                    disabled
                    show-score
                    text-color="#ff9900>
                </el-rate>{{score}}   

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
            name:"",
            cover:"",
            publisher:"",
            releaseTime:"",
            platform:"",
            tags:"",
            score:2.5,
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
        }
    },
    beforeRouteLeave(to,form,next){
    to.meta.keepAlive = true;
    next(0)
  },
    beforeMount(){
        let id = this.$route.query.id
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
            this.gameList = res.data.data.Game;
            this.tagList = res.data.data.Tags;
            this.name = this.gameList[0].name;
            this.cover = this.gameList[0].cover;
            this.publisher = this.gameList[0].publisher;
            this.description = this.gameList[0].desc;
            this.releaseTime = this.gameList[0].release_time;
            this.score = this.gameList[0].score;
        })
    },
    // beforeMount(){
    //     if(this.$route.query.id){
    //     let id = this.$route.query.id
    //     console.log("看看1",id)
    //     let query = new this.$av.Query("game")
    //     query.get(id).then(res=>{
    //         console.log("查询结果",res)
    //         this.company = res.attributes.company
    //         this.date = res.attributes.date
    //         this.platform = new String(...[res.attributes.platform])
    //         this.tags = new String(...[res.attributes.classify])
    //         this.detail = res.attributes.detail
    //         this.img = res.attributes.img.attributes.url
    //     })}
    //     if(this.$route.query.game){
    //          let game = this.$route.query.game
    //          console.log("看看2",game)
    //          let query2 = new this.$av.Query("game")
    //          query2.equalTo("name",game)
    //          query2.find().then(fuck=>{
    //         console.log("看看Fuck",fuck)
    //         let res = fuck[0]
    //         this.company = res.attributes.company
    //         this.date = res.attributes.date
    //         this.platform = new String(...[res.attributes.platform])
    //         this.tags = new String(...[res.attributes.classify])
    //         this.detail = res.attributes.detail
    //         this.img = res.attributes.img.attributes.url
    //          })
    //     }
    // },

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
</style>