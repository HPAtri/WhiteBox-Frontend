<template>
    <div class="main">
        <div class="u">123</div>
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div class="u">123</div>   
        <div>
          <el-button type="primary" size="mini" @click="changeForm()">换一批</el-button>
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
        changeForm(){
          let i = Math.floor(23 / 8) - 1
          console.log(i)
        },
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