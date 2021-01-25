<template>
  <div>
    <!-- <app-header v-bind: 프롭스속성이름="상위컴포넌트데이터이름"></app-header> -->
    <app-header 
      v-bind:propsdata="str"
      v-on:renew="renewStr"
    ></app-header>
  </div>
</template>

<script>

import AppHeader from './components/AppHeader.vue';
// 아래와 같이 객체가 아니라 파일로 저장된 컴포넌트를 가지고 옴 

// var AppHeader = {
//   template: '<header><h1>Header</h1></header>'
// }

// new Vue({
//   data: {
//     str: 'Header'
//   }
// })

export default {
  data: function() {
    return {
      str: 'Header'
    }
  },
  components: {
    'app-header': AppHeader
  }, 
  methods: {
    renewStr: function() {
      this.str = 'hi'
    }
  }
}

</script>

<style scope>

</style>