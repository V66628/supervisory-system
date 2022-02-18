<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="search-top">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row :gutter="10">
        <el-col :span="12">
            <LineCharts></LineCharts>
        </el-col>
        <el-col :span="12">
             <LineCharts></LineCharts>
        </el-col>
    </el-row>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      type="index"
      label="排名"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="搜索关键字"
      sortable
      width="width">
    </el-table-column>
    <el-table-column
      prop="address"
      label="用户数"
         sortable
     >
    </el-table-column>
    <el-table-column
      prop="address"
      label="周涨幅"
         sortable
    >
    </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
import LineCharts from './lineCharts'
export default {
  name: "Search",
  components:{
      LineCharts
  }
};
</script>

<style scoped>
.search-top {
  display: flex;
  justify-content: space-between;
}

</style>