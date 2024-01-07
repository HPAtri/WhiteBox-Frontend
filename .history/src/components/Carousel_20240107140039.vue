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
        {title:"博德之门3荣获TGA年度游戏",
        info:"《Baldur's Gate 3》由拉瑞安工作室开发和发行,是博德之门系列第三款主打游戏,是一款基于《龙与地下城》的桌上角色扮演游戏。",
        url:"https://mms0.baidu.com/it/u=229321662,1311101547&fm=253&app=120&f=JPEG?w=1423&h=800"},
        {title:"战地2042 Origin低至三折",
        info:"加入《战地风云2042》,走进因失序而面目全非的近未来世界,在小队队友和尖端武器的帮助下,适应并征服瞬息万变的战场,体验前所未有的现代战争。",
        url:"https://img0.baidu.com/it/u=2974800336,165725764&fm=253&fmt=auto&app=120&f=PNG?w=1891&h=712"},
        {title:"街霸6 Steam畅销中",
        info:"在纽约的一个秘密机构被异世界力量入侵之后,您成为了新任局长,并努力重新Control(掌控)局面。 由开发商 Remedy Entertainment 打造的这个超自然的第三人称动作冒险游戏将挑战您掌握超自然能力、可修改的枪械射击和互动式环境的组合,在一个无法预测的神秘世界中杀出一条生路。",
        url:"https://img2.baidu.com/it/u=3098745974,171357054&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"},
        {title:"瑞克五代正在热销",
        info:"电子烟鼻祖载誉归来,为您带来无穷无尽的smoke和一场躁动无限的冒险！在全新的世界中,与疯狂的传统香烟展开殊死之战,反抗整个世界中最冷酷芙蓉王源,拯救你的理塘。",
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
  height:560px;
}

li:focus{ outline:none; }
</style>