<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:하위컴포넌트에서 발생시킨 이벤트 이름="현재컴포넌트 메서드 명"></TodoInput> -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- <TodoList v-bind:내려보낼 프롭스 속성이름="현재위치의 컴포넌트 데이터 속성"></TodoList> -->
    <TodoList 
      v-bind:propsTodoData="todoItems" 
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"></TodoList>
      <!-- v-on:$emit 받아서 = "메서드 실행" -->
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
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
  props: ['propsTodoData'],
  data: function() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      var obj = {completed: false, item: todoItem}
      // 로컬 스토리지 저장 ( 키 밸류 동일하지만 객체로 전달 )
      // 로컬스토리지에 저장 : stringify 는 객체를 string 으로 변환 api
      localStorage.setItem(todoItem, JSON.stringify(obj));
      // push : 자바스크립트 API , 배열에 하나 추가 
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      // 로컬스토리지 삭제 영역
      // 키 값과 밸류값이 동일하게 설정하였으므로 가능
      localStorage.removeItem(todoItem.item);
      // slice 는 기존 배열을 변경하지 않음, splice 는 배열의 해당아이템 지우게 됨
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(todoItem, index) {
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // 지우고 다시 생성
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    },
    clearAllItems: function() {
      // 로컬스토리지 데이터 전체 지우기
      localStorage.clear();
      this.todoItems = [];
    }
  },
  // created 는 vue 의 라이프 사이클 훅 중 하나.
  // 자주 사용되는 라이프 사이클 훅 : created, beforeMount, mounted, destroyed
  created: function() {
    if(localStorage.length > 0) {
      for(var i=0; i<localStorage.length; i++){
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
          // this.todoItems.push(localStorage.key(i));
          console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  },
  components: {
    // '컴포넌트 태그명': 컴포넌트 내용 (컴포넌트 내용은 상단에 임포트 시킨 파일)
    'TodoHeader':TodoHeader,
    'TodoInput':TodoInput,
    'TodoList':TodoList,
    'TodoFooter':TodoFooter
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
