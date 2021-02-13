<template>
  <canvas ref="lineChart" id="lineChart" width="400" height="400"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
        // 컴포넌트 속성 && 인스턴스 속성
    mounted() {
        // var ctx = document.getElementById('lineChart').getContext('2d');
        var ctx = this.$refs.lineChart.getContext('2d');
        
        // var lineChart = new Chart(ctx, {
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]
            },

            // Configuration options go here
            options: {}
        });
    }
}
</script>

<style>

</style>