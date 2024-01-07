<template>
  
  <div class="home">
    <el-dialog :title="recommendTitle" :visible.sync="recommendVisible" width="70%"  @close="closeForm()">
        <el-form :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
          <div class="recommend">
          <div class="game" v-for="(item,index) in recommendList" :key="index" @click="addChoose(item.id,index)">
        <img :src="item.cover" class="game-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div></div>
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
        recommendList:[{
				"id": 10,
				"name": "赛博朋克2077",
				"cover": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20201022/1603349350_903224.jpg",
				"desc": null,
				"createdAt": "2023-11-28T06:28:42.000+00:00",
				"updatedAt": "2023-11-28T06:28:57.000+00:00",
				"publisher": null,
				"score": 2.5,
				"releaseTime": "2023-11-28T06:28:15.000+00:00",
				"flag": 1
			},
			{
				"id": 9,
				"name": "看门狗2",
				"cover": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532400033_147508.jpg",
				"desc": null,
				"createdAt": "2023-11-28T06:28:39.000+00:00",
				"updatedAt": "2023-11-28T06:28:54.000+00:00",
				"publisher": null,
				"score": 3,
				"releaseTime": "2023-11-28T06:28:13.000+00:00",
				"flag": 1
			},
			{
				"id": 8,
				"name": "荒野大镖客2",
				"cover": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180709/1531115695_945701.jpg",
				"desc": null,
				"createdAt": "2023-11-28T06:28:36.000+00:00",
				"updatedAt": "2023-11-28T06:28:51.000+00:00",
				"publisher": null,
				"score": 4,
				"releaseTime": "2023-11-28T06:28:11.000+00:00",
				"flag": 1
			},
			{
				"id": 7,
				"name": "文明6",
				"cover": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532412242_238190.jpg",
				"desc": null,
				"createdAt": "2023-11-28T06:28:26.000+00:00",
				"updatedAt": "2023-11-28T06:28:49.000+00:00",
				"publisher": null,
				"score": 5,
				"releaseTime": "2023-11-28T06:28:08.000+00:00",
				"flag": 1
			},
			{
				"id": 6,
				"name": "尼尔：机械纪元",
				"cover": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180723/1532327846_923833.jpg",
				"desc": null,
				"createdAt": "2023-11-28T06:28:23.000+00:00",
				"updatedAt": "2023-11-28T06:28:47.000+00:00",
				"publisher": null,
				"score": 0,
				"releaseTime": "2023-11-28T06:28:04.000+00:00",
				"flag": 1
			},
			{
				"id": 5,
				"name": "极品飞车18：宿敌",
				"cover": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180522/1526960029_838372.jpg",
				"desc": null,
				"createdAt": "2023-11-28T06:28:20.000+00:00",
				"updatedAt": "2023-11-28T06:28:44.000+00:00",
				"publisher": null,
				"score": 0,
				"releaseTime": "2023-11-28T06:28:00.000+00:00",
				"flag": 1
			},
			{
				"id": 4,
				"name": "《反恐精英：全球攻势》 ",
				"cover": "https://lain.bgm.tv/pic/cover/l/29/2c/52356_9P9Vm.jpg",
				"desc": null,
				"createdAt": "2023-10-18T06:55:29.000+00:00",
				"updatedAt": "2023-10-18T06:55:30.000+00:00",
				"publisher": null,
				"score": 0,
				"releaseTime": "2023-10-18T06:55:29.000+00:00",
				"flag": 1
			},
			{
				"id": 3,
				"name": "Counter-Strike 2  ",
				"cover": "https://lain.bgm.tv/pic/cover/l/41/5f/425633_Qi0gw.jpg",
				"desc": null,
				"createdAt": "2023-10-18T06:54:32.000+00:00",
				"updatedAt": "2023-10-18T06:54:32.000+00:00",
				"publisher": null,
				"score": 0,
				"releaseTime": "2023-10-18T06:54:31.000+00:00",
				"flag": 1
			}], //用于接受一页8个待选推荐
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
          //mounted无法直接改变data()值
          this.$data.recommendVisible = true;
          this.getRecommend()
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
      addChoose(gameId){
        this.chooseList.push(gameId)
        if(this.chooseList.length >= 5){
          this.recommendVisible = false
          localStorage.setItem("recommended", 1);
        }
      },
      closeForm(){
      this.recommendVisible = false
      localStorage.setItem("recommended", 1);
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
.recommend{
    display: flex;
    align-items: center;
    margin: auto;
    flex-wrap: wrap;
}
</style>