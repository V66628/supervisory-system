<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" @tab-click="handleClick"  class="left">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <el-date-picker
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
            <div ref="left" class="col-left"></div>
        </el-col>
        <el-col :span="6" class="col-right">
            <h3>门店{{title}}排名</h3>
            <ul>
                <li>
                    <span class="index">1</span>
                    <span class="name">肯德基</span>
                    <span>752,583</span>
                </li>
                <li>
                    <span class="index">2</span>
                    <span class="name">麦当劳</span>
                    <span>723,785</span>
                </li>
                <li>
                    <span class="index">3</span>
                    <span class="name">华莱士</span>
                    <span>628,755</span>
                </li>
                <li>
                    <span class='index2'>4</span>
                    <span class="name">海底捞</span>
                    <span>451,456</span>
                </li>
                <li>
                    <span class='index2'>5</span>
                    <span class="name">西贝面村</span>
                    <span>353,854</span>
                </li>
                <li>
                    <span class='index2'>6</span>
                    <span class="name">汉堡王</span>
                    <span>352,284</span>
                </li>
                <li>
                    <span class='index2'>7</span>
                    <span class="name">真功夫</span>
                    <span>325,758</span>
                </li>
            </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Sale",
  data(){
    return {
      activeName: "销售额",
    };
  },
  computed:{
      title(){
          return this.activeName=='销售额'?'销售额':'访问量'
      }
  },
  mounted() {
    this.getBar1()
  },
  methods:{
    getBar1(){
    const myCharts = echarts.init(this.$refs.left);
    myCharts.setOption({
        title:{
            text:this.activeName
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月","十月","十一月","十二月"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,80,360,210,344,40],
          color:'#5172CA'
        },
      ],
    });
    },
    handleClick(){
        this.getBar1()
    }
  }
};
</script>

<style scoped lang='css'>
.box-card {
  margin-top: 20px;
}
>>> .el-card__header {
  border-bottom: 0px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.left {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0px 20px;
}
.date {
  width: 200px;
}
.col-left{
    width: 100%;
    height: 400px;
}
.col-right{
    margin-top: 20px;
}
ul li{
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
li .name{
    margin-left: -100px;
}
li .index{
    background-color: black;
    color: aliceblue;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
}
li .index2{
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
}
</style>