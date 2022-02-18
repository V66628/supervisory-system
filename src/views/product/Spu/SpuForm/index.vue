<template>
  <div>
    <el-form label-width="80px" :model="spuInfo">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spuInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuInfo.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in  tradeMarkList" :key='tm.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spuInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
        :file-list='spuImageList'
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success='handeSuccess'
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unSelect.name" :value="{id:unSelect.id,name:unSelect.name}" v-for="unSelect in  unSelectAttr" :key='unSelect.id'></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled='!attrIdAndAttrName' @click="addSaleAttr">添加销量属性</el-button>
        <el-table border style="width: 100%" :data='spuInfo.spuSaleAttrList'>
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column   label="属性值名称列表" width="width">
                  <template slot-scope="{row}">
                              <el-tag
                                  :key="tag.id"
                                  v-for="(tag,index) in row.spuSaleAttrValueList"
                                  closable
                                  :disable-transitions="false"
                                  @close="row.spuSaleAttrValueList.splice(index,1)">
                                  {{tag.saleAttrValueName}}
                                </el-tag>
                                <el-input
                                  class="input-new-tag"
                                  v-if="row.inputVisible"
                                  v-model="row.inputValue"
                                  ref="saveTagInput"
                                  size="small"
                                  @blur="showAttrValue(row)"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="addAttrValue(row)">添加</el-button>
                  </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="spuInfo.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSpuInfo">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu基本信息
      spuInfo: {
        category3Id: 0,
        description: "",
        //品牌id
        tmId:'',
        //spu名称
        spuName: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      },
      //品牌列表
      tradeMarkList: [],
      //图片
      spuImageList: [],
      //平台属性
      saleAttrList: [],
      //销售属性id
      attrIdAndAttrName:''
    };
  },
  computed:{
      unSelectAttr(){
        return  this.saleAttrList.filter(item=>{
              return this.spuInfo.spuSaleAttrList.every(item1=>item.name!=item1.saleAttrName)
        })
      }
  },
  methods: {
    handleRemove(file, fileList) {
        this.spuImageList=fileList
    },
    handeSuccess(response, file, fileList){
        this.spuImageList=fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //初始化spu数据
    async initSpuData(row) {
      const spuInfoResult = await this.$API.spu.reqSpuInfo(row.id);
      if (spuInfoResult.code == 200) {
        this.spuInfo = spuInfoResult.data;
      }
      const tradeMarkListResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkListResult.code == 200) {
        this.tradeMarkList = tradeMarkListResult.data;
      }
      const spuImageListResult = await this.$API.spu.reqImageList(row.id);
      if (spuImageListResult.code == 200) {
            const ImageList =spuImageListResult.data
                    ImageList.forEach(item => {
                     item.name=item.imgName
                     item.url=item.imgUrl
                 });
                 this.spuImageList=ImageList
      }
      const saleAttrListResult = await this.$API.spu.reqSaleAttrList();
      if (saleAttrListResult.code == 200) {
        this.saleAttrList = saleAttrListResult.data;
      }
    },
    addSaleAttr(){
        const {id,name}=this.attrIdAndAttrName
        this.spuInfo.spuSaleAttrList.push({
              baseSaleAttrId:id,
               saleAttrName:name,
                spuSaleAttrValueList:[]
        })
              this.attrIdAndAttrName=''
    },
    //添加属性值
    addAttrValue(row){
        //显示input框
        this.$set(row,'inputVisible',true)
        this.$set(row,'inputValue','')
    },
    //input框失去焦点
    showAttrValue(row){
      //判断属性值不能为空
        if(row.inputValue.trim()==''){
          this.$message({
            type:'error',
            message:'属性值不能为空'
          })
           row.inputVisible=false
           return 
        }
        //判断属性值是否重复
        if(!row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=row.inputValue)){
           this.$message({
            type:'error',
            message:'属性值不能重复'
          })
           row.inputVisible=false
           return 
        }
        row.spuSaleAttrValueList.push({
            baseSaleAttrId:row.baseSaleAttrId,
             saleAttrValueName:row.inputValue
        })
          row.inputVisible=false
    },
    //保存spu
 async  saveSpuInfo(){
      this.spuInfo.spuImageList=this.spuImageList.map(item=>{
            return {
                imgName:item.name,
                imgUrl:item.response.data||item.url
            }
          })
          const result =await this.$API.spu.reqAddOrUpdateSpuInfo(this.spuInfo)
          if(result.code==200){
            this.$emit('changeFlag',0)
            this.$message({
              type:'success',
              message:'保存成功'
            })
          }
          Object.assign(this._data,this.$options.data())
    },
    //父组件添加按钮的回调
 async  addSpuInfo(categoryId){
           this.spuInfo.category3Id=categoryId
          //品牌回调
          const tradeMarkListResult = await this.$API.spu.reqTradeMarkList();
            if (tradeMarkListResult.code == 200) {
              this.tradeMarkList = tradeMarkListResult.data;
            }
            //平台属性回调
               const saleAttrListResult = await this.$API.spu.reqSaleAttrList();
              if (saleAttrListResult.code == 200) {
                this.saleAttrList = saleAttrListResult.data;
              }
    },
    //取消按钮的回调
    cancel(){
      this.$emit('changeFlag', 0)
       Object.assign(this._data,this.$options.data())
    }
  },
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>