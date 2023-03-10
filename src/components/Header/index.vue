<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>幸识 欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <router-link :to="{name:'login'}">登录</router-link>
                        <router-link :to="{name:'register'}" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{userName}}</a>
                        <a class="register" @click="loginOut">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" :to="{name:'home'}">
                    <img src="./image/logo2.png" alt="" style="width:65px;height:65px">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input 
                        type="text"  
                        id="autocomplete" 
                        class="input-error input-xxlarge"
                        v-model="keyword"
                        @keyup.enter="goSearch($event)"
                        />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data(){
        return {
            keyword:""
        }
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name;
        }
    },
    methods:{
        goSearch(event){
            let location = {
                name:"search",
                params:{
                    //对象写法时params必须搭配name一起使用！
                    //params参数可以传递也可以不传递，如果传递空字符串，得搭配undefined使用
                    keyword:this.keyword || undefined
                }
            };
            if(this.$route.query){
                location.query = this.$route.query; 
            }
            this.$router.push(location);
            
        },
        //退出登录
        //1、先发请求，通知服务器退出登录
        //2、清除数据（TOKEN,userInfo）
        async loginOut(){
            try {
                await this.$store.dispatch("user/loginOut");
                //如果退出成功回到首页
                this.$router.push("home")
            } catch (error) {
                alert(error.message)
            }
        }
    },
    mounted(){
        this.$bus.$on("clearKeyword",function(){
            this.keyword = ""
        })
    }
}
</script>

<style lang="less" scoped>
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img { 
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>