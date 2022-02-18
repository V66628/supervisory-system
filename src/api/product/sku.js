import request from '@/utils/request'
//获取图片列表
export const reqSpuImageList=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})
//获取销售属性
export const reqSpuAttrSaleList=(spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})
//获取平台属性
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`})
//保存sku
export const reqSaveSkuInfo=(skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})
//查看sku
export const reqShowSkuInfo=(spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
//获取sku列表
export const reqShowSkuList=(page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})
//上架
export const  reqOnSale=(skuId)=>request({url:`/admin/product/onSale/${skuId}`,method:'get'})
//下架
export const  reqCancelSale=(skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})
//查看sku详情
export const reqShowSku=(skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})