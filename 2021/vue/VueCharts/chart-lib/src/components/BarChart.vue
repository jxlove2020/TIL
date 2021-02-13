<template>
  <canvas ref="barChart" id="barChart" width="400" height="400"></canvas>
</template>

<script>
// import Chart from 'chart.js'
// 차트 플러그인 사용으로 인해 주석 처리

export default {
    props: ['propsdata'],
    // 컴포넌트 속성 && 인스턴스 속성
    mounted() {
        // let ctx = document.getElementById('barChart');
        let ctx = this.$refs.barChart;

        // let barChart = new Chart(ctx, {
        // new Chart(ctx, { // 차트 플러그인 사용으로 인해
        new this.$_Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: this.propsdata // 데이터 연결
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}
</script>

<style>

</style>