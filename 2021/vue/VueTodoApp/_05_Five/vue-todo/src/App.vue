<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

// var my_component = {
//   template: '<div>my component</div>'
// };

// new Vue({
//   el: '',
//   components: {
//     'my-component': my_component
//   }
// });

export default {
  name: 'App',
  
  components: {
    // '컴포넌트 태그명': 컴포넌트 내용 (컴포넌트 내용은 상단에 임포트 시킨 파일)
    // 'TodoHeader':TodoHeader,
    // 'TodoInput':TodoInput,
    // 'TodoList':TodoList,
    // 'TodoFooter':TodoFooter

    // 속성명과 값 명이 동일할 때 축약 가능
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
