<template>
  <div class="observe">
        <el-row :gutter="10">
        <el-col :span="12">
            <Search></Search>
        </el-col>
        <el-col :span="12">
            <Sale></Sale>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './search'
import Sale from './sale'
export default {
name:'Observe',
components:{
    Search,
    Sale
}
}
</script>

<style>
.observe{
    margin-top: 20px;
}
</style>