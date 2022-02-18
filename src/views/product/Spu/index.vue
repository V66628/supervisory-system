<template>
  <div>
      <el-card style="margin:20px 0px">
        <CategorySeletor @getCategoryId="getCategoryId" :show='flag!=0'/>
      </el-card>
      <el-card>
        <div v-show="flag==0">
          <!-- spu展示区 -->
          <el-button type="primary" icon="el-icon-plus" :disabled='category3Id==""' @click="addSpu">添加SPU</el-button>
          <el-table
          :data='records'
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="spuName"
              label="spu名称"
              width="width">
            </el-table-column>
            <el-table-column
             prop="description"
              label="spu描述"
              width="width">
            </el-table-column>
            <el-table-column
               prop="prop"
              label="操作"
              width="width">
              <template slot-scope="{row}">
                <el-button type="success" icon="el-icon-plus" size="mini" @click="addSku(row)"></el-button>
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)"></el-button>
                <el-button type="info" icon="el-icon-info" size="mini" @click="showSkuInfo(row)"></el-button>
                <el-popconfirm
                :title="`确认删除${row.spuName}吗？`"
                @onConfirm='deleteSpu(row)'
              >
                 <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference" style="marginLeft:10px"></el-button>
              </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <SpuForm v-show="flag==1" ref="spu" @changeFlag='changeFlag'></SpuForm>
        <SkuForm v-show="flag==2" ref='sku' @changeFlag2='changeFlag2'></SkuForm>
      </el-card>
      <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close='close'>
       <el-table
        v-loading="loading"
        :data='skuList'
         style="width: 100%">
         <el-table-column
           prop="skuName"
           label="名称"
           width="width">
         </el-table-column>
         <el-table-column
           prop="price"
           label="价格"
           width="width">
         </el-table-column>
         <el-table-column
           prop="weight"
           label="重量"
           width="width">
         </el-table-column>
         <el-table-column
           prop="prop"
           label="默认图片"
           width="width">
           <template slot-scope="{row}">
             <img :src="row.skuDefaultImg" alt="" style="width:100px">
           </template>
         </el-table-column>
       </el-table>
      </el-dialog>
       <el-pagination
      style="textAlign:center"
      @current-change='getSpuList'
      @size-change='sizeChange'
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import SkuForm from "@/views/product/Spu/SkuForm"
import SpuForm from "@/views/product/Spu/SpuForm"
export default {
        name:'Spu',
        components:{
            SkuForm,
            SpuForm
        },
        data(){
          return {
              category1Id: "",
              category2Id: "",
              category3Id: "",
              page:1,
              limit:5,
              total:0,
              records:[],
              flag:0,//0表示展示spu列表，1表示展示spufrom，2表示展示skufrom
              spu:{},
              dialogTableVisible:false,
              skuList:[],
              loading:true
          }
        },
        methods:{
           getCategoryId(categoryId) {
            this.category1Id = categoryId.category1Id;
            this.category2Id = categoryId.category2Id;
            this.category3Id = categoryId.category3Id;
              this.getSpuList()
           },
          async  getSpuList(currentPage=1){
             this.page=currentPage
            const {page,limit,category3Id}=this
            const result = await this.$API.spu.reqSpu(page,limit,category3Id);
                  if (result.code == 200) {
                        this.total=result.data.total
                        this.records=result.data.records
                      }
           },
           sizeChange(size){
             this.limit=size
             this.getSpuList()  
           },
           //修改按钮的回调
           updateSpu(row){
             this.flag=1
            this.$refs.spu.initSpuData(row)
           },
           //取消按钮的回调
           changeFlag(num){
              this.flag=num
              this.getSpuList(this.page)
           },
           //添加spu按钮的回调
           addSpu(){
             this.flag=1
             this.$refs.spu.addSpuInfo(this.category3Id)
           },
           //删除spu回调
            async deleteSpu(row){
              const result=await this.$API.spu.reqDeleteSpu(row.id)
              console.log(result)
                  if(result.code==200){
                      this.$message({
                        type:'success',
                        message:'删除成功'
                      })
                      this.getSpuList(this.records.length<1?this.page-1:this.page)
                }
           },
           //添加sku按钮的回调
           addSku(row){
             this.flag=2
             this.$refs.sku.getdata(this.category1Id,this.category2Id,row)
           },
           changeFlag2(num){
             this.flag=num
           },
           //信息按钮的回调
        async  showSkuInfo(row){
             this.spu=row
             this.dialogTableVisible=true
             const result =await  this.$API.sku.reqShowSkuInfo(row.id)
              if(result.code=200){
                this.skuList=result.data
                this.loading=false
              }
           },
           //dialog关闭前的回调
           close(done){
             this.loading=true
             this.skuList=[]
             done()
           }
        }
}
</script>

<style>

</style>