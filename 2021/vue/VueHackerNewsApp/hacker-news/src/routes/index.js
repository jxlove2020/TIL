import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsView from '../views/NewsView.vue'
import AskView from '../views/AskView.vue'
import JobsView from '../views/JobsView.vue'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
// import createListView from '../views/CreateListView.js'
import bus from '../utils/bus.js';
import { store } from '../store/index.js'

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            // path: url 주소
            path: '/',
            // redirec: url 주소로 갔을 때 redirect 될 주소
            redirect: '/news',
        },
        {
            // path: url 주소
            path: '/news',
            // name: route 정보의 이름
            name: 'news',
            // component: url 주소로 갔을 때 표시될 컴포넌트
            component: NewsView,
            // component: createListView('NewsView'),
            
            // 라우트 가드 beforeEnter (to: 이동할 url ,  from: 현재 위치 url , next: function 함수 실행 )
            beforeEnter: (to, from, next)=>{
                // console.log('to', to);
                // console.log('from', from);
                // console.log('next', next);
                // next(); // next 함수 호출해야 이동
                bus.$emit('start:spinner')
               
                // this.$store.dispatch('FETCH_LIST', this.$route.name)
                store.dispatch('FETCH_LIST', to.name)
                    .then(()=>{
                        console.log('fetched');
                        // bus.$emit('end:spinner')
                        next();
                    }).catch((error) => {
                        console.log(error);
                    });  
            }
        },
        {
            path: '/ask',
            name: 'ask',
            component: AskView,
            // component: createListView('AskView'),

            // 라우트 가드 beforeEnter (to: 이동할 url ,  from: 현재 위치 url , next: function 함수 실행 )
            beforeEnter: (to, from, next)=>{
                // console.log('to', to);
                // console.log('from', from);
                // console.log('next', next);
                // next(); // next 함수 호출해야 이동
                bus.$emit('start:spinner')
               
                // this.$store.dispatch('FETCH_LIST', this.$route.name)
                store.dispatch('FETCH_LIST', to.name)
                    .then(()=>{
                        console.log('fetched');
                        // bus.$emit('end:spinner')
                        next();
                    }).catch((error) => {
                        console.log(error);
                    });  
            }
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView,
            // component: createListView('JobsView'),

            // 라우트 가드 beforeEnter (to: 이동할 url ,  from: 현재 위치 url , next: function 함수 실행 )
            beforeEnter: (to, from, next)=>{
                // console.log('to', to);
                // console.log('from', from);
                // console.log('next', next);
                // next(); // next 함수 호출해야 이동
                bus.$emit('start:spinner')
               
                // this.$store.dispatch('FETCH_LIST', this.$route.name)
                store.dispatch('FETCH_LIST', to.name)
                    .then(()=>{
                        console.log('fetched');
                        // bus.$emit('end:spinner')
                        next();
                    }).catch((error) => {
                        console.log(error);
                    });  
            }
        },
        {
            path: '/item/:id',
            component: ItemView,
        },
        {
            path: '/user/:id',
            component: UserView,
        },
    ]
});