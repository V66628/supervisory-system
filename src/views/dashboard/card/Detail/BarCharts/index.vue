<template>
  <div ref="line" class="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "BarCharts",
  mounted() {
    const myecharts = echarts.init(this.$refs.line);
    myecharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [10, 40, 10,70,10, 40],
          color:'rgb(114, 139, 201)',
        }
      ],
    tooltip:{},
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>