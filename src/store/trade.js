import {reqAddressInfo,reqGetOrderInfo} from "../api/index"

export default {
    namespaced:true,
    state:{
        addressInfo:[],
        orderInfo:{}
    },
    actions:{
        //获取用户地址
        async getUserAddress({commit}){
            let result = await reqAddressInfo();

            if(result.data.code == "200"){
                commit("GETUSERADDRESS",result.data.data)
                return "OK"
            }else{
                return Promise.reject(new Error("faile"));
            }
        },
        //获取用户订单信息
        async getOrderInfo({commit}){
            let result = await reqGetOrderInfo();
            if(result.data.code == "200"){
                
                commit("GETORDERINFO",result.data.data);
                return "OK"
            }else{
                return Promise.reject(new Error("faile"));
            }
        }
    },
    mutations:{
        GETUSERADDRESS(state,address){
            state.addressInfo  = address;
        },
        //获取用户订单信息
        GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo;
        }
    }
}