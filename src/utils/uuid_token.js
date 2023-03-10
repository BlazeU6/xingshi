import {v4 as uuidv4} from "uuid";
export const getUUID = function(){
    //先从本地存储获取uuid,看一下本地存储里面是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有
    if(!uuid_token){
        //生成游客临时身份
        uuid_token = uuidv4();
        //将它存储在本地
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    //一定要有返回值，否则执行结果是undefined
    return uuid_token;
}