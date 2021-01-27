<template>
  <div class="inputBox shadow">
    <!-- v-on:keyup.enter="addTodo" : 엔터 쳤을 때 addTodo 해라 -->
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">

    <!-- v-on:click="addTodo": 클릭 했을 때 addTodo 해라 -->
    <!-- <button v-on:click="addTodo">add</button> -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      newTodoItem: ""
    }
  }, 
  methods: {
    addTodo: function () {
      // 로컬 스토리지 저장 ( 키 밸류 동일 )
      localStorage.setItem(this.newTodoItem, this.newTodoItem);
      this.clearInput();
    },
    clearInput: function() {
      this.newTodoItem = '';
    }
  }
}
</script>

<style scoped>
input:focus {
  outline:none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}

</style>