<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">{{spuName}}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"  v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" type="textarea" rows="4"  v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
            <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndAttrValueId">
              <el-option :label="attrValue.valueName" :value="{attrId:attr.id,valueId:attrValue.id}" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item  label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuAttrSaleList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndSaleAttrValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="{saleAttrId:saleAttr.id,saleAttrValueId:saleAttrValue.id}" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key='saleAttrValue.id'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList"  @selection-change="handleSelectionChange">>
          <el-table-column type="selection" align="center" width="55">
          </el-table-column>
          <el-table-column  label="图片" width="width">
            <template slot-scope="{row}">
                <img :src="row.imgUrl" alt="" style="width:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column  label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault==0" @click="onlySelete(row)">设置为默认</el-button>
              <el-button type="success" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      //图片列表
      spuImageList: [],
      //销售属性
      spuAttrSaleList: [],
      //平台属性
      attrInfoList: [],
      //收集图片
      imageList:[],
      spuName:'',
      //skuInfo属性
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        price:'',
        skuDesc: "",
        skuDefaultImg: "",
        skuName: "",
        weight: "",
        skuAttrValueList: [],      
        skuImageList: [],
        skuSaleAttrValueList: [], 
      },
    };
  },
  methods: {
    async getdata(category1Id, category2Id, spu) {
      this.spuName=spu.spuName
      this.skuInfo.spuId=spu.id
      this.skuInfo.tmId=spu.tmId
      this.skuInfo.category3Id=spu.category3Id
      //获取图片列表
      const imageList = await this.$API.sku.reqSpuImageList(spu.id);
      if (imageList.code == 200) {
        const spuImageList = imageList.data;
          spuImageList.forEach(item => {
              item.isDefault=0
          });
        this.spuImageList=spuImageList
      }
      //销售属性
      const saleList = await this.$API.sku.reqSpuAttrSaleList(spu.id);
      if (saleList.code == 200) {
        this.spuAttrSaleList = saleList.data;
      }
      //平台属性
      const attrList = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (attrList.code == 200) {
        this.AttrInfoList = attrList.data;
      }
    },
    onlySelete(row){
      //排它操作
      this.spuImageList.forEach(item=>{
        item.isDefault=0
      })
      row.isDefault=1
      this.skuInfo.skuDefaultImg=row.imgUrl
    },
    handleSelectionChange(data){
      this.imageList=data
      console.log(data)
    },
    //保存按钮的回调
      async   save(){
        //整理平台属性的参数
        const {skuInfo,attrInfoList,spuAttrSaleList,imageList}=this
        skuInfo.skuAttrValueList=attrInfoList.reduce((prev,item)=>{
          if(item.attrIdAndAttrValueId){
              prev.push(item.attrIdAndAttrValueId)
          }
            return prev
        },[])
        //整理销售属性的参数
            skuInfo.skuSaleAttrValueList=spuAttrSaleList.reduce((prev,item)=>{
          if(item.saleAttrIdAndSaleAttrValueId){
              prev.push(item.saleAttrIdAndSaleAttrValueId)
          }
            return prev
        },[])
        //整理图片列表
      skuInfo.skuImageList=imageList.map(item=>{
              return {
                imgName:item.imgName,
                imgUrl: item.imgUrl,
                isDefault:item.isDefault,
                spuImgId:item.id,
              }
        })
        const result=await this.$API.sku.reqSaveSkuInfo(skuInfo)
        if(result.code==200){
          this.$emit('changeFlag2',0)
          this.$message({
            type:'success',
            message:'保存成功'
          })
          Object.assign(this._data,this.$options.data())
        }
    },
    //取消按钮的回调
    cancel(){
       this.$emit('changeFlag2',0)
       Object.assign(this._data,this.$options.data())
    }
  },
};
</script>

<style>
</style>