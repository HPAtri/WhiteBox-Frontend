<template>
  <div class="home">
    <Carousel msg="轮播图" class="lunbo" />
    <div class="games">
       <div class="hot">
         <h2>热门游戏</h2>
         <div class="more-btn" @click="toIndex">查看全部</div>
       </div>
      <div>{{gameList[0].id}}</div>
      <div class="game" v-for="(item,index) in gameList" :key="index" @click="toGame(item.id)">
        <img :src="item.cover" class="game-img">
        <h6 class="game-name">{{item.name}}</h6>
        <!-- <span class="classify" v-for="(item,index2) in item.attributes.classify" :key="index2">{{item2}}</span> -->
      </div>
    </div>

     <div class="games">
       <div class="hot"><h2>根据您的喜好</h2><div class="more-btn" @click="toIndex">查看全部</div></div>
      <div class="game" v-for="(item,index) in lovelist" :key="index" @click="toGame(item.id)">
        <img :src="item.attributes.img.attributes.url" class="game-img">
        <h6 class="game-name">{{item.attributes.name}}</h6>
        <span class="classify" v-for="(item2,index2) in item.attributes.classify" :key="index2">{{item2}}</span>
      </div>
    </div>

    <div class="information">
       <div class="hot"><h2>根据您的浏览</h2><div class="more-btn" @click="toAbout">查看全部</div></div>
      <div class="info" v-for="(item,index) in recentList" :key="index" @click="toGame(item.id)">
        <img class="info-img" :src="item.attributes.img.attributes.url">
        <div class="info-text">{{item.attributes.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import axios from "axios";
export default {
    name: 'Home',
    data(){
      return{
        gameList:[],
        recentlist:[],
        lovelist:[],
      }
    },
    components: {
        Carousel
    },
    methods:{
      // getNew(){
      //   const query = new this.$av.Query('game');
      //   query.descending('createdAt');
      //   query.limit(5);
      //   query.find().then(res => {
      //   console.log("看看",res)
      //   this.gameList = res
      //   });  
      // },

      getNew(){
        axios({
        url:"http://127.0.0.1:10086/games/querygames",
        method:'post',
        headers:{
        'accept': "application/json",
      },
        data:{
          name:"",
          limit:"4",
          page:"1",
          releaseTime:"2020-01-01 00:00:00"
        }})
        .then(res=>{
          this.gameList = res.data.data.GameList
        })
    },
      getloverecommend(){
        const query = new this.$av.Query('game');
        query.equalTo('love',true);
        query.limit(5);
        query.find().then(res => {
        console.log("看看",res)
        this.lovelist = res
        });
      },
      getrecentrecommend(){
        const query = new this.$av.Query('information');
        query.descending('createdAt');
        query.limit(4);
        query.find().then(res => {
        console.log("看看",res)
        this.recentList = res
        });
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
      }
    },
    created(){
      this.getNew()
      this.getloverecommend()
      this.getrecentrecommend()
    }
}
</script>

<style scoped>
.home{
  margin: 0 auto;
  width:1500px;
  padding-bottom: 100px;
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
  border: 1px solid #fff;
  cursor:pointer;
}
.lunbo{
  width:1500px;
  margin: 0 auto;
}
.games{
  width: 100%;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap:wrap ;
}
.game{
  margin-top: 40px;
  width: 280px;
  height: 425px;
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