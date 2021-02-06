import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        news: [],
        jobs: [],
        ask: [],
    },
    getters: {
        fetchedAsk(state) {
            return state.ask;
        }
    },
    mutations,
    // 액션에서 api 호출
    actions,
})