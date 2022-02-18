<template>
  <div>
      <el-table
        :data="records"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="width">
        </el-table-column>
        <el-table-column
          prop="skuName"
          label="名称"
          width="80">
        </el-table-column>
        <el-table-column
          prop="skuDesc"
          label="描述"
          width="width">
        </el-table-column>
        <el-table-column
          label="默认图片"
          width="120">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px">
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="90">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="90">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          width="width">
          <template slot-scope="{row}">
                <el-button type="info" size="mini" icon="el-icon-bottom" v-if="row.isSale==0" @click="onSale(row)"></el-button>
                <el-button type="success" size="mini" icon="el-icon-top" v-else @click="cancelSale(row)"></el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button type="info" icon="el-icon-info" size="mini" @click="showSku(row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器   @size-change="handleSizeChange"
          @current-change="handleCurrentChange"-->
          <el-pagination
          style="textAlign:center"
          @current-change="getSkuList"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev,pager,next,jumper,->,total,sizes"
          :total="total">
    </el-pagination>
    <el-drawer
        :visible.sync="drawer"
        :show-close='false'
        size='50%'
    >
        <el-row>
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{skuInfo.skuName}}</el-col>
      </el-row>
        <el-row>
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{skuInfo.skuDesc}}</el-col>
      </el-row>
        <el-row>
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{skuInfo.price}}元</el-col>
      </el-row>
        <el-row>
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
                <el-tag type="success" v-for='attr in skuInfo.skuAttrValueList' :key='attr.id' style="margin:0px 10px 10px 10px">{{attr.id}}-{{attr.valueId}}</el-tag>
          </el-col>
      </el-row>
        <el-row>
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
             <el-carousel trigger="click" height="400px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" alt="" style="width:100%">
                </el-carousel-item>
              </el-carousel>
        </el-col>
      </el-row>
      </el-drawer>
  </div>
</template>

<script>
export default {
        name:'Sku',
        data(){
          return {
              page:1,
              limit:5,
              records:[],
              total:0,
              drawer:false,
              skuInfo:{}
          }
        },
        mounted(){
            this.getSkuList()
        },
        methods:{
            async  getSkuList(pages=1){
            this.page=pages
          const {page,limit}=this
              const result =await this.$API.sku.reqShowSkuList(page,limit)
                  if(result.code==200){
                    this.records=result.data.records
                    this.total=result.data.total
                  }
            },
            //分页器一页数量的改变
            handleSizeChange(num){
              this.limit=num
              this.getSkuList(this.page)
            },
            //上架
         async  onSale(row){
            const result=await this.$API.sku.reqOnSale(row.id)
            if(result.code==200){
              row.isSale=1
              this.$message({
                type:'success',
                message:'上架成功'
              })
            }
            },
            async cancelSale(row){
                const result=await this.$API.sku.reqCancelSale(row.id)
            if(result.code==200){
              row.isSale=0
              this.$message({
                type:'success',
                message:'下架成功'
              })
            }
            },
            async showSku(row){
                const result =await this.$API.sku.reqShowSku(row.id)
                console.log(result)
                if(result.code==200){
                  this.skuInfo=result.data
                  this.drawer=true
                }
            }
        }
}
</script>

<style scoped>
.el-row{
  margin: 20px 0px;
}
  .el-row .el-col-6{
    text-align: right;
    font-size: 18px;
    padding-right: 10px;
  }
</style>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>