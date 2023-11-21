<template>
  <div class="body">
    <div class="block"></div>
      <div class="header">
      <div class="classify">
          <div class="tagtitle"><h6>标签:</h6></div>
          <div class="tags">
          <h6 :class="flag=='all'?'active':''" @click="orderBy('all')" class="c-item">全部</h6>
          <!-- <div class="tag" v-for="(item,index) in classList" :key="index" @click="changeTag(item,index)"></div> -->
          <h6 v-for="(item,index) in classList" :key="index" 
          @click="changeTag(item,index)" :class="flag==index?'active':''"
          class="c-item">{{item}}</h6>
          </div>
      </div>
      </div>

    <div class="main">
       <div class="game" v-for="(item,index) in gameList" :key="index" @click="toGame(item.id)">
        <img :src="item.attributes.img.attributes.url" class="game-img">
        <h6 class="game-name">{{item.attributes.name}}</h6>
        <span class="tags" v-for="(item2,index2) in item.attributes.classify" :key="index2">{{item2}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
      return{
          flag:"all",
          classList:["第一人称射击","开放世界","模拟","动作","解密","角色扮演"],
          gameList:[],
          gameAll:[],
          tagList:[],
      }
  },
  mounted(){
    this.gettags()
  },
  methods:{
    gettags(){
      axios({
        url:"http://192.168.137.230:10086/games/gettags",
        method:'post',
        headers:{
        'accept': "application/json",
      },
        data:{}})
        .then(res=>{
          this.tagList = res.data.data;
          this.console.log(this.tagList)
        })
    },
    getclass(){
      for(i==0;i<this.tagList.length;i++){
        classList.push()
    },
    getAll(){
      this.gameList = this.gameAll
    },
    orderBy(str){
      console.log(str)
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
      console.log(str)
      this.flag = index
      console.log(this.flag)
      const query = new this.$av.Query('game');
      query.contains("classify",str)
      query.find().then(res=>{
        this.gameList = res
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
  created(){
      const query = new this.$av.Query('game');
      query.find().then(res => {
      console.log("看看",res)
      this.gameList = res
      this.gameAll = res
      });
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
  border: 1px 1px 1px 1px rgba(0,0,0,0.6);
  padding-top:10px;
  width: 90%;
  margin: 0 auto;
  background:#ebe7e7;

}
.main{
    display: flex;
    align-items: center;
    width: 1525px;
    margin: 0 auto;
    flex-wrap: wrap;
    padding-bottom: 100px;
}
.main:after{
    content: "";display: block; height:0; width:280px;
      /*只需要添加父元素的after伪元素中 高度0 ，宽度与item的宽一样*/
}
.classify{
    display: flex;
    width: 90%;
    margin-top:20px;
    align-items:flex-start
}
.tagtitle{
  flex: 1;
}

.tags{
  width: auto;
  display: flex;
  flex: 30;
}
.c-item{
  margin-left: 15px;
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
  width: 280px;
  height: 425px;
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
  height: 370px;
  object-fit: cover;
}
.game-name{
  text-align: left;
  margin: 5px 0 0 0;
}
.tags{
  width: 60px;
  height: 20px;
  margin-right: 5px;
  font-size:12px;
  padding: 2px 4px;
}
.active{
    color: burlywood;
}
</style>