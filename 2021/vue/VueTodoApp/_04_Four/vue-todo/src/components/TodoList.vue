<template>
  <div>
    <!-- 트랜지션 효과 주기
    ul 태그에 효과를 준 것이며 name으로 클래스 지정
    .list-enter-active, .list-leave-active -->
    <transition-group name="list" tag="ul">
      <!-- v-for 를 쓸 경우 v-bind:key 추가 -->
      <li v-for="(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
        <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
            v-on:click="toggleComplete(todoItem, index)"></i>
        <!-- textCompleted 가 true 이면 클래스 적용 -->
        <span v-bind:class="{textCompleted: todoItem.completed}"
            v-on:click="toggleComplete(todoItem, index)">{{ todoItem.item }}
        </span>
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  methods: {
    removeTodo(todoItem, index) {
      // console.log(todoItem, index);
      // this.$emit('removeItem', todoItem, index);
      this.$store.commit('removeOneItem', {todoItem, index}); // store 의 mutation 함수 실행
      
    },
    toggleComplete(todoItem, index) {
      // console.log(todoItem, index);
      // this.$emit('toggleItem', todoItem, index);
      this.$store.commit('toggleOneItem', {todoItem, index}); // store 의 mutation 함수 실행
    }
  },
  
}
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
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>