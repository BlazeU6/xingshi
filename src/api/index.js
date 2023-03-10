import requests from "./request"
import requestsMock from "./requestMock"

//三级菜单
export const reqCategoryList = function(){
    return requests({
        url:"/api/product/getBaseCategoryList",
        method:'get'
    })
}
//轮播图
export const reqListContainer = function(){
    return requestsMock({
        url:"/banner",
        method:'get'
    })
}
//获取floor中的数据
export const reqFloorList = function(){
    return requestsMock({
        url:"/floor",
        method:'get'
    })
}
//获取搜索模块的数据  post请求
export const reqGetSearchInfo = function(params){
    return requests({
        url:"/api/list",
        method:"post",
        data:params
    })
}
//获取商品详情的数据
export const reqGoodInfo = function(skuid){
    return requests({
        url:`/api/item/${skuid}`,
        method:"get"
    })
}
//将订单信息发送给服务器
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqShopCart = function(skuId,skuNum){
    return requests({
        url:`/api/cart/addToCart/${skuId}/${skuNum}`,
        method:"post"
    })
}

//请求服务区获取个人购物车列表数据
export const reqShopCartList = function(){
    return requests({
        url:"/api/cart/cartList",
        method:"get"
    })
}

//删除购物车产品
export const reqDeleteCartById = function(skuId){
    return requests({
        url:`/api/cart/deleteCart/${skuId}`,
        method:"delete"
    })
}

//修改购物车中商品是否选中
export const reqCheckedCartById = function(skuID,isChecked){
    return requests({
        url:`/api/cart/checkCart/${skuID}/${isChecked}`,
        method:"get"
    })
}

//获取验证码
export const reqGetCode = function(phone){
    return requests({
        url:`/api/user/passport/sendCode/${phone}`,
        method:"get"
    })
}

//注册发请求
export const reqUserRegister = function(data){
    return requests({
        url:`/api/user/passport/register`,
        method:"post",
        data
    })
}

//用户登录
export const reqUserLogin = function(data){
    return requests({
        url:"/api/user/passport/login",
        method:"post",
        data
    })
}

//获取用户信息
export const reqGetUserInfo  = function(){
    return requests({
        url:"/api/user/passport/auth/getUserInfo",
        method:"get",
    })
}

//退出登录
export const reqLoginOut = function(){
    return requests({
        url:"/api/user/passport/logout",
        method:"get"
    })
}

//获取用户地址信息
export const reqAddressInfo = function(){
    return requests({
        url:"/api/user/userAddress/auth/findUserAddressList",
        method:"get"
    })
}

//获取订单交易页信息
export const reqGetOrderInfo = function(){
    return requests({
        url:"/api/order/auth/trade",
        method:"get"
    })
}

//提交订单的接口
export const reqPostOrderInfo = function(tradeNo,data){
    return requests({
        url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:"post",
        data
    })
}

//获取订单支付信息
export const reqPayInfo = function(orderId){
    return requests({
        url:`/api/payment/weixin/createNative/${orderId}`,
        methos:"get"
    })
}

//查询订单支付情况
export const reqPayStatus = function(orderId){
    return requests({
        url:`/api/payment/weixin/queryPayStatus/${orderId}`,
        method:"get"
    })
}

//获取订单列表
export const reqMyOrderList = function(page,limit){
    return requests({
        url:`/api/order/auth/${page}/${limit}`,
        method:"get"
    })
}