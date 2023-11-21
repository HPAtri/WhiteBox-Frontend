<template>
  <div class="main">
      <h3 class="count">共找到{{gameList.length}}个结果：</h3>
    <div class="gameList">
      <div class="game" v-for="(item,index1) in gameList" :key="index1">
        <img :src="item.cover" class="game-img" @click="toGame(item.id)">
        <div class="information">
          <h3 class="game-name">{{item.name}}</h3>
          <div class="taglist">
            <h5 class="taginfo">游戏类型:</h5>
            <div class="tag" v-for="(item,index2) in tagList[index1]" :key="index2" @click="tagquery(item.tagId)">
        <h5 class="tag-name">{{item.tagName}}</h5>
          </div>
      </div>
          <h5 class="desc">游戏简介:&nbsp;&nbsp;&nbsp;{{item.desc}}</h5>
        </div>

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
        }
    },
    watch: {
			$route(){
				this.initsearch();
			}
		},
    created(){
      this.initsearch()
    },
    methods:{
      initsearch(){
        let key = this.$route.query.key
        if(!key){
          key = ""
        }
        let tagId = this.$route.query.tagId
        if(tagId){
          tagId = Number(this.$route.query.tagId)
        }
        else{
          tagId = 0
        }
        axios({
        url:"http://192.168.137.230:10086/games/querygames",
        method:'post',
        headers:{
        'accept': "application/json",
      },
      data:{
          name: key,
          limit:"4",
          page:"1",
          tagId:tagId,
          needTag:true,
          releaseTime:"2020-01-01 00:00:00"
        }})
        .then(res=>{
            this.gameList = res.data.data.GameList;
            this.tagList = res.data.data.tagList;
        })
      },
       toGame(gameId){
        let id = gameId
        this.$router.push({
          path:"/game",
          query:{id:id}
        })
      },
      tagquery(tagId){
        let id = tagId
        this.$router.push({
          path:"/search",
          query:{tagId:id}
    })
        },
    },
    
    // beforeMount(){
    //     let key = this.$route.query.key
    //     const query = new this.$av.Query("game")
    //     query.contains("name",key)
    //     query.find().then(res=>{
    //         this.gameList = res
    //         console.log(res)
    //     })
    // }
}
</script>

<style scoped>

.main{
    margin-top:75px;
    padding: 40px;
}
.count{
    color: #fff;
    margin-bottom: 15px;
}
.taginfo{
  margin-top: 25px;
  margin-left: 20px;
}
.tag-name{
  margin-top: 25px;
  margin-left: 5px;
}
.tag{
    color:   #fff;
    margin-left: 15px;
    cursor:pointer;
}
.desc{
  margin-top: 20px;
  margin-left: 20px;
}
.gameList{
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}
.game{
  margin:auto;
  margin-bottom: 10px;
  width: 1300px;
  height: 333px;
  display:flex;
  justify-content:flex-start;
  flex-direction:row;
  color: #fff;
  background: rgb(34, 34, 34);
}
.information{
  margin-left:15px
}
.taglist{
  display: flex;
}
.game-img{
  width: 252px;
  height: 333px;
  cursor:pointer;
}
.game-name{
  text-align:left;
  margin: 15px 5px 5px 5px;
}

/* .info{
  width: 730px;
  background: rgb(34, 34, 34);
  margin-bottom:20px;
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
  cursor:pointer;
} */

</style>