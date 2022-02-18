<template>
   <el-row :gutter="20">
  <el-col :span="6">
    <el-card>
          <Detail content="￥126560" title='总销售额'>
                <template slot="echart" >
                      <div style="padding-top:20px">
                        <span>周同比&nbsp;&nbsp;56.67% <svg t="1644724235440" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3268" width="12" height="12"><path d="M512 6.4C505.6 0 492.8 0 480 0s-25.6 0-32 6.4c-12.8 6.4-19.2 19.2-25.6 25.6L6.4 761.6c-12.8 19.2-12.8 44.8 0 64 6.4 12.8 12.8 12.8 25.6 19.2s19.2 6.4 32 6.4h819.2c12.8 0 25.6 0 32-6.4 12.8-6.4 19.2-12.8 25.6-19.2 12.8-19.2 12.8-44.8 0-64L537.6 32C531.2 25.6 524.8 12.8 512 6.4z" fill="#d81e06" p-id="3269"></path></svg></span>
                        <span>日同比&nbsp;&nbsp; 19.16% <svg t="1644724419345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3562" width="12" height="12"><path d="M535.466667 812.8l450.133333-563.2c14.933333-19.2 2.133333-49.066667-23.466667-49.066667H61.866667c-25.6 0-38.4 29.866667-23.466667 49.066667l450.133333 563.2c12.8 14.933333 34.133333 14.933333 46.933334 0z" p-id="3563" fill="#1afa29"></path></svg></span>
                      </div>
                </template>
                <template slot="footer">
                    <span>日销售额￥ 12423</span>
                </template>
      </Detail>
    </el-card>
    </el-col>
  <el-col :span="6">
     <el-card>
         <Detail content="88460" title='访问量'>
             <template slot="echart">
                 <LineCharts></LineCharts>
             </template>
             <template slot="footer">
                    <span>日访问量1234</span>
                </template>
      </Detail>
     </el-card>
      </el-col>
  <el-col :span="6">
<el-card>
          <Detail content='88460' title='支付笔数'>
                <template slot="echart">
                 <BarCharts></BarCharts>
             </template>
             <template slot="footer">
                    <span>转化率65%</span>
                </template>
      </Detail>
</el-card>
      </el-col>
  <el-col :span="6">
   <el-card>
          <Detail content='78%' title='运营活动效果'>
                 <template slot="echart">
                  <ProgressCharts/>
             </template>
             <template slot="footer">
                     <span>周同比&nbsp;&nbsp;56.67% <svg t="1644724235440" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3268" width="12" height="12"><path d="M512 6.4C505.6 0 492.8 0 480 0s-25.6 0-32 6.4c-12.8 6.4-19.2 19.2-25.6 25.6L6.4 761.6c-12.8 19.2-12.8 44.8 0 64 6.4 12.8 12.8 12.8 25.6 19.2s19.2 6.4 32 6.4h819.2c12.8 0 25.6 0 32-6.4 12.8-6.4 19.2-12.8 25.6-19.2 12.8-19.2 12.8-44.8 0-64L537.6 32C531.2 25.6 524.8 12.8 512 6.4z" fill="#d81e06" p-id="3269"></path></svg></span>
                    <span>日同比&nbsp;&nbsp; 19.16% <svg t="1644724419345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3562" width="12" height="12"><path d="M535.466667 812.8l450.133333-563.2c14.933333-19.2 2.133333-49.066667-23.466667-49.066667H61.866667c-25.6 0-38.4 29.866667-23.466667 49.066667l450.133333 563.2c12.8 14.933333 34.133333 14.933333 46.933334 0z" p-id="3563" fill="#1afa29"></path></svg></span>
                </template>
      </Detail>
   </el-card>
      </el-col>
</el-row>
</template>

<script>
import Detail from './Detail'
import LineCharts from './Detail/LineCharts'
import BarCharts from './Detail/BarCharts'
import ProgressCharts from './Detail/progressCharts'
export default {
name:'Card',
components:{
    Detail,
    LineCharts,
    BarCharts,
     ProgressCharts
}
}
</script>

<style>

</style>