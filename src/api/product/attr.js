import  request from '@/utils/request'
export const reqCategory1Id=()=>request({url:'/admin/product/getCategory1',method:'get'})
export const reqCategory2Id=(category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})
export const reqCategory3Id=(category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})
//根据一级id，二级id，三级id获取商品列表
export const reqAttrList=({category1Id,category2Id,category3Id})=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
//添加属性的接口
export const reqAddOrUpdateAttr=(data)=>request({url:'/admin/product/saveAttrInfo',method:'post',data})