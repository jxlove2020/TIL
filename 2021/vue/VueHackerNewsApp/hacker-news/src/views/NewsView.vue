<template>
  <div>
    <ul class="news-list">
      <li v-for="(item,i) in this.$store.state.news" :key=i class="post">
        <!-- 포인트 영역 -->
        <div class="points">
          {{item.points}}
        </div>
        <!-- 기타 정보 영영 -->
        <div>
          <p class="news-title">
            <a v-bind:href="item.url">
              {{ item.title }}
            </a>
          </p>
        </div>
        <small class="link-text">{{ item.time_ago }} by 
          <router-link :to="`/user/${item.user}`" class="link-text">{{ item.user }}</router-link>
        </small>
      </li>
    </ul>
    <!-- <p v-for="(item,i) in this.$store.state.news" :key=i>
      <a v-bind:href="item.url">
        {{ item.title }}
      </a>
      <small>{{ item.time_ago }} by 
        <router-link :to="`/user/${item.user}`">{{ item.user }}</router-link>
      </small>
    </p> -->
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