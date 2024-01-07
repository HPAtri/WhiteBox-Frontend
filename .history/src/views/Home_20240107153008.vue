<template>
  
  <div class="home">
    <el-dialog :title="dialogTitle" :visible.sync="updateVisible" width="50%"  @close="closeForm()">
        <el-form :model="updateform" :rules="rules" ref="updateform" :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
            <el-form-item label="手机号" prop="phone_number">
                <el-input v-model="updateform.phone_number" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker
                  v-model="updateform.birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="updateform.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="profile">
                <el-input v-model="updateform.profile" suffix-icon="el-icon-edit" style="width: 620px;"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="icon">
              <el-upload
                action="#"
                list-type="picture-card"
                :limit=1
                :on-change="handlePhoto"
                accept=".jpg,.jpeg,.JPG,.JPEG"
                :on-remove="handleRemove"
                :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" v-show="!isView" @click="submitForm()">确定</el-button>
            <el-button type="info" size="mini" @click="closeForm()">取消</el-button>
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
      }
    },
    components: {
        Carousel
    },
    mounted(){
      this.getNew()
      this.getloverecommend()
      this.getrecentrecommend()
    },
    methods:{

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