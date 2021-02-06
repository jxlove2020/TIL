import Vue from 'vue';
import Vuex from 'vuex';
import { fetchNewsList } from '../api/index.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        news: []
    },
    mutations:{
        SET_NEWS(state, news){
            state.news = news;
        }
    },
    // 액션에서 api 호출
    actions: {
        FETCH_NEWS (context) {
            fetchNewsList()
                .then(response => {
                    console.log(response.data);
                    // state 에 바로 데이터 접근 할수 없어서
                    // context 에 담아 mutation에서 데이터 접근 처리
                    context.commit('SET_NEWS', response.data);
                    // state.news = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    // getters,
    // mutations,
})