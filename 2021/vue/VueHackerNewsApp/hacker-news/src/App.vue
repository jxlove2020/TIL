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
  
  /* 라우터 트랜지션 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>