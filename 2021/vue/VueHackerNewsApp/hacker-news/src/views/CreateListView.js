import ListView from './ListView.vue';
import bus from '../utils/bus.js';

export default function createListView(name) {
    return {
        // 재사용할 인스턴스 (컴포넌트) 옵션들이 들어갈 자리
        name: name,
        created() {
            bus.$emit('start:spinner')
            // 로딩바가 보이지 않아서 setTimeout 3초 준 상태 실제로 setTimeout 사용하지 않아도 됨 
            // setTimeout(()=>{
              this.$store.dispatch('FETCH_LIST', this.$route.name)
              .then(()=>{
                console.log('fetched');
                bus.$emit('end:spinner')
              }).catch((error) => {
                console.log(error);
              });   
            // }, 3000)    
        },
        render(createElement) {
            return createElement(ListView);
        }
    }
}