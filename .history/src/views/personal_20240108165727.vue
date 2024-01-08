<template>
    <div class="main">
      <el-dialog :title="dialogTitle" :visible.sync="updateVisible" width="50%"  @close="closeForm()">
        <el-form :model="updateform" :rules="rules" ref="updateform" :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
            <el-form-item label="用户名" prop="yonghu">
                <el-input v-model="updateform.nickname" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
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
      <div class="PersonTop">
        <div class="PersonTop_img">
          <img v-image-preview :src="icon" />
        </div>
        <div class="PersonTop_text">
          <div class="user_text">
            <div class="user_name">
              <span style="font-size: 30px;"> {{ nickname }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="person_body">
      <div style="margin-top:10px; margin-left: 820px;"><el-button type="primary" style=" height:36px;width:90px; font-size: 12px;" @click="update()">修改信息</el-button>
  </div>
    <el-tabs :tab-position="left" v-model="activeName" style="height: 200px;">
      <el-tab-pane label="用户信息" name="用户信息">
        <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名" >{{nickname}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{phone_number}}</el-descriptions-item>
    <el-descriptions-item label="生日">{{birthday}}</el-descriptions-item>
    <el-descriptions-item label="性别">{{sex}}</el-descriptions-item>
    <el-descriptions-item label="个人简介">{{profile}}</el-descriptions-item>

</el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="发帖" name="发帖">
        <div class="article-item" v-for="(item,index) in myArticles" :key="index" @click="toArticle(item.articleId)">
          <h4 class="title">{{item.title}}</h4>
          <h6 class="content">{{item.content}}</h6>
          <div class="pictures">
          <div v-for="(item,index) in myArticles[index].picture.split(' ')" :key="index">
          <img :src="item" class="article-img"></div>
        </div>
        <div class="information">
        <div class="empty"></div>
        <div class="view">
        <i class="el-icon-view">{{item.views}}</i>
      </div>
      <div class="time">
        <i class="el-icon-time">{{item.releaseTime.slice(0, 10)}}</i>
      </div>
      </div>
      </div></el-tab-pane >
      <el-tab-pane label="收藏" name="收藏">
        <div class="recommend">
          <div class="game-recommend" v-for="(item,index) in collectList" :key="index" @click="toGame(item.id)">
        <img :src="item.cover" class="game-recommend-img">
        <h6 class="game-name">{{item.name}}</h6>
      </div>
    </div>
      </el-tab-pane>
    </el-tabs>
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
  export default {
    data() {
      return {
        options: [{
          value: 0,
          label: '女'
        }, {
          value: 1,
          label: '男'
        }, {
          value: -1,
          label: '不愿透露'
        },],
        userList:[],
        myArticles:[],
        collectList:[{
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
			}],
        colectArticles:[],
        icon: "",
        nickname: "",
        phone_number:"",
        birthday:"",
        sex:"",
        profile:"",
        v: 1,
        design: "",
        followCounts: "",
        activeName:"用户信息",
        fanCounts: "",
        goodCounts: "",
        isfollow: true,
        updateVisible:false,
        followData: {
          fanId: "",
          followId: "",
        },
        updateform:{
          icon: "",
          nickname: "",
          phone_number:"",
          birthday:"",
          sex:"",
          profile:"",
        },
        isfollowid: [],
        fileList: [],
      };
    },
    mounted() {
      // this.load();
      // this.getCollect()
    },
    // watch: {
    //   $route(to) {
    //     if (to.path == `/newsuser/personal/${this.$store.state.id}`) {
    //       this.reload();
    //     } else if (to.path == `/newsuser/personal/${this.$route.params.id}`) {
    //       this.reload();
    //     }
    //   },
    // },
    methods: {
        load(){
        const token =  localStorage.getItem("token");
        if(localStorage.getItem("activeName")){
          this.activeName = localStorage.getItem("activeName");
        }
          this.$axios({
        url:"/user/homepage",
        method:'get',
        headers:{
        'accept': "application/json",
        'token':token,
        }})
        .then(res=>{
            this.userList = res.data.data.info;
            console.log(this.userList);
            this.nickname = this.userList[0].user_name;
            this.phone_number=this.userList[0].phone_number;
            this.birthday=this.userList[0].birthday;
            this.profile=this.userList[0].profile;
            this.icon=this.userList[0].icon;
            if(this.userList[0].sex===0){
              this.sex="女";
            }
            if(this.userList[0].sex===1){
              this.sex="男";
            }
            if(this.userList[0].sex===-1){
              this.sex="不愿透露";
            }
        });
        this.$axios({
        url:"/user/myarticles",
        method:'get',
        headers:{
        'accept': "application/json",
        'token':token,
        }})
        .then(res=>{
            this.myArticles = res.data.data.articles ;
            console.log(this.myArticles);
        })
        },
      toArticle(articleId){
      localStorage.setItem("activeName",this.activeName);
      console.log(this.articleId);
      let id = articleId
      this.$router.push({
        path:"/about/content",
        query:{id:id}
      })
    },
    getCollect(){
      const token =  localStorage.getItem("token");
      this.$axios({
        url:"/user/mycollects",
        method:'get',
        headers:{
        'accept': "application/json",
        'token':token,
        },

        }).then((res) => {
          if(res.data.data.retCode === "0000") {
            this.collectList = res.data.data.gamesEntityList
          }else{
            this.collectList = []
          }
        })
    },
    update(){
      this.updateform.nickname = this.nickname;
      this.updateform.icon = this.icon;
      this.updateform.phone_number = this.phone_number;
      this.updateform.birthday = this.birthday;
      this.updateform.sex = this.userList[0].sex;
      this.updateform.profile = this.profile;
      this.updateVisible=true
    },
    submitForm(){
      const token =  localStorage.getItem("token");
      const userId =  localStorage.getItem("userId");
      this.$axios({
        url:"/user/updateuser",
        method:'post',
        headers:{
        'accept': "application/json",
        'token':token,
        },
        data:{
          userId : userId,
          userName : this.updateform.nickname,
          icon : this.updateform.icon,
          sex : this.updateform.sex,
          profile : this.updateform.profile,
          birthday : this.updateform.birthday,
          phoneNumber : this.updateform.phoneNumber,
        }}).then((res) => {
          if(res.data.data.retCode === "0000"){
          this.$message({
          message: '修改成功',
          type: 'success'})
          this.$router.go(0);
        }else{
          this.$message.error('修改失败');
        }
        })
    },
    closeForm(){
      this.updateform.nickname = "";
      this.updateform.icon = "";
      this.updateform.phone_number = "";
      this.updateform.birthday = "";
      this.updateform.sex = "";
      this.updateform.profile = "";
      this.updateVisible=false
    },
    toGame(gameId){
        let id = gameId
        this.$router.push({
          path:"/game",
          query:{id:id}
        })
      },
      handlePhoto(file) {
        const token =  localStorage.getItem("token");
        var formdata = new FormData();
        formdata.append('image', file.raw);
        this.$axios({
            url: '/picture/save',
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
              'token':token
            },
            data:formdata,
          }).then((res) => {
            this.updateform.icon = res.data.data.url
          })

      },

    }
    
};
  </script>
  
  <style scoped>
  .main{
    width: 80%;
    height: 2000px;
    margin: 50px auto;
    display: flex;
    flex-direction:column;
    background-color:white;
  }
  .PersonTop {
    width: 1000px;
    height: 100px;
    margin: 100px auto 10px;
    display: flex;
    border-radius: 5px;
  }
  
  .PersonTop_img {
    width: 70px;
    height: 70px;
    background-color: #8c939d;
    margin-right: 24px;
    margin-left: 20px;
    overflow: hidden;
    border-radius: 35px;
  }
  
  .PersonTop_img img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  
  .PersonTop_text {
    margin:10px;
  }
  
  .user_text {
    width: 60%;
    height: 100%;
    line-height: 30px;
  }
  
  .user_name {
    font-weight: bold;

  }
  .user-v {
    margin-bottom: -5px;
  }
  .user-v-img {
    width: 15px;
    height: 15px;
  }
  .user-v-font {
    font-size: 15px;
    color: #00c3ff;
  }
  .user_qianming {
    font-size: 14px;
    color: #999;
  }
  
  .user_num {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .person_body {
    width: 1000px;
    border-radius: 5px;
    margin: 30px auto;
    padding: 20px;
  }
  .article-item{
    margin:8px;
    padding: 6px 20px 2px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor:pointer;
  }
  .pictures{
    display: flex;
  }
  .article-img{
    margin: 10px 5px;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  .title{
    font-family: "黑体";
  }
  
  .title:hover{
    font-family: "黑体";
    color: #00c3ff;
}
  .content{
    font-family: "微软雅黑";
    color: #8c939d;
  }
  .content:hover{
    font-family: "微软雅黑";
    color: #00c3ff;
}
.information{
  display: flex;
  position: relative;

  height: 25px;
  }
  .empty{
    flex:20
  }
  .view{
    flex:5;
  text-align: left;
}
  .time{
    flex:5;
  text-align: right;
  margin-right:20px;
}
.el-input{
width: 250px;
}
.el-date-picker{
width: 250px;
}
.el-select{
  width: 250px;
}
.recommend{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    flex-wrap: wrap;
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
  </style>
  