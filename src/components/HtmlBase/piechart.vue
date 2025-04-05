<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  components: { Pie },
  props: ['chartData'],
  data() {
    return {
      chartOptions: {
        rotation: 0,
        plugins: { legend: { display: false } }
      }
    }
  }
}
</script>