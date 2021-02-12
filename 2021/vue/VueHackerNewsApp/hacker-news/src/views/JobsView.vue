<template>
  <div>
    <list-item></list-item>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'
// import bus from '../utils/bus.js'
import ListMixin from '../mixins/ListMixin.js'

export default {
  components: {
    ListItem,
  },
  // mounted() {
  //   bus.$emit('end:spinner')
  // },
  mixins: [ListMixin],
    // created() {
    //   bus.$emit('start:spinner')
    //   // 로딩바가 보이지 않아서 setTimeout 3초 준 상태 실제로 setTimeout 사용하지 않아도 됨 
    //   setTimeout(()=>{
    //     this.$store.dispatch('FETCH_JOBS')
    //     .then(()=>{
    //       console.log('fetched');
    //       bus.$emit('end:spinner')
    //     }).catch((error) => {
    //       console.log(error);
    //     });   
    //   }, 3000)
    // }
  }
</script>

<style>
  
</style>