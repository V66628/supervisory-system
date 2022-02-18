<template>
  <div ref="line" class="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "LineCharts",
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
          type: "line",
          data: [10, 40, 10,70,10, 40],
          lineStyle: {
            color: "#B496E4",
          },
          itemStyle: {
            opacity: 0,
          },
          areaStyle:{
              color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#B496E4", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          }
        },
      ],
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