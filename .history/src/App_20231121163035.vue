<template>
  <div id="app">
    <navbar class="nav"></navbar>
    <div class="useless"></div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
     </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'
export default {
    components: {
        navbar
    }
}

</script>

<style>
*{
  margin: 0;
  padding: 0;
  -ms-overflow-style: none;
}

::-webkit-scrollbar{
  width: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #1b1b1b;
}
.nav{
  height:100px;
}

.useless{
  height: 1px;
  width: 100%;
}
</style>

