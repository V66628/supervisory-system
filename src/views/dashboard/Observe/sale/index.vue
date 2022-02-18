<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="top">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div ref="pie" class="pie"></div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      radio1: "全部渠道",
    };
  },
  mounted() {
    const myCharts = echarts.init(this.$refs.pie);
    myCharts.setOption({
        title:{
            text:'邮件营销',
            subtext:'1048',
            left:'center',
            top:'center'
        },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: false,
          },
          labelLine:{
              show:true
          },
          data: [
            { value: 1048, name: "邮件营销" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "搜索引擎" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });
  myCharts.on('mouseover',(params)=>{
        const {value,name}=params.data
         myCharts.setOption({
           title:{
                text:name,
            subtext:value,
           }
         })
  });
  },
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pie {
  width: 100%;
  height: 400px;
}
</style>