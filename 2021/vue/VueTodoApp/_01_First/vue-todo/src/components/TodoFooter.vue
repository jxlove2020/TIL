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
    clearTodo: function() {
      // 로컬스토리지 데이터 전체 지우기
      localStorage.clear();
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