// VueCLI 를 활용하여 프로젝트 생성
1. vue create vue-todo
2. cd vue-todo
3. npm run serve

components 에서 HelloWorld.vue 삭제
App.vue 에서 다 지우고 vu 탭 해서 템플릿 생성
template 에서 div 하나 생성 root

components 에 파일명 두 단어로 조합
브라우저의 태그인지 컴포넌트 태그인지 구분하기 위해서 두단어로 조합함

TodoHeader.vue, TodoInput.vue, TodoList.vue, TodoFooter 생성
vu 탭 해서 파일에 맞게 템플릿 생성
template 안에 header, input, list, footer 내용 추가

첫번째 Todo 앱 에서 로컬스토리지에 저장되는 것이 
새로 고침을 해야 적용 되는 문제점이 있음.