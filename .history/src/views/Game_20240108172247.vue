<template>
    <div class="main">
        <div class="game">
            <img :src="head" class="header">
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
                  <span class="info-name"></span>
                  <span></span>
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
                    <el-button type="primary" style="margin-right: 10px;" @click="collectGame(gameid)">{{collect}}</el-button>
                    <el-button type="warning" @click="scoreGame(gameid)">提交评分</el-button>
                </div>

            </div>
              <div class="tags"><p class="tagtittle">标签</p>
              <div class="taglist">
              <div class="tag" v-for="(item,index) in tagList" :key="index" @click="tagquery(item.tagId)">
          <h6 class="game-name">{{item.tagName}}</h6>
      </div></div></div>
              <div class="articles"><p class="articletittle">推荐文章</p>
                  <div class="articlelist">
                      
              <div class="article" v-for="(item,index) in articleList" :key="index" @click="articlequery(item.articleId)">
          <div>{{item.title}}</div>
          <div style="margin-left: 170px;"><i class="el-icon-time">{{item.releaseTime.slice(0, 10)}}</i></div>
      </div></div></div>
  </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            gameList:[],
            tagList:[],
            articleList:[],
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            name:"",
            collect:"加入收藏",
            state:false,
            value:0,
            cover:"",
            head:"",
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
        path:"/content",
        query:{articleId:id}
    })
        },
        collectGame(gameid){
        const token =  localStorage.getItem("token");
        const userId =  localStorage.getItem("userId");
        if(this.state == false){
        this.$axios({
            url:"/user/addcollect",
            method:'post',
            headers:{
            'accept': "application/json",
            token:token
        },
        data:{
            userId:userId,
            gameId:gameid,
        }})
        .then(res=>{
            if(res.data.data.retCode === "0000") 
        {
            this.$notify({
          title: '成功',
          message: '收藏成功',
          type: 'success'
        });
        this.collect = "已收藏"
        this.state = true
    }
    else{
        this.$message.error('收藏失败');
    }
        })}
    else{
        this.$axios({
            url:"/user/deletecollect",
            method:'post',
            headers:{
            'accept': "application/json",
            token:token
        },
        data:{
            userId:userId,
            gameId:gameid,
        }})
        .then(res=>{
            if(res.data.data.retCode === "0000") 
        {
            this.$notify({
          title: '成功',
          message: '取消收藏成功',
          type: 'success'
        });
        this.collect = "加入收藏"
        this.state = false
    }
    else{
        this.$message.error('取消收藏失败');
    }
        })
    }    
        },
        scoreGame(gameid){
        console.log(this.value)
        const token =  localStorage.getItem("token");
        const userId =  localStorage.getItem("userId");
        this.$axios({
            url:"/user/rategame",
            method:'post',
            headers:{
            'accept': "application/json",
            token:token
        },
        data:{
            userId:userId,
            gameId:gameid,
            score:this.value
        }})
        .then(res=>{
            if(res.data.data.retCode === "0000") 
        {
            this.$notify({
          title: '成功',
          message: '评分成功',
          type: 'success'
        });
    }
    else{
        this.$message.error('评分失败');
    }
    }
        );
        },
        getInf(id){
        const token =  localStorage.getItem("token");
        const userId =  localStorage.getItem("userId");
    this.$axios({
            url:"/user/addcollect",
            method:'post',
            headers:{
            'accept': "application/json",
            token:token
        },
        data:{
            userId:userId,
            gameId:id,
        }})
        .then(res=>{
            this.value = res.data.data.score
            if(res.data.data.score == 0){
                this.state = false
                this.collect
            } 
    }
        );
        }
    },
    beforeRouteLeave(to,form,next){
    to.meta.keepAlive = true;
    next(0)
  },
    beforeMount(){
        let id = this.$route.query.id
        const token =  localStorage.getItem("token");
        this.$axios({
        url:"/games/viewgame",
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
            this.head = this.gameList[0].head;
            this.publisher = this.gameList[0].publisher;
            this.description = this.gameList[0].desc;
            this.releaseTime = this.gameList[0].release_time;
            this.score = this.gameList[0].score;
          console.log(this.gameList[0].desc)
        })
      this.$axios({
        url:"/information/queryarticles",
        method:'post',
        headers:{
        'accept': "application/json",
    },
        data:{
        classification:0,
        gameId:id,
        }})
        .then(res=>{
            this.articleList = res.data.data.articleEntityList;
        })
        this.getInf(id)
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
    background: white;
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.4);
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
    background: white;
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.4);
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
    background: white;
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.4);
}
.header{
    width: 100%;
    height: 500px;
    object-fit: cover;
}
.name{
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
    background:white;
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.4);
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
    color:coral;
    font-size: 20px;
    font-family: 华文琥珀;
}
.tag{
    margin-left: 15px;
    padding-left:5px;
    padding-right:5px;
    padding-top:6px;
    border:solid 1px;
    border-radius: 15px 15px 15px 15px;
    cursor:pointer;
}
.article{
    margin:2px auto;
    padding: 8px 24px 4px 14px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor:pointer;
}
.articletittle{
    margin-top:10px;
    margin-left:10px;
    color: burlywood;
}
.info{
    color: black;
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