<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script> 
import Header from './components/Header'
import Footer from "./components/Footer"

export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    //派发vuex中actions里面的getCategoryList请求--让请求只发一次，性能较好
    this.$store.dispatch('home/getCategoryList');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
