<template>
  <div>
    <ul>
      <!-- v-for 를 쓸 경우 v-bind:key 추가 -->
      <li v-for="todoItem in todoItems" v-bind:key="todoItem" class="shadow">
        {{todoItem}}
        <span class="removeBtn" v-on:click="removeTodo">
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
      todoItems: []
    }
  },
  // created 라이프 사이클 중 하나.
  created: function() {
    if(localStorage.length > 0) {
      for(var i=0; i<localStorage.length; i++){
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
          this.todoItems.push(localStorage.key(i));
        }
      }
    }
  }
}
</script>

<style>
  /* scoped 사용하지 않음 */ 
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
</style>