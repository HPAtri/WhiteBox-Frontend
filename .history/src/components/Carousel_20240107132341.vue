<template>
  <div>
    <b-carousel id="carousel" controls indicators>
      <b-carousel-slide :caption="item.title" :img-src="item.url" v-for="(item,index) in carouselItems" :key="index">
        <p>
          {{item.info}}
        </p>
      </b-carousel-slide>
    </b-carousel>
      
</div>
</template>

<script>
export default {
  data(){
    return{
      carouselItems:[
        {title:"尼尔机械纪元正在促销",
        info:"《NieR:Automata》讲述了机器人 2B、9S 和 A2 的故事，以及他们为夺回遭强大机械生命体占领、由机器驱动的反乌托邦而进行的战斗。",
        url:"https://media.st.dl.eccdnx.com/steam/apps/1086940/header.jpg"},
        {title:"战地5 Origin低至三折",
        info:"加入《战地风云 5》，体验人类史上最大的战争，并随著《战地风云》系列一起追本溯源，以前所未见的角度重临二次世界大战。",
        url:"https://media.st.dl.eccdnx.com/steam/apps/770810/ss_bfd46c839a2128195b7bb367f3d4a4c505ea81bc.1920x1080.jpg"},
        {title:"Control现已登录EPIC平台",
        info:"在纽约的一个秘密机构被异世界力量入侵之后，您成为了新任局长，并努力重新Control(掌控)局面。 由开发商 Remedy Entertainment 打造的这个超自然的第三人称动作冒险游戏将挑战您掌握超自然能力、可修改的枪械射击和互动式环境的组合，在一个无法预测的神秘世界中杀出一条生路。",
        url:"https://lain.bgm.tv/pic/cover/l/73/6d/210827_rGgIj.jpg"},
        {title:"瑞克五代正在热销",
        info:"电子烟鼻祖载誉归来，为您带来无穷无尽的smoke和一场躁动无限的冒险！在全新的世界中，与疯狂的传统香烟展开殊死之战，反抗整个世界中最冷酷芙蓉王源，拯救你的理塘。",
        url:"https://cdn.hk01.com/di/media/images/dw/20210720/494233049202954240095127.jpeg/Gtaq3XCs2uf6M9GekdCXNBW9HVM_YoBE0mHODdJhzg0?v=w800"},
        ]
    }
  },
     
}
</script>

<style>
.carousel-caption{
  display:flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.carousel-caption h3{
  background: rgba(1, 1, 1, 0.3);
}
.carousel-caption p{
  width: 800px;
  background: rgba(1, 1, 1, 0.3);
}
.carousel-item{
  height:500px;
}

li:focus{ outline:none; }
</style>