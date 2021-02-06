<template>
  <div>
    <p v-for="(item,i) in this.$store.state.news" :key=i>
      <a v-bind:href="item.url">
        {{ item.title }}
      </a>
      <small>{{ item.time_ago }} by {{ item.user }}</small>
    </p>
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
    // // axios.get('https://api.hnpwa.com/v0/news/1.json')
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