<template>
  <div>
    <ul class="news-list">
      <li v-for="(ask,i) in fetchedAsk" :key=i class="post">
        <!-- 포인트 영역 -->
        <div class="points">
          {{ask.points}}
        </div>
        <!-- 기타 정보 영영 -->
        <div>
          <p class="news-title">
            <router-link :to="`ask/${ask.id}`">
              {{ ask.title }}
            </router-link>
          </p>
        </div>
        <small class="link-text">{{ ask.time_ago }} by 
          <router-link :to="`/user/${ask.user}`" class="link-text">{{ ask.user }}</router-link>
        </small>
      </li>
    </ul>    
  </div>
</template>

<script>
// import { fetchAskList } from '../api/index.js';
// import {mapState, mapGetters} from 'vuex';
import {mapGetters} from 'vuex';

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
    // ...mapState({
    //   ask: state => state.ask
    // }),

    // #3
    // 객체 표기법
    // ...mapGetters({
    //   fetchedAsk: 'fetchedAsk'
    // }),
    // 배열 표기법
    ...mapGetters([
      'fetchedAsk'
    ])
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