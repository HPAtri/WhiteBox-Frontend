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
        info:"《Street Fighter 6》本作以RE ENGINE开发,并由系列前所未有的大型模式“环球游历”、“斗技战场”以及“格斗中心”构成。前所未有的全新体验正在等待着你的到来。",
        url:"https://img0.baidu.com/it/u=1819723335,790967212&fm=253&fmt=auto&app=120&f=JPEG?w=1216&h=684"},
        {title:"戴森球计划 大型免费更新 黑雾崛起",
        info:"电子烟鼻祖载誉归来,为您带来无穷无尽的smoke和一场躁动无限的冒险!在全新的世界中,与疯狂的传统香烟展开殊死之战,反抗整个世界中最冷酷芙蓉王源,拯救你的理塘。",
        url:"https://media.9game.cn/gamebase/ieu-gdc-pre-process/images/20230922/8/8/670b0811abc4cdfe700ed77228853f28.jpg"},
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