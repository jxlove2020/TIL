<template>
  <div id="app">
    <tool-bar></tool-bar>
    <!-- 라우터 트랜지션 -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
export default {
  components: {
    ToolBar,
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    color: #42b883;
    text-decoration: underline;
  }

  a.router-link-exact-active {
    text-decoration: underline;
  }
  
  /* 라우터 트랜지션 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>