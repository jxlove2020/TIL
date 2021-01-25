// @vue/cli 설치 , 옵션: -g 전역으로 설치
npm install -g @vue/cli

[Vue CLI 2.x]
// vue init '프로젝트 템플릿 유형' '프로젝트 폴더 위치'
vue init webpack-simple '프로젝트 폴더 위치'

[Vue CLI 3.x]
vue create '프로젝트 폴더 위치'

// VueCLI 를 활용하여 프로젝트 생성
1. vue create vue-cli
2. cd vue-cli
3. npm run serve

components 에서 HelloWorld.vue 삭제
App.vue 에서 다 지우고 vu 탭 해서 템플릿 생성
template 에서 div 하나 생성 root

components 에 파일명 두 단어로 조합
브라우저의 태그인지 컴포넌트 태그인지 구분하기 위해서 두단어로 조합함

AppHeader.vue 생성
vu 탭 해서 템플릿 생성
template 안에 header 내용 추가
<header>
    <h1>Header</h1>
</header>

App.vue 에 임포트 할 때 확장자까지 등록을 해줘야 
VS Code 에서 제공하는 파일 바로가기 가 깨지지 않고 잘 동작함

import AppHeader from './components/AppHeader.vue';

// data 등록 및 components 등록
export default {
  data: function() {
    return {
      str: 'Header'
    }
  },
  components: {
    'app-header': AppHeader
  }
}

App.vue 페이지 상단 template 에 
컴포넌트 태그 추가
<div>
    <app-header></app-header>
</div>

==============================
props ========================

App.vue 파일에서 app-header 컴포넌트 태그에 
v-bind:propsdata="str" 추가
<app-header v-bind: 프롭스속성이름="상위컴포넌트데이터이름"></app-header>

AppHeader.vue 파일에서 script 단에서 props 부분 추가
<script>
export default {
  props: ['propsdata']
}
</script>

AppHeader.vue 파일에서 template 단에서 propsdata 바인딩
<header>
    <h1> {{ propsdata }} </h1>
</header>



==============================
emit =========================

AppHeader.vue 파일에서 template 단에서 button 생성
<button v-on:click="sendEvent">send</button>

AppHeader.vue 파일에서 script 단에서 button 생성 emit 으로 renew 이벤트 추가
<script>
export default {
  props: ['propsdata'],
  methods: {
    sendEvent: function() {
      this.$emit('renew')
    }
  }
}
</script>

AppHeader.vue 파일에서 template 단에서 v-on:renew 추가 후 renewStr 메서드 생성
<app-header 
    v-bind:propsdata="str"
    v-on:renew="renewStr"
></app-header>

App.vue 파일에서 script 단에서 methods 추가
methods: {
    renewStr: function() {
        this.str = 'hi'
    }
}


==============================
HMR(Hot Module Replacement) 
WDS(Webpack Development Server)