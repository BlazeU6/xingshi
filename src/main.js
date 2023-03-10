import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import router from "./router"
import TypeNav from "./components/TypeNav"
import store from "./store/index"
//引入MockServe.js ---mock数据
import mockServe from "./mock/mockServe"
//引入轮播图swiper样式
import "swiper/css/swiper.css"
//全局引入轮播图组件
import Carousel from "./components/Carousel"
//全局引入分页器组件
import Pagination from "./components/Pagination"
//三级联动菜单 ---注册为全局组件
Vue.component(TypeNav.name,TypeNav)
//全局注册轮播图组件
Vue.component(Carousel.name,Carousel);
//全局注册分页器组件
Vue.component(Pagination.name,Pagination)
//引入请求接口的方法
import * as API from "./api"
//引入element-ui
import { MessageBox ,Message} from 'element-ui';
//引入图片懒加载
import VueLazyload from 'vue-lazyload'
import lazyImg from "./assets/images/lazyImg.jpeg"



Vue.config.productionTip = false;

//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

Vue.use(VueRouter);
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:lazyImg
});

new Vue({
  render: h => h(App),
  beforeCreate(){
    //全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$api = API;
  },
  router,
  store,
}).$mount('#app')
