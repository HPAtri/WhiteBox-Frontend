<template>
  <div class="body">
    <div class="block"></div>
      <div class="header">
      <div class="classify">
          <div class="tagtitle"><h6>标签:</h6></div>
          <div class="tags">
          <div class="chooseTag">
            <h6 :class="flag=='all'?'active':''" @click="orderBy('all')" class="c-item">全部</h6>
          </div>
          <div class="chooseTag"  v-for="(item,index) in tagList" :key="index" 
          @click="changeTag(item,index)" :class="flag==index?'active':''"
          >
          <h6 class="c-item">{{item.tagName}}</h6>
        </div>
          </div>
      </div>
      </div>

    <div class="main">
       <div class="game" v-for="(item,index) in gameList" :key="index" @click="toGame(item.id)">
        <img :src="item.cover" class="game-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          flag:"all",
          gameList:[],
          gameAll:[],
          tagList:[
					"tagId": 3,
					"tagName": "第一人称射击游戏",
					"nu
					"desc": "FPS"
				},{
					"tagName": "第一人称射击游戏",
					"num": 1,
					"desc": "FPS"
				},],
      }
  },
  created(){
    // this.gettags()
    this.getAll()
  },
  methods:{
    gettags(){
      this.$axios({
        url:"/games/gettags",
        method:'get',
        headers:{
        'accept': "application/json",
      }})
        .then(res=>{
          this.tagList = res.data.data.TagList;
        });

  },
    getAll(){
      this.$axios({
        url:"/games/querygames",
        method:'post',
        headers:{
        'accept': "application/json",
      },
        data:{
          name:"",
          limit:"0",
          page:"1",
          tagId:0,
          needTag:false,
          releaseTime:"2000-01-01 00:00:00"
        }})
        .then(res=>{
          this.gameAll = res.data.data.GameList;
          this.gameList = res.data.data.GameList;
        })
    },
    orderBy(str){
      switch(str){
        case "all":
          this.flag = "all"
          this.gameList = this.gameAll
          break;
        case "hot":
          this.flag = "hot"
          this.getHot()
          break;
        case "new":
          this.flag = "new"
          this.getNew()
          break;
      }
    },
      getNew(){
      const query = new this.$av.Query('game');
      query.descending('createdAt');
      query.find().then(res => {
      console.log("看看",res)
      this.gameList = res
      });
    },
    toGame(gameId){
      let id = gameId
      this.$router.push({
        path:"/game",
        query:{id:id}
      })
    },
    changeTag(str,index){
      this.flag = index
      let tagId = str.tagId
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
          tagId:tagId,
          needTag:true,
          releaseTime:"2000-01-01 00:00:00"
        }})
        .then(res=>{
          this.gameList = res.data.data.GameList;
        })
    },
    getHot(){
      const query = new this.$av.Query('game');
      query.equalTo('hot',true);
      query.find().then(res => {
      console.log("看看",res)
      this.gameList = res
      });
    },
  },
}
</script>

<style scoped>
.body{
  background:#fff;
}
.block{
  background:#fff;
  height: 120px;
}
.header{
  display: flex;
  border: 1px rgba(0,0,0,0.6);
  padding-top:10px;
  width: 90%;
  margin: 0 auto;
  background:#ebe7e7;
}
.main{
    display: flex;
    align-items: center;
    width: 1385px;
    margin: auto;
    flex-wrap: wrap;
    padding-bottom: 100px;
}
.main:after{
    content: "";display: block; height:0; width:280px;
      /*只需要添加父元素的after伪元素中 高度0 ，宽度与item的宽一样*/
}
.classify{
    display: flex;
    width: 100%;
    margin-top:20px;
    margin-bottom:5px;
    align-items:flex-start;
    min-height: 20px;
}
.tagtitle{
  flex: 1;
  margin-left: 10px;
  height: 28px;
}

.tags{
  width: auto;
  flex: 30;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.c-item{
  margin-left: 15px;
  height: 30px;
  width: auto;
  cursor:pointer;
}
.c-item:hover{
  color: burlywood;
  margin-left: 15px;
  width: auto;
  cursor:pointer;
}
.game{
  margin-top: 20px;
  width: 252px;
  height: 370px;
  color: #fff;
  background: rgb(34, 34, 34);
  margin-right: 25px;
  
}
.game:hover{
  box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.6);
  cursor:pointer;/*鼠标指针变为一个手*/ 
}
.game-img{
  width: 100%;
  height: 333px;
  object-fit: cover;
}
.game-name{
  text-align: left;
  margin: 5px 0 0 0;
}
.tags{
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 60px;
  margin-right: 5px;
  font-size:12px;
  padding: 2px 4px;
}
.active{
    color: burlywood;
}
.chooseTag{
  height: auto;
}
</style>