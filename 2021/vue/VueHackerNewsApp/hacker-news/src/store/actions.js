import { fetchJobsList, fetchNewsList, fetchAskList, fetchUserInfo, fetchCommentIem, fetchList } from '../api/index.js';

export default {
    // promise
    // FETCH_NEWS (context) {
    //     return fetchNewsList()
    //         .then(response => {
    //             // console.log(response.data);
    //             // state 에 바로 데이터 접근 할수 없어서
    //             // context 에 담아 mutation에서 데이터 접근 처리
    //             context.commit('SET_NEWS', response.data);
    //             // state.news = response.data
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // },
    // async 
    async FETCH_NEWS(context) {
        const response = await fetchNewsList();
        context.commit('SET_NEWS', response.data);
        return response;
    },

    // FETCH_JOBS (context) {
    // FETCH_JOBS ({commit}) {
    //     // distructuring 구조분해
    //     return fetchJobsList()
    //         .then( ({data}) => {   // .then(response => {
    //             // console.log(context);
    //             // context.commit('SET_JOBS', response.data);
    //             // context.commit('SET_JOBS', data);
    //             commit('SET_JOBS', data);
    //             })
    //             .catch(error => {
    //             console.log(error)
    //             })
    // },
    async FETCH_JOBS (context) {
        try {            
            const response = await fetchJobsList();
            context.commit('SET_JOBS', response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    // FETCH_ASK ({commit}) {
    //     return fetchAskList()
    //         .then( ({data}) => {   
    //             commit('SET_ASK', data);
    //             })
    //             .catch(error => {
    //             console.log(error)
    //             })
    // },
    async FETCH_ASK (context) {
        const response = await fetchAskList();
        context.commit('SET_ASK', response.data);
        return response;
    },
    // promise
    // FETCH_LIST ({commit}, pageName) {
    //     return fetchList(pageName)
    //         .then( response => {
    //             commit('SET_LIST', response.data)
    //             return response;
    //         })
    //         .catch(error => console.log(error));
    // },
    // async ( context 구조분해 commit 사용 )
    async FETCH_LIST ({commit}, pageName) {
        try {
            const response = fetchList(pageName)
            commit('SET_LIST', response.data)
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    FETCH_USER ({commit}, name) {
        return fetchUserInfo(name)
            .then( ({data}) => {   
                commit('SET_USER', data);
                })
                .catch(error => {
                console.log(error)
                })
    },
    FETCH_ITEM ({commit}, id) {
        return fetchCommentIem(id)
            .then( ({data}) => {   
                commit('SET_ITEM', data);
                })
                .catch(error => {
                console.log(error)
                })
    },
}