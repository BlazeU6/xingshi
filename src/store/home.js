import {reqCategoryList,reqListContainer,reqFloorList} from "../api/index"

export default {
    namespaced:true,
    state:{
        categoryList:[],
        bannerList:[],
        floorList:[]
    },
    actions:{
        async getCategoryList(context){
            let result =  await reqCategoryList();
            if(result.status == 200) context.commit("GETCATEGORYLIST",result.data)
        },
        //获取banner
        async getBannerList({commit}){
            let result = await reqListContainer()
            if(result.status == 200) commit("GETBANNERLIST",result.data.data);
        },
        //获取floor
        async getFloorList({commit}){
            let result = await reqFloorList()
            if(result.status == 200) commit("GETFLOORLIST",result.data.data)
        }
    },
    mutations:{ 
        GETCATEGORYLIST(state,value){
            state.categoryList = value.data;
        },
        GETBANNERLIST(state,value){
            state.bannerList = value;
        },
        GETFLOORLIST(state,value){
            state.floorList = value;
        }
    },
}