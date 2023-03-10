//登录与注册
import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLoginOut} from "../api/index"
export default {
    namespaced:true,
    state:{
        code:"",
        token:localStorage.getItem("TOKEN"),
        userInfo:{}
    },
    actions:{
        async getCode({commit},phone){
            let result = await reqGetCode(phone);
            
            if(result.data.code == "200"){
                commit("GETCODE",result.data.data)
            }else{
                return Promise.reject(new Error("faile"));
            }
        },
        //用户注册
        async userRegister({commit},user){
            let result = await reqUserRegister(user);
            if(result.data.code == "200"){
                return "OK"
            }else{
                return Promise.reject(new Error("faile"));
            }
        },
        //用户登录
        async userLogin({commit},data){
            let result  = await reqUserLogin(data);
            if(result.data.code == "200"){
                commit("USERLOGIN",result.data.data.token);
                localStorage.setItem("TOKEN",result.data.data.token);
                return "OK"
            }else{
                return Promise.reject(new Error("faile"))
            }
        },
        //获取用户信息---登录的时候用
        async getUserInfo({commit}){
            let result = await reqGetUserInfo();
            if(result.data.code == "200"){
                commit("GETUSERINFO",result.data.data);//会返回一个userInfo
                return "OK"
            }else{
                return Promise.reject(new Error("faile"));
            }
        },
        //退出登录
        async loginOut({commit}){
            let result = await reqLoginOut();
            if(result.data.code == "200"){
                commit("LOGINOUT")
                return "OK"
            }else{
                return Promise.reject(new Error("faile"));
            }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code = code;
        },
        //登录业务
        USERLOGIN(state,token){
            state.token = token;
        },
        //获取用户信息
        GETUSERINFO(state,userInfo){
            state.userInfo = userInfo;
        },
        //退出登录 --- 清空本地存储的信息
        LOGINOUT(state){
            state.userInfo =  {};
            localStorage.removeItem("TOKEN");
        }
    }
}