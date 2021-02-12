<template>
  <div id="app">
    <tool-bar></tool-bar>
    <!-- 라우터 트랜지션 -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- 스피너 -->
    <spinner :loading="loadingStatus"></spinner>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import Spinner from './components/Spinner.vue';
import bus from './utils/bus.js'

export default {
  components: {
    ToolBar,
    Spinner,
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    }
  },
  // on : addEvent 같은 역할
  created() {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
  },
  // 이벤트 버스 on을 한 경우에는 beforeDestroy에서 off를 꼭 해줘야 이벤트 개체가 쌓이지 않는다.
  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner);
    bus.$off('end:spinner', this.endSpinner);
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
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>