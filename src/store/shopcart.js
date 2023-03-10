import {reqShopCartList,reqDeleteCartById,reqCheckedCartById} from "./../api/index"
export default {
    namespaced:true,
    state:{
        cartList:[]
    },
    actions: {
        async getCartList({commit}){
            let result = await reqShopCartList();
            
            if(result.status == 200) commit("GETCARTLIST",result.data)
        },
        async deleteCart({commit},skuId){
            let result = await reqDeleteCartById(skuId);
            if(result.data.code == 200){
                return "OK"
            }else{
                return Promise.reject(new Error("faile"))
            }
        },
        //修改购物车商品选中状态
        async updateCheckedById({commit},{skuId,isChecked}){
            let result = await reqCheckedCartById(skuId,isChecked);
            if(result.data.code == 200){
                return "OK"
            }else{
                return Promise.reject(new Error("faile"))
            }
        },
        //删除所有选中的商品
        deleteAllChecked(context){
            let promiseAll =[]
            //再派发单个deleteCart的actions
            context.state.cartList.forEach(item => {
                let promise = item.isChecked == '1' ? context.dispatch("deleteCart",item.skuId)  : "";
                //将每一次返回的promise都添加到数组中
                promiseAll.push(promise)
            })
            //只要有一个失败，返回结果即为失败
            return Promise.all(promiseAll)
        },
        //通过全选按钮修改所有产品的状态
        updateAllCartChecked(context,isChecked){
            let promiseAll = [];
            context.state.cartList.forEach(item => {
                let promise = context.dispatch("updateCheckedById",{skuId:item.skuId,isChecked});
                promiseAll.push(promise);
            });
            return Promise.all(promiseAll);
        }
    },
    mutations:{
        GETCARTLIST(state,value){
            if(value.data.length != 0){
                state.cartList = value.data[0].cartInfoList;
            }
        }
    },
    
} 