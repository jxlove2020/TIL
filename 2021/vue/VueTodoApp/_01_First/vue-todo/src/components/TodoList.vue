<template>
  <div>
    <ul>
      <!-- v-for 를 쓸 경우 v-bind:key 추가 -->
      <li
        v-for="(todoItem, index) in todoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <i
          class="checkBtn fas fa-check"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete(todoItem)"
        ></i>
        <!-- textCompleted 가 true 이면 클래스 적용 -->
        <span
          v-bind:class="{ textCompleted: todoItem.completed }"
          v-on:click="toggleComplete(todoItem, index)"
          >{{ todoItem.item }}
        </span>
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      todoItems: [],
    };
  },
  methods: {
    removeTodo: function(todoItem, index) {
      console.log(todoItem, index);
      // 로컬스토리지 삭제 영역
      // 키 값과 밸류값이 동일하게 설정하였으므로 가능
      localStorage.removeItem(todoItem.item);
      // slice 는 기존 배열을 변경하지 않음, splice 는 해당아이템 지우게 됨
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function(todoItem) {
      // console.log(todoItem, index);
      todoItem.completed = !todoItem.completed;
      // 지우고 다시 생성
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
  },
  // created 는 vue 의 라이프 사이클 훅 중 하나.
  // 자주 사용되는 라이프 사이클 훅 : created, beforeMount, mounted, destroyed
  created: function() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // this.todoItems.push(localStorage.key(i));
          console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
