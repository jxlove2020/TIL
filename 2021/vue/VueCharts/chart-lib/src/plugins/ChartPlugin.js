import Chart from 'chart.js';

export default {
    install(Vue) {
        // console.log('chart plugin loaded');
        Vue.prototype.$_Chart = Chart;

        
    }
}