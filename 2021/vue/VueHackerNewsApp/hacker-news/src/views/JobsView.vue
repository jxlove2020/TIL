<template>
  <div>
    <ul class="news-list">
      <li v-for="(job,i) in this.$store.state.jobs" :key=i class="post">
        <!-- 포인트 영역 -->
        <div class="points">
          <!-- 포인트가 널일경우 0 처리 -->
          {{job.points || 0}}
        </div>
        <!-- 기타 정보 영영 -->
        <div>
          <p class="news-title">
            <a v-bind:href="job.url">
              {{ job.title }}
            </a>
          </p>
        </div>
        <small class="link-text">{{ job.time_ago }} by 
          <a :href="job.url">{{ job.domain }}</a>
        </small>
      </li>
    </ul>
    <!-- v-bind:href => :href 축약해서 사용  -->
    <!-- <p v-for="(job,i) in this.$store.state.jobs" :key=i>
      <a :href="job.url">
        {{ job.title }}
      </a>
      <small>{{ job.time_ago }} by {{ job.domain }}</small>
    </p> -->
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


<style scoped>
  .news-list {
    margin: 0;
    padding: 0;
  }
  .post {
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  .points {
    width: 5rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #42b883;
  }
  .news-title {
    margin: 0;
  }
  .link-text {
    color: #828282;
  }
</style>