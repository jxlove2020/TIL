<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id :  </label>
      <input id="username" type="text" v-model="username">
    </div>
    <div>
      <label for="password">pw :  </label>
      <input id="password" type="password" v-model="password">
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  // 객체를 많이 사용했었지만 
  // 값이 참조가 되서 컴포넌트간의 데이터가 공유되지 않도록 
  // 새 개체를 리턴해주는 구문 사용 
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm: function() {
      // event.preventDefault();
      console.log(this.username, this.password);
      
      var url = 'https://jsonplaceholder.typicode.com/users'
      var data = {
        username: this.username,
        password: this.password
      }

      axios.post(url, data)
      .then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }
}
</script>

<style>

</style>