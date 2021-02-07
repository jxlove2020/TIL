<template>
  <div>
    <user-profile :info="userInfo"></user-profile>
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
export default {
  components: {
    UserProfile,
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  },
  created() {
    // console.log(this.$route.params.id);
    const userName = this.$route.params.id;
    
    this.$store.dispatch('FETCH_USER', userName);
  }
}
</script>

<style>

</style>