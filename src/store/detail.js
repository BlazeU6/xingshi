import {reqGoodInfo,reqShopCart} from "./../api/index"
//封装的游客临时身份模块 ---- 生成一个随机字符串，且不会再变
import {getUUID} from "./../utils/uuid_token"
export default {
    namespaced:true,
    state:{
        goodInfo:{},
        //游客临时身份
        uuid_token:getUUID()
    },
    actions:{
        async getGoodInfo({commit},skuid){
            let result = await reqGoodInfo(skuid);
            if(result.status == 200){
                commit("GETGOODINFO",result.data.data)
            }
        },
        async updateShopCart({commit},{skuId,skuNum}){
            let result = await reqShopCart(skuId,skuNum);
            if(result.data.code == '200'){
                return "OK"
            }else{
                return Promise.reject(new Error('错误！'));
            }
        }
    },
    mutations:{
        GETGOODINFO(state,value){
            state.goodInfo = value;
        }
    },
    getters:{
        categoryView(state){
            return state.goodInfo.categoryView || {}
        },
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        }
    }
}