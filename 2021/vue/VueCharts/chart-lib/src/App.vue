<template>
  <div>
    <h1>Chart.js</h1>
    
    <h3>BarChart</h3>
    <bar-chart v-bind:propsdata="chartDataSet"></bar-chart>

    <h3>LineChart</h3>
    <line-chart></line-chart>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue';
import LineChart from './components/LineChart.vue';

export default {
  components: {
      BarChart,
      LineChart,
  },
  data() {
    return {
      // created 에서 데이터 불러온 값이 아래와 같이 저장되있다고 가정
      chartDataSet: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }],
    }
  },
  created() {
    // 데이터 불러오기
    // data = axios.get('')
    //       .then(response => this.chartDataSet = response.data)
    //       .catch(error => console.log(error))

  }
}
</script>

<style>

</style>