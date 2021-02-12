import bus from '../utils/bus.js';

export default {
    // 재사용할 컴포넌트 옵션    
    mounted() {
        bus.$emit('end:spinner')
    },
    // created() {
    //     bus.$emit('start:spinner')
    //     // 로딩바가 보이지 않아서 setTimeout 3초 준 상태 실제로 setTimeout 사용하지 않아도 됨 
    //     this.$store.dispatch('FETCH_LIST', this.$route.name)
    //           .then(()=>{
    //             console.log('fetched');
    //             bus.$emit('end:spinner')
    //           }).catch((error) => {
    //             console.log(error);
    //           });  
    // }
}