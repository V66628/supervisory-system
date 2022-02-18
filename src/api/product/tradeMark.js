import request from '@/utils/request'
export const  reqTradeMarkList=(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
//新增或修改品牌
export const  reqAddOrUpdateTradeMark=(tradeMark)=>{
            if(tradeMark.id){
                return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
            }else{
                return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
            }
}
//删除品牌名称
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})