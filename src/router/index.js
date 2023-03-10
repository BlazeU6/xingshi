import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import store  from "../store/index"



Vue.use(VueRouter);

//解决重复点击导航时，控制台报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

let router = new VueRouter({
    routes,
    //vue-router中的滚动行为
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {y:0}
    }
})
//全局前置守卫
router.beforeEach(async (to,from,next)=>{
    
    let token = store.state.user.token;
    let userInfoName = store.state.user.userInfo.name;
    if(token){//已经登录
        if(to.path == "/login"  || to.path == "/register"){//登录了想去登录页 或者 注册页
            next("/home");
        }else{//不去登录页 或者 注册页
            if(userInfoName){//如果有用户信息就放行
                next();
            }else{//登录了但没有用户信息
                try {
                    await store.dispatch("user/getUserInfo");//再次获取用户信息
                    next()
                } catch (error) {//获取不到用户信息，说明token过期了
                    //要清除token ---> 退出登录
                    await store.dispatch("user/loginOut");
                    next("/login")
                }
            }
        }
    }else{//未登录-- 不能去交易、支付、个人中心相关的
        if(to.path.indexOf("/trade") !=-1  || to.path.indexOf("/pay") != -1 || to.path.indexOf("/center") !=-1){
            next("/login?redirect=" + to.path);//不能登录了然后就直接跳到首页
        }else{
            next();
        }
    }
}
)
export default router;