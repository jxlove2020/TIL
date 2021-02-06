<template>
  <div>
    <p v-for="(job,i) in this.$store.state.jobs" :key=i>
      <!-- v-bind:href => :href 축약해서 사용  -->
      <a :href="job.url">
        {{ job.title }}
      </a>
      <small>{{ job.time_ago }} by {{ job.domain }}</small>
    </p>
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