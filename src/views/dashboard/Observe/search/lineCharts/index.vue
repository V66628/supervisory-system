<template>
<div>
  <div class="header">
    <span>搜索用户数</span>
    <i class="el-icon-info"></i>
</div>
<div class="center">
  <span>12321</span>
  <span>
    17.1
<svg t="1644724235440" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3268" width="12" height="12"><path d="M512 6.4C505.6 0 492.8 0 480 0s-25.6 0-32 6.4c-12.8 6.4-19.2 19.2-25.6 25.6L6.4 761.6c-12.8 19.2-12.8 44.8 0 64 6.4 12.8 12.8 12.8 25.6 19.2s19.2 6.4 32 6.4h819.2c12.8 0 25.6 0 32-6.4 12.8-6.4 19.2-12.8 25.6-19.2 12.8-19.2 12.8-44.8 0-64L537.6 32C531.2 25.6 524.8 12.8 512 6.4z" fill="#d81e06" p-id="3269"></path></svg>
  </span>
</div>
  <div ref="line" class="charts"></div>
</div>
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
          data: [50, 30,40,10,60,50],
          lineStyle: {
            color: "#72A7F9",
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
                  color: "#72A7F9", // 0% 处的颜色
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
  height: 200px;
  margin-bottom: -40px;
}
.header{
  color: rgb(151, 150, 150);
}
.center{
  padding-top: 30px;
  font-size: 24px;
  margin-bottom: -40px;
}
</style>