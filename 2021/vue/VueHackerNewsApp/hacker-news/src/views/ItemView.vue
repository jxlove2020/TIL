<template>
  <div>
    <!-- <p>{{ fetchedItem.title }}</p>
    <div>{{ fetchedItem.content }}</div> -->
    <section>
      <div class="user-container">
        <user-profile :info="fetchedItem">
          <div slot="username">{{ fetchedItem.user}}</div>
          <template slot="time">{{ fetchedItem.time_ago }}</template>
        </user-profile>
        <!-- <div>
          <i class="fas fa-user"></i>
        </div>
        <div class="user-description">
          <router-link :to="`/user/${fetchedItem.user}`">
            {{ fetchedItem.user }}
          </router-link>
          <div class="time">
            {{ fetchedItem.time_ago }}
          </div>
        </div> -->
      </div>
    </section>
    <section>
        <h2>{{ fetchedItem.title }}</h2>
    </section>
    <section>
      <div v-html="fetchedItem.content">
      </div>
    </section>
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    UserProfile,
  },
  computed: {
    // itemInfo() {
    //   return this.$store.state.item;
    // }
    ...mapGetters(['fetchedItem'])
  },
  created() {
    const itemId = this.$route.params.id
    this.$store.dispatch('FETCH_ITEM', itemId);
  }
}
</script>

<style scoped>
  .user-container {
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
  .fa-user {
    font-size: 2.5rem;
  }
  .user-description {
    padding-left: 0.5rem;
  }
  .time {
    font-size: 0.7rem;
  }
</style>