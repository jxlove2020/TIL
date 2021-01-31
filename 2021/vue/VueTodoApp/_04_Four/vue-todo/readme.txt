es6 형태로 변경 ===================================
: function 제거
var 를 let 및 const 로 변경
==================================================

Flux =============================================
action : 화면에서 발생하는 이벤트 또는 사용자의 입력
dispatcher : 데이터를 변경하는 방법, 메서드
model : 화면에 표시할 데이터
view  : 사용자에게 비춰지는 화면
==================================================

Vuex =============================================
State : 컴포넌트 간에 공유하는 데이터 data()
View : 데이터를 표시하는 화면 template
Action: 사용자의 입력에 따라 데이터를 변경하는 methods

state : data
getters : computed
mutations : methods
actions : 비동기 메서드
==================================================

npm install vuex

vuex 를 관행적으로 store 라고 부름
component 옆에 store 폴더를 생성 store.js 생성
    ==================================================
    import Vue from 'vue'
    import Vuex from 'vuex'

    // Vue 플러그인 사용 // 전역으로 사용
    Vue.use(Vuex);

    // store 라는 변수를 다른 파일에서 접근 가능하게 export 해줌
    export const store = new Vuex.Store({

    });
    ==================================================
main.js 에 
import {store} from './store/store'
new Vue() 에 추가 내용 store,