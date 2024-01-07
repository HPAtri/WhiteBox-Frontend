<template>
  
  <div class="home">
    <el-dialog :title="recommendTitle" :visible.sync="recommendVisible" width="65%"  @close="closeForm()">
        <el-form :inline=true style="margin-left:20px;margin-right:20px;" label-width="110px" label-position="right" size="mini">
          <div class="recommend">
          <div class="game-recommend" v-for="(item,index) in recommendList" :key="index" @click="addChoose(item.id,index)">
        <img :src="item.cover" class="game-recommend-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div></div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" @click="load()">加载</el-button>
          <el-button type="info" size="mini" @click="changeForm()">换一批</el-button>
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
        batch:0,
        gameList:[],
        recentList:[],
        loveList:[],
        allRecommendList:[],
        allRecommendList2:[
        {
				"id": 20,
				"name": "Grand Theft Auto V",
				"cover": "https://s2.loli.net/2024/01/07/KPGfCujJ7SqhVsa.jpg",
				"desc": "PC 版Grand Theft Auto V 能够以超越 4K 的最高分辨率和 60 帧每秒的帧率，为您呈现屡获殊荣、令人痴迷的游戏世界——洛桑托斯市和布雷恩郡。",
				"createdAt": "2024-01-07T08:33:50.000+00:00",
				"updatedAt": "2024-01-07T08:33:50.000+00:00",
				"publisher": "\r\nRockstar Games",
				"score": 5,
				"releaseTime": "2015-04-13T16:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 14,
				"name": "糖豆人",
				"cover": "https://s2.loli.net/2024/01/07/jpw8Ih4lRQga9kP.jpg",
				"desc": "《糖豆人》是一款免费跨平台大规模多人游玩的派对乱斗游戏。你要和其他竞争者一起，在愈加夸张混乱的障碍赛回合中一较高下，最后只会有一名幸运赢家！",
				"createdAt": "2024-01-07T08:25:54.000+00:00",
				"updatedAt": "2024-01-07T08:25:54.000+00:00",
				"publisher": "\r\nMediatonic",
				"score": 3.2,
				"releaseTime": "2020-08-03T16:00:00.000+00:00",
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
				"id": 17,
				"name": "Apex Legends™",
				"cover": "https://s2.loli.net/2024/01/07/MSi8qCxjro5dnEN.jpg",
				"desc": "由Respawn Entertainment开发制作，屡获殊荣的《Apex Legends》，是一款免费大逃杀英雄射击游戏。在这款革命性的新一代大逃杀英雄射击游戏中，掌控日益丰富且拥有强大技能的传奇角色，深度体验战术小队玩法及创新游戏元素。",
				"createdAt": "2024-01-07T08:30:15.000+00:00",
				"updatedAt": "2024-01-07T08:30:15.000+00:00",
				"publisher": "\r\nElectronic Arts",
				"score": 2.4,
				"releaseTime": "2020-11-04T16:00:00.000+00:00",
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
				"id": 13,
				"name": "逆向坍塌：面包房行动",
				"cover": "https://s2.loli.net/2024/01/07/Pi8Fo2ZBe9xbsXD.jpg",
				"desc": "由MICAteam云母组制作的一款策略角色扮演游戏（SRPG）。 在近未来，世界由于坍塌液污染带来的资源危机引发了新的战乱。新兴的“南极联邦”与老牌列强组成的“罗克萨特主义合众国联盟”，在经历短暂的蜜月期后再次产生军事冲突，并对能改变战争格局的“三女神计划”研究成果发起了争夺。",
				"createdAt": "2024-01-07T08:25:00.000+00:00",
				"updatedAt": "2024-01-07T08:25:00.000+00:00",
				"publisher": "\r\nShanghai Sunborn Network Technology Co., Ltd.",
				"score": 5,
				"releaseTime": "2035-01-07T08:24:49.000+00:00",
				"flag": 1
			},
			{
				"id": 2,
				"name": "《刺客信条4：黑旗》",
				"cover": "https://lain.bgm.tv/pic/cover/l/d9/32/208435_mraA4.jpg",
				"desc": null,
				"createdAt": "2023-10-18T06:54:10.000+00:00",
				"updatedAt": "2023-10-18T06:54:11.000+00:00",
				"publisher": null,
				"score": 0,
				"releaseTime": "2023-10-18T06:54:07.000+00:00",
				"flag": 1
			},
			{
				"id": 22,
				"name": "Stellaris",
				"cover": "https://s2.loli.net/2024/01/07/W3DvrsdbBCJRtkq.jpg",
				"desc": "在这款由Paradox Development Studio精心打造的科幻大型战略游戏中，探索充满奇迹的浩瀚银河。与千奇百怪的外星种族互动、发现奇异新世界并体验其中令人意想不到的事件，同时扩大您帝国的影响力。每一场新的冒险皆拥有几乎无穷无尽的可能性。",
				"createdAt": "2024-01-07T08:35:06.000+00:00",
				"updatedAt": "2024-01-07T08:35:06.000+00:00",
				"publisher": "Paradox Interactive",
				"score": 5,
				"releaseTime": "2016-05-08T19:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 12,
				"name": "极限竞速：地平线 5",
				"cover": "https://s2.loli.net/2024/01/07/k3T78MJuD1KBhPb.jpg",
				"desc": "您的“终极地平线冒险”即将开启！驾驶世界名车，探索墨西哥充满活力的户外景色，享受无拘无束又充满乐趣的驾驶体验。在终极地平线拉力赛中征服富有挑战的塞拉努埃瓦。需拥有《极限竞速：地平线 5》才能体验，扩充内容需另购。",
				"createdAt": "2024-01-07T08:23:38.000+00:00",
				"updatedAt": "2024-01-07T08:23:38.000+00:00",
				"publisher": "\r\nXbox Game Studios",
				"score": 4.8,
				"releaseTime": "2021-11-08T16:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 24,
				"name": "Summer Pockets",
				"cover": "https://s2.loli.net/2024/01/07/dY9KIHE1A28PMTS.jpg",
				"desc": "「唯有那片炫目，始终未曾忘却。」 由创作出「CLANNAD」等名作的游戏品牌Key带来的一款文字冒险游戏。 「暑假」「与伙伴的盛夏回忆」「乡愁」 在远离尘嚣的小岛上，与伙伴共度夏日的时光，谈场盛夏的恋爱。 这是夏日的故事。 无法忘怀，也不能忘怀的夏日回忆。",
				"createdAt": "2024-01-07T08:37:14.000+00:00",
				"updatedAt": "2024-01-07T08:37:14.000+00:00",
				"publisher": "\r\nVisualArts/Key",
				"score": 5,
				"releaseTime": "2018-06-28T16:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 18,
				"name": "ARK: Survival Evolved",
				"cover": "https://s2.loli.net/2024/01/07/aSnOeLQN12vkr3C.jpg",
				"desc": "由虚幻4引擎打造的一款多人在线生存竞技网游，在一个超高自由度的开放世界里，可以体验采集、制造、打猎、收获、建造、研究以及驯服恐龙等超多自由内容，感受酷热白昼、冰冷夜晚的动态天气系统以及饥饿口渴等现实中的生存挑战，还要面对其它生存者的威胁，合作生存还是竞技厮杀，由你决定！",
				"createdAt": "2024-01-07T08:31:12.000+00:00",
				"updatedAt": "2024-01-07T08:31:12.000+00:00",
				"publisher": "\r\nStudio Wildcard, Snail Games USA",
				"score": 5,
				"releaseTime": "2017-08-27T16:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 15,
				"name": "战地风云™ 2042",
				"cover": "https://s2.loli.net/2024/01/07/MtsN4GycP3CHBiQ.jpg",
				"desc": "在第 6 赛季：黑暗创造物中掌控未知。《战地风云™ 2042》是一款第一人称射击游戏，本作将带领玩家重返该系列标志性的全面战争。",
				"createdAt": "2024-01-07T08:26:50.000+00:00",
				"updatedAt": "2024-01-07T08:26:50.000+00:00",
				"publisher": "\r\nElectronic Arts",
				"score": 0.5,
				"releaseTime": "2021-11-18T16:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 16,
				"name": "《战地风云 5》",
				"cover": "https://s2.loli.net/2024/01/07/qIKgTN3ypckZJiO.jpg",
				"desc": "这就是终极《战地风云 5》体验。用完整的武器、载具和配备武器库以及第 1 年和第 2 年最棒的自定义内容体验人类历史上规模最大的冲突。",
				"createdAt": "2024-01-07T08:28:24.000+00:00",
				"updatedAt": "2024-01-07T08:28:24.000+00:00",
				"publisher": "\r\nElectronic Arts",
				"score": 4.5,
				"releaseTime": "2018-11-08T16:00:00.000+00:00",
				"flag": 1
			},
			{
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
				"id": 25,
				"name": "VA-11 Hall-A: Cyberpunk Bartender Action",
				"cover": "https://s2.loli.net/2024/01/07/NKoByCPcbF6wlWV.jpg",
				"desc": "VA-11 HALL-A:Cyberpunk Bartender Action是一款关于waifu，科技及后-反乌托邦生活，以灌醉顾客为宗旨的调酒师模拟游戏。",
				"createdAt": "2024-01-07T08:37:59.000+00:00",
				"updatedAt": "2024-01-07T08:37:59.000+00:00",
				"publisher": "\r\nYsbryd Games, PLAYISM",
				"score": 5,
				"releaseTime": "2016-06-20T16:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 11,
				"name": "饥荒联机版",
				"cover": "https://s2.loli.net/2024/01/07/WvhQKMHlNVYZzgd.jpg",
				"desc": "在绝不妥协的荒野生存游戏《饥荒》的多人联机版中一起战斗、耕种、建设和探索吧。",
				"createdAt": "2024-01-07T08:20:32.000+00:00",
				"updatedAt": "2024-01-07T08:20:32.000+00:00",
				"publisher": "\r\nKlei Entertainment",
				"score": 5,
				"releaseTime": "2016-04-21T16:00:00.000+00:00",
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
				"id": 19,
				"name": "FINAL FANTASY XV",
				"cover": "https://s2.loli.net/2024/01/07/It3qOizXybBpnUA.jpg",
				"desc": "展开一场超凡绝伦的高质量旅程吧！本游戏提供各种丰富额外内容，而且支持超高分辨率的图形选项和 HDR 10，立即来畅玩这款画面精美且精心制作的《FINAL FANTASY XV》，享受前所未有的游戏体验。",
				"createdAt": "2024-01-07T08:32:17.000+00:00",
				"updatedAt": "2024-01-07T08:32:17.000+00:00",
				"publisher": "\r\nSquare Enix",
				"score": 5,
				"releaseTime": "2018-03-06T16:00:00.000+00:00",
				"flag": 1
			},
			{
				"id": 23,
				"name": "Street Fighter 6",
				"cover": "https://s2.loli.net/2024/01/07/H5ECiVG7RK2sjxf.jpg",
				"desc": "系列最新作《Street Fighter 6》将于2023年6月2日发售！ 本作以RE ENGINE开发，并由系列前所未有的大型模式“环球游历”、“斗技战场”以及“格斗中心”构成。新的“Street Fighter”和前所未有的全新体验正在等待着你的到来。",
				"createdAt": "2024-01-07T08:36:04.000+00:00",
				"updatedAt": "2024-01-07T08:36:04.000+00:00",
				"publisher": "\r\nCAPCOM Co., Ltd.",
				"score": 5,
				"releaseTime": "2023-06-01T16:00:00.000+00:00",
				"flag": 1
			}
        ],
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
          this.allRecommendList = res.data.data.GameList;
          this.RecommendList = this.allRecommendList.slice(0,8);
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
      addChoose(gameId, index){
        this.chooseList.push(gameId)
        console.log(this.allRecommendList)
        this.allRecommendList[this.batch * 8 + index] = this.allRecommendList[-1]
        this.allRecommendList.pop()
        console.log(this.allRecommendList)
        this.recommendList = this.allRecommendList.slice(this.batch * 8,(this.batch + 1) * 8)
        if(this.chooseList.length >= 5){
          this.recommendVisible = false
          localStorage.setItem("recommended", 1);
        }
      },
      changeForm(){
        let i = Math.floor(this.allRecommendList.length / 8)
        console.log(i)
        this.batch = (this.batch + 1) % i
        console.log(this.batch)
        this.recommendList = this.allRecommendList.slice(this.batch * 8,(this.batch + 1) * 8)
      },
      closeForm(){
      this.recommendVisible = false
      localStorage.setItem("recommended", 1);
    },
    load(){
      this.allRecommendList=this.allRecommendList2
      this.recommendList = this.allRecommendList.slice(this.batch * 8,(this.batch + 1) * 8)
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