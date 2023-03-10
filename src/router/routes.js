// import Home from "../pages/Home"
import Search from "../pages/Search"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Detail from ".././components/Detail"
import AddCartSuccess from "./../pages/AddCartSuccess"
import ShopCart from "./../pages/ShopCart"
import Trade from "./../pages/Trade"
import Pay from "./../pages/Pay"
import Paysuccess from "./../pages/PaySuccess"
import Center from "./../pages/Center"
import MyOrder from "./../pages/Center/myOrder"
import GroupOrder from "./../pages/Center/groupOrder"



export default [
    {
        //重定向，在项目跑起来的时候，访问/，可以让它定向到首页 
        path:"/",
        redirect:"/home", 
    },
    {
        name:"home",
        path:"/home",
        component:() => import("./../pages/Home"),//路由懒加载
        //当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
        //如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
        meta:{showFooter:true}
    },
    {
        name:"login",
        path:"/login",
        component:Login
    },
    {
        name:"search",
        path:"/search/:keyword?",//使用占位符声明接收params参数
        //这里的？是设置了params参数可传可不传，如果不加的话本来就是要求得传params（因为有占位符)，不传参的话会导致URL有问题
        component:Search,
        meta:{showFooter:true},
        //配置props
        props($route){
            //利用props进行组件间传参
            return {
                k:$route.params.keyword
            }
        }
    },
    {
        name:"register",
        path:"/register",
        component:Register
    }, 
    {
        name:"detail",
        path:"/detail/:skuid",
        component:Detail,
        meta:{showFooter:true}
    },
    {
        name:"addcartsuccess",
        path:"/addcartsuccess",
        component:AddCartSuccess,
        meta:{showFooter:true}
    },
    {
        name:"shopcart",
        path:"/shopcart",
        component:ShopCart,
        meta:{showFooter:true}
    },
    {
        name:"trade",
        path:"/trade",
        component:Trade,
        meta:{showFooter:true},
        //路由独享守卫
        beforEnter:(to,from,next)=>{
            // 要进trade页面，必须得从购物车进
            if(from.path == "/shopcart"){
                next()
            }else{
                //从其他地方来就停留在当前
                next(false)
            }
        }
    },
    {
        name:"pay",
        path:"/pay",
        component:Pay,
        meta:{showFooter:true},
        beforEnter:(to,from,next) =>{
            if(from.path == "/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name:"paysuccess",
        path:"/paysuccess",
        component:Paysuccess,
        meta:{showFooter:true},
        
    },
    {
        name:"center",
        path:"/center",
        component:Center,
        meta:{showFooter:true},
        children:[
            {
                //重定向
                path:"/center",
                redirect:"/center/myorder"
            },
            {
                name:"myorder",
                path:"myorder",
                component:MyOrder
            },
            {
                name:"grouporder",
                path:"grouporder",
                component:GroupOrder,
            }
        ]
    },
]