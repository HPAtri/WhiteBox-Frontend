<template>
  
  <div class="home">
    <el-dialog :title="recommendTitle" :visible.sync="recommendVisible" width="65%"  @close="closeForm()">
        <el-form :inline=true style="margin-left:20px;margin-right:20px;" label-width="110px" label-position="right" size="mini">
          <div style="font-size: 26px; text-align: center;"><span>请选择感兴趣的游戏{{this.chooseList.length}}/8</span></div>
          <div class="recommend">
          <div class="game-recommend" v-for="(item,index) in recommendList" :key="index" @click="addChoose(item.id,index)">
        <img :src="item.cover" class="game-recommend-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div></div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="changeForm()">换一批</el-button>
            <el-button type="info" size="mini" @click="closeForm()">不感兴趣</el-button>
        </span>
      </el-dialog>
    <Carousel msg="轮播图" class="lunbo" />
    <div class="games">
       <div class="hot">
<!--         <i class="el-icon-odometer"></i>-->
         <h2 class="h2">热门游戏</h2>
         <el-button class="more-btn" type="primary" round @click="getNew()">换一批</el-button>
<!--         <div class="more-btn" @click="getNew()">换一批</div>-->
       </div>
      <div class="game" v-for="(item,index) in gameList" :key="index" @click="toGame(item.id)">
        <img :src="item.cover" class="game-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div>
    </div>
     <div class="games">
       <div class="hot">
         <h2 class="h2">根据您的喜好</h2>
         <el-button class="more-btn" type="primary" round @click="getloverecommend()">换一批</el-button>
<!--         <div class="more-btn" @click="getloverecommend()">换一批</div>-->
       </div>
      <div class="game" v-for="(item,index) in loveList" :key="index" @click="toGame(item.id)">
        <img :src="item.cover" class="game-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div>
    </div>

    <div class="games">
       <div class="hot">
         <h2 class="h2">根据您的浏览</h2>
         <el-button class="more-btn" type="primary" round @click="getrecentrecommend()">换一批</el-button>
<!--         <div class="more-btn" @click="getrecentrecommend()">换一批</div>-->
       </div>
      <div class="game" v-for="(item,index) in recentList" :key="index" @click="toGame(item.id)">
        <img :src="item.cover" class="game-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div>
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
import Carousel from '@/components/Carousel.vue'
export default {
    name: 'Home',
    data(){
      return{
        i:0,
        batch:0,
        gameList:[],
        recentList:[],
        loveList:[],
        allRecommendList:[],
        recommendList:[], //用于接受一页8个待选推荐
        chooseList:[],  //用于存储所有选择游戏
        recommendVisible:false,
      }
    },
    components: {
        Carousel
    },
    mounted(){
      this.recommended()
      this.getNew()
      this.getloverecommend()
      this.getrecentrecommend()
    },
    methods:{
      recommended(){
        const recommended =  localStorage.getItem("recommended");
        if(recommended == 0){
          //mounted无法直接改变data()值
          this.getRecommend()
          this.$data.recommendVisible = true;
        }
        else
        {
          this.$data.recommendVisible = false;
          }
      },
      getRecommend(){
        this.$axios({
        url:"/games/querygames",
        method:'post',
        headers:{
        'accept': "application/json",
      },
        data:{
          name:"",
          limit:0,
          page:"1",
          tagId:0,
          needTag:false,
          releaseTime:"2000-01-01 00:00:00",
          needRand:true
        }})
        .then(res=>{
          this.allRecommendList = res.data.data.GameList;
          console.log(this.allRecommendList)
          this.recommendList = this.allRecommendList.slice(this.batch * 8,(this.batch + 1) * 8)
          let i = Math.floor(this.allRecommendList.length / 8) - 1
        })
      },

      getNew(){
        this.$axios({
        url:"/games/querygames",
        method:'post',
        headers:{
        'accept': "application/json",
      },
        data:{
          name:"",
          limit:"4",
          page:"1",
          tagId:0,
          needTag:false,
          releaseTime:"2000-01-01 00:00:00",
          needHotGame:true
        }})
        .then(res=>{
          this.gameList = res.data.data.GameList;
        })
    },

      getloverecommend(){
        this.$axios({
        url:"/games/recommendgames",
        method:'post',
        headers:{
        'accept': "application/json",
      },
        data:{
          id:localStorage.getItem("userId"),
        }})
        .then(res=>{
          this.loveList = res.data.data.recommendedGames;
        })
      },

      getrecentrecommend(){
        this.$axios({
        url:"/games/querygames",
        method:'post',
        headers:{
        'accept': "application/json",
      },
        data:{
          name:"",
          limit:"4",
          page:"1",
          tagId:0,
          needTag:false,
          releaseTime:"2000-01-01 00:00:00"
        }})
        .then(res=>{
          this.recentList = res.data.data.GameList;
        })
      },
      toCon(artId){
        let id = artId
         this.$router.push({ 
           path:'/about/content',
           query: {id:id}
           })
      },
       toGame(gameId){
        let id = gameId
        this.$router.push({
          path:"/game",
          query:{id:id}
        })
      },
      toAbout(){
        this.$router.push({
          path:"/about"
        })
      },
      addChoose(gameId, index){
        this.chooseList.push(gameId)
        console.log(this.allRecommendList)
        this.allRecommendList[this.batch * 8 + index] = this.allRecommendList[this.allRecommendList.length-1]
        this.allRecommendList.pop()
        console.log(this.allRecommendList)
        this.recommendList = this.allRecommendList.slice(this.batch * 8,(this.batch + 1) * 8)
        if(this.chooseList.length >= 8){
          this.recommendVisible = false
          localStorage.setItem("recommended", 1);

        }
      },
      changeForm(){
        let i = Math.floor(this.allRecommendList.length / 8) - 1
        this.batch = (this.batch + 1) % i
        this.recommendList = this.allRecommendList.slice(this.batch * 8,(this.batch + 1) * 8)
      },
      closeForm(){
      this.recommendVisible = false
      localStorage.setItem("recommended", 1);
      this.submitRecommendList()
    },
    //提交的接口
    submitRecommendList(){
        // for (var i=0;i<this.chooseList.length;i++) {
      //     this.$axios({
      //       url:"/user/addcollect",
      //       method:'post',
      //       headers:{
      //         'token':localStorage.getItem("token"),
      //         'accept': "application/json",
      //       },
      //       data:{
      //         userId:localStorage.getItem("userId"),
      //         gameId:this.chooseList[i]
      //       }
      //     })
      //   }
      // this.$message({
      //   message: '上传完毕',
      //   type: 'success'})
      this.$axios({
        url:"/user/choosegame",
        method:'post',
        headers:{
          'token':localStorage.getItem("token"),
        'accept': "application/json",
      },
        data:{
          userId:localStorage.getItem("userId"),
          chooseList:this.chooseList
        }
        })
        .then(
          this.$message({
          message: '上传完毕',
          type: 'success'})
      )
    }
    }
}
</script>

<style scoped>
.home{
  margin: 0 auto;
  margin-top:100px;
  width:1500px;
  padding-bottom: 100px;
}
.h2{
  color: #7a9bdd;
}
.el-icon-odometer{
  color: black;

}
.hot{
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more-btn{
  padding: 5px 10px;
  /*border: 1px solid #fff;*/
  cursor:pointer;
}
.lunbo{
  width:1500px;
  margin: 0 auto;
}
.games{
  width: 90%;
  margin: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap:wrap ;
}
.game{
  margin-top: 20px;
  width: 280px;
  height: 400px;
  color: #fff;
  background: rgb(34, 34, 34);
}
.game:hover{
  box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
  cursor:pointer;/*鼠标指针变为一个手*/ 
}
.game-img{
  width: 100%;
  height: 370px;
  object-fit: cover;
}
.game-name{
  text-align: left;
  margin: 5px 0 0 0;
}
.game-recommend{
  margin-top: 20px;
  width: 224px;
  height: 320px;
  color: #fff;
  background: rgb(34, 34, 34);
}
.game-recommend:hover{
  box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
  cursor:pointer;/*鼠标指针变为一个手*/ 
}
.game-recommend-img{
  width: 100%;
  height: 296px;
  object-fit: cover;
}
.classify{
  width: 60px;
  background: gray;
  height: 20px;
  margin-right: 5px;
  font-size:12px;
  padding: 2px 4px;
}
.information{
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
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
.recommend{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    flex-wrap: wrap;
}
</style>