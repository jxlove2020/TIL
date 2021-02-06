<template>
  <div>
    <div v-for="(item,i) in ask" :key=i>{{ item.title }}</div> 
  </div>
</template>

<script>
// import { fetchAskList } from '../api/index.js';
import {mapState} from 'vuex';

export default {
  // data() {
  //   return {
  //     ask: []
  //   }
  // },
  computed: {
    // #1
    // ask() {
    //   return this.$store.state.ask
    // }, 
    // #2
    ...mapState({
      ask: state => state.ask
    })
  },
  created() {
    this.$store.dispatch('FETCH_ASK')
    // // var vm = this; // this 를 그대로 가져가기 위해 화살표 함수를 사용
    // // axios.get('https://api.hnpwa.com/v0/ask/1.json')
    // // fetchAskList().then(function(response){
    // fetchAskList().then(response=>{
    //   console.log(response);
    //   // vm.ask = response.data;
    //   this.ask = response.data;
    // }).catch(function(error){
    //   console.log(error)
    // })
  }
}
</script>

<style>

</style>