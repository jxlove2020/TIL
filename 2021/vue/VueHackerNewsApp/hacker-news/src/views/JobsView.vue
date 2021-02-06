<template>
  <div>
    <div v-for="(job,i) in this.$store.state.jobs" :key=i>{{ job.title }}</div>
  </div>
</template>

<script>
// import { fetchJobsList } from '../api/index.js';

export default {
  // data() {
  //   return {
  //     jobs: []
  //   }
  // },
  created() {
    this.$store.dispatch('FETCH_JOBS')
    // var vm = this;
    // // axios.get('https://api.hnpwa.com/v0/jobs/1.json')
    // fetchJobsList().then(function(response){
    //   console.log(response);
    //   vm.jobs = response.data;
    // }).catch(function(error){
    //   console.log(error)
    // })
  }
}
</script>

<style>

</style>