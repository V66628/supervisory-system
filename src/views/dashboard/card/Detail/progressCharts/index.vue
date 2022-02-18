<template>
  <div ref="line" class="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "ProgressCharts",
  mounted() {
    const myecharts = echarts.init(this.$refs.line);
    myecharts.setOption({
      xAxis: {
        show: false,
        min:0,
        max:100
      },
      yAxis: {
        show: false,
         type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
        color:'#96BE2F',
        barWidth:'10',
        label:{
            show:true,
            formatter:'|',
            position:'right'
        },
        showBackground:true,
        backgroundStyle:{
            color:'#eee'
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