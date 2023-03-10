import {reqGetSearchInfo} from "../api/index"

export default {
    namespaced:true,
    state:{
        searchList:{}
    },
    actions:{
        async getSearchList({commit},params={}){
            //当前这个reqGetSearchInfo这个函数在调用服务器数据的时候，至少传递一个参数（一个空对象）
            //params是用户派发actions时，第二个参数传递过来的,至少是一个空对象
            let result = await reqGetSearchInfo(params);
            if(result.status == 200) commit("GETSEARCHLIST",result.data.data);
        }
    },
    mutations:{
        GETSEARCHLIST(state,value){
            state.searchList = value
        }
    },
    getters:{
        goodsList(state){
            //这里要注意，如果网络出问题的话，没有收到服务器传来的searchList，那么goodsList就是undefined
            return state.searchList.goodsList || []
        },
        trademarkList(state){
            return state.searchList.trademarkList || []
        },
        attrsList(state){
            return state.searchList.attrsList || []
        }
    }
}