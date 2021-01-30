<template>
  <div class="inputBox shadow">
    <!-- v-on:keyup.enter="addTodo" : 엔터 쳤을 때 addTodo 해라 -->
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">

    <!-- v-on:click="addTodo": 클릭 했을 때 addTodo 해라 -->
    <!-- <button v-on:click="addTodo">add</button> -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>



      <Modal v-if="showModal" @close="showModal = false">
        <!--
      you can use custom content here to overwrite
      default content
    -->
    <!-- 슬롯에서 모달에 있는 내용 재정의 -->
        <h3 slot="header">
          경고!!
          <!-- @click 은 v-on:click 과 같음  -->
          <!-- <i class="closeModalBtn fas fa-times" @click="showModal = false"></i> -->
          <i class="closeModalBtn fas fa-times" v-on:click="showModal = false"></i>
        </h3>
        <div slot="body">
          아무것도 입력하지 않으셨습니다.
        </div>
      </Modal>


  </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
  data: function () {
    return {
      newTodoItem: "",
      showModal: false
    }
  }, 
  methods: {
    addTodo: function () {
      // 값이 있을 때만 실행
      if (this.newTodoItem !== ''){
        // this.$emit('이벤트이름', 인자1, 인자2, ...);
        this.$emit('addTodoItem', this.newTodoItem);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput: function() {
      this.newTodoItem = '';
    }
  },
  components: {
    Modal: Modal
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
.closeModalBtn{
  color:#42b983;
}
</style>