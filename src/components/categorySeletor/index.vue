<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" :model="tmform">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择" v-model='tmform.category1Id' @change='sendCategorylist2' :disabled='show'>
          <el-option :label="brand.name" :value="brand.id" v-for="brand in list1" :key='brand.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择"   v-model='tmform.category2Id' @change='sendCategorylist3'  :disabled='show'>
          <el-option :label="brand.name" :value="brand.id" v-for="brand in list2" :key='brand.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择"  v-model='tmform.category3Id'  @change='getCategorylist3'  :disabled='show'>
          <el-option :label="brand.name" :value="brand.id" v-for="brand in list3" :key='brand.id'></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySeletor",
       data(){
        return {
          //一级列表数据
          list1:[],
          //二级列表数据
          list2:[],
          //三级列表数据
          list3:[],
          tmform:{
              category1Id:'',
              category2Id:'',
              category3Id:'',
          }
        }
      },
      props:['show'],
      mounted(){
        this.getCategory1Id()

      },
      methods:{
      async  getCategory1Id(){
          const result=await this.$API.attr.reqCategory1Id()
          if(result.code==200){
            this.list1=result.data
          }
        },
        //当选中一级分类后
      async  sendCategorylist2(){
          this.tmform.category2Id=''
          this.tmform.category3Id=''
           const result=await this.$API.attr.reqCategory2Id(this.tmform.category1Id)
           if(result.code==200){
                this.list2=result.data
           }
        },
        async sendCategorylist3(){
            this.tmform.category3Id=''
            const result=await this.$API.attr.reqCategory3Id(this.tmform.category2Id)
            if(result.code==200){
                this.list3=result.data   
           }
        },
        async getCategorylist3(){
                this.$emit('getCategoryId',this.tmform)
        }
      }
};
</script>

<style>
</style>