<template>
  <div>
    <div v-for="(user,i) in this.$store.state.news" :key=i>{{ user.title }}</div>    
  </div>
</template>

<script>
// import { fetchNewsList } from '../api/index.js';

export default {
  // data() {
  //   return {
  //     users: []
  //   }
  // },
  created() {
    this.$store.dispatch('FETCH_NEWS')
    // var vm = this;
    // axios.get('https://api.hnpwa.com/v0/news/1.json')
    // fetchNewsList().then(response=>{
    //   this.users = response.data
    // }).catch(function(error){
    //   console.log(error)
    // })
  }
}
</script>

<style>

</style>