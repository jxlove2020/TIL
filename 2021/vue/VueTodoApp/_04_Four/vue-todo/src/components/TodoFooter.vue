<template>
  <div>
    <!-- clearAll 전체 삭제 버튼 -->
    <div class="clearAllContainer">
      <span class="clearAllBtn" v-on:click="clearTodo">ClearAll</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo() {
      // this.$emit('clearAll');
      this.$store.commit('clearAllItems'); // store 의 mutation 함수 실행/
    }
  }
}
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
  cursor: pointer;
}
</style>