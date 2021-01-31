import Vue from 'vue'
import Vuex from 'vuex'

// Vue 플러그인 사용 // 전역으로 사용
Vue.use(Vuex);

const storage = {
    // fetch: function(){},
    fetch() {
        const arr = [];
        if(localStorage.length > 0) {
            for(let i=0; i<localStorage.length; i++){
              if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
              }
            }
        }
        return arr;
    },
};

// store 라는 변수를 다른 파일에서 접근 가능하게 export 해줌
export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem}
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload) {
            console.log(state,payload)
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }
});