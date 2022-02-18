<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySeletor @getCategoryId="getCategoryId" :show='!isShowTable'/>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!Boolean(category3Id)"
           @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="180">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
              style="margin:0px 10px"
                type="success"
                v-for="v in row.attrValueList"
                :key="v.id"
                >{{ v.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button type="warning" icon="el-icon-edit"  @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性或修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline='true' class="demo-form-inline"  label-width="80px">
          <el-form-item label="属性名" >
            <el-input  placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
              <el-button type="primary" icon='el-icon-plus' :disabled='!attrInfo.attrName' @click="addAttrValue">添加属性值</el-button>
              <el-button>取消</el-button>
            <el-table
              :data='attrInfo.attrValueList'
              border
              style="width:100%;margin:20px 0px">
              <el-table-column
                type="index"
                label="序号"
                width="80">
              </el-table-column>
              <el-table-column
                 prop='prop'
                label="属性值名称"
                width="width">
                <template slot-scope="{row,$index}">
                  <el-input :ref='$index' v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row,$index)" @keyup.native.enter="toLook(row)"></el-input>
                  <span @click="toEmit(row,$index)" v-else>{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                 prop='prop'
                label="操作"
                width="width">
                <template slot-scope="{row,$index}">
                      <el-popconfirm
                       @onConfirm='deleteAttrValue($index)'
                            :title='`确定要删除${row.valueName}吗？`'
                            >
                        <el-button type="danger" icon="el-icon-delete" size="mini"  slot="reference"></el-button>
                     </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="saveProperty" :disabled='attrInfo.attrValueList.length<1'>保存</el-button>
            <el-button @click=" isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      attrList: [],
      category1Id: "",
      category2Id: "",
      category3Id: "",
      isShowTable: true,
      //收集新增属性或修改属性使用
      attrInfo:{
        attrName:'',
        attrValueList:[],
        categoryId:0,
        categoryLevel:3
      }
    };
  },
  methods: {
    async getCategoryId(categoryId) {
      this.category1Id = categoryId.category1Id;
      this.category2Id = categoryId.category2Id;
      this.category3Id = categoryId.category3Id;
      const result = await this.$API.attr.reqAttrList(categoryId);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    addAttrValue(){
      this.attrInfo.attrValueList.push({ attrId:this.attrInfo.id, valueName:'',flag:true})
         this.$nextTick(()=>{
           this.$refs[this.attrInfo.attrValueList.length-1].focus()
         })
    },
    //添加属性按钮的回调
    addAttr(){
       this.isShowTable=false
       this.attrInfo={
             attrName:'',
            attrValueList:[],
            categoryId:this.category3Id,
            categoryLevel:3
       }
    },
    //修改属性按钮的回调
    updateAttr(row){
          this.isShowTable=false
          this.attrInfo=cloneDeep(row)
          this.attrInfo.attrValueList.forEach(item=>{
              this.$set(item,'flag',false)
          })
    },
    //编辑模式切换查看模式
    toLook(row,index){
      if(row.valueName.trim()==''){
        this.$message({
          type:'warning',
          message:'请输入正确的属性值'
        })
        this.attrInfo.attrValueList.splice(index,1)
        return  false
      }
      //处理属性值重复
      const isrepeat=this.attrInfo.attrValueList.some(item=>{
            if(row!=item){
                return   row.valueName==item.valueName
            }
      })
      if(isrepeat){
          this.$message({
          type:'warning',
          message:'属性值有重复'
        })
          this.attrInfo.attrValueList.splice(index,1)
        return false
      }
      row.flag=false
    },
    //查看模式切换编辑模式
    toEmit(row,index){
         row.flag=true
         this.$nextTick(()=>{
           this.$refs[index].focus()
         })
    },
    //删除属性值操作
    deleteAttrValue(index){
        this.attrInfo.attrValueList.splice(index,1)
    },
    //保存按钮的保存属性
  async  saveProperty(){
     this.attrInfo.attrValueList=this.attrInfo.attrValueList.filter(item=>{
       if(item.valueName!=''){
            delete item.flag
            return true
       }
     })
           try {
                  const result=await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
                  if(result.code==200){
                    this.$message({
                      type:'success',
                      message:'保存成功'
                    }),
                    this.getCategoryId({category1Id:this.category1Id,category2Id:this.category2Id,category3Id:this.category3Id})
                    this.isShowTable=true
                  }
           } catch (error) {

           }
    },
  },
};
</script>

<style>
</style>