<template>
  
  <div class="home">
    <el-dialog :title="recommendTitle" :visible.sync="recommendVisible" width="70%"  @close="closeForm()">
        <el-form :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
          <div class="game" v-for="(item,index) in recommendList" :key="index" @click="addChoose(item.id)">
        <img :src="item.cover" class="game-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
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
        gameList:[],
        recentList:[],
        loveList:[],
        recommendList:[], //用于接受一页8个待选推荐
        chooseList:[],  //用于存储所有选择游戏
        recommendVisible:true,
      }
    },
    components: {
        Carousel
    },
    mounted(){
      // this.recommended()
      this.getNew()
      this.getloverecommend()
      this.getrecentrecommend()
    },
    methods:{
      recommended(){
        const recommended =  localStorage.getItem("recommended");
        if(recommended == 0){
          this.recommendVisible == true
        }
        else
        {
          this.recommendVisible == false
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
          limit:"8",
          page:"1",
          tagId:0,
          needTag:false,
          releaseTime:"2020-01-01 00:00:00",
          needHotGame:true
        }})
        .then(res=>{
          this.recommendList = res.data.data.GameList;
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
          releaseTime:"2020-01-01 00:00:00",
          needHotGame:true
        }})
        .then(res=>{
          this.gameList = res.data.data.GameList;
        })
    },

      getloverecommend(){
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
          releaseTime:"2020-01-01 00:00:00"
        }})
        .then(res=>{
          this.loveList = res.data.data.GameList;
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
          releaseTime:"2020-01-01 00:00:00"
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
      closeForm(){
      this.recommendVisible=false
    },
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
  margin-top: 40px;
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
</style>