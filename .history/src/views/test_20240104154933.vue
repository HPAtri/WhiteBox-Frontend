<template>
    <div class="main">
        <div class="u">123</div>
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div class="PersonTop_img">
          <img v-image-preview :src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi3%2F653957414%2FO1CN01Ls8fjX24dextfTpse_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1701331298&t=985b0ee776d0a6394d969e6d6cdb030f"/>
        </div>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          options: [],
          list: [],
          loading: false,
          states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"]
        }
      },
      mounted() {
        this.list = this.states.map(item => {
          return { value: `value:${item}`, label: `label:${item}` };
        })
        console.log(this.list);
      },
      methods: {
        remoteMethod(query) {
          console.log(this.list)
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options = [];
          }
        }
      }
    }
  </script>

<style scoped>
.main{
    margin-top:200px;
}
.u{
    padding-top:200px;
    min-height: 200px;
}