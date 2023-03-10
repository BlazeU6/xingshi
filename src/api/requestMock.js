import axios from "axios"
//对axios进行二次封装

//引入进度条  ---nprogress是一个对象
import nprogress  from "nprogress";
//还要引入它的样式 --- 可以修改它的颜色
import "nprogress/nprogress.css";

const requests = axios.create({
    baseURL:"/mock", 
    timeout:3000
});

//添加请求拦截器
requests.interceptors.request.use((config)=>{
    //这里的config是一个配置对象，对象里面有一个属性很重要---headers请求头
    //这里主要是在发起请求之前做些什么
    //进度条开始
    nprogress.start();
    return config
},(error)=>{
    //对请求错误做些什么
    return Promise.reject(error)
});

//添加响应拦截器
requests.interceptors.response.use((response)=>{
    //状态码在2xx以内的都会触发该函数
    //对响应数据做些什么，比如return response.data
    //进度条结束
    nprogress.done();
    return response;
},(error)=>{
    //状态码在2xx以外的都会触发该函数
    //对响应错误做点什么
    return Promise.reject(error)
})
export default requests;