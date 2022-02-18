import request from '@/utils/request'
export const reqSpu=(page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})
//获取spu信息
export const reqSpuInfo=(spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})
//获取品牌信息
export const reqTradeMarkList=()=>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})
//获取spu图标接口
export const reqImageList=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})
//获取平台全部销售属性
export const reqSaleAttrList=()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})
//添加与修改spu信息
export const reqAddOrUpdateSpuInfo=(spuInfo)=>{
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}
//删除spu
export const reqDeleteSpu=(spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})
