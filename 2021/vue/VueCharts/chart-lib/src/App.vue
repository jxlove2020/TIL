<template>
  <div>
    <h1>Chart.js</h1>
    
    <h3>BarChart</h3>
    <bar-chart></bar-chart>

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
}
</script>

<style>

</style>