<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div
                @mouseenter="showNav"
                @mouseleave="leaveShow"
            >
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="goSearch($event)">
                            <!-- 一级分类 -->
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" @mouseenter="changeIndex(index)"
                                @mouseleave="resetIndex" :class="{cur:currentIndex === index}">
                                <h3>
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                                        {{c1.categoryName}}
                                    </a>
                                </h3>
                                <div class="item-list clearfix" v-show="currentIndex == index">
                                    <!-- 二级分类 -->
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                                                    {{c2.categoryName}}
                                                </a>
                                            </dt>
                                            <dd>
                                                <!-- 三级分类 -->
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                                                        {{c3.categoryName}}
                                                    </a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    //引入lodash中的节流
    import throttle from "lodash/throttle"
    export default {
        name:"TypeNav",
        data(){
            return {
                currentIndex:-1,//注意这里初始值要设为-1，设为0的话那就是数组的第一个值
                isShow:true
            }
        },
        mounted(){
            if(this.$route.path !== "/home"){
                this.isShow = false;
            }
        },
        computed:{
            ...mapState("home",["categoryList"])
        },
        methods:{
            //使用节流
            changeIndex:throttle(function(index){
                this.currentIndex = index
            },10),
            // changeIndex(inde x){
            //     this.currentIndex = index
            // },

            resetIndex(){
                this.currentIndex = -1;
            },
            goSearch(event){
                
                let {categoryname,category1id,category2id,category3id} = event.target.dataset;
                //节点有一个dataset属性，可以获取节点的自定义属性与属性值
                //console.log(event.target.dataset);

                //这里注意浏览器会将这些自定义属性全部变为小写
                if(categoryname){
                    //只有a标签才会有categoryname属性
                    
                    let location = {
                        name:"search",//路由名
                        //携带query参数
                        query:{
                            categoryName:categoryname
                        }
                    }
                    if(category1id){
                        location.query.category1Id = category1id;
                    }else if(category2id){
                        location.query.category2Id = category2id;
                    }else{
                        location.query.category3Id = category3id;
                    }
                    if(this.$route.params){
                        location.params = this.$route.params;
                    }
                    this.$router.push(location) 
                }
            },
            showNav(){
                this.isShow = true;
            },
            leaveShow(){
                if(this.$route.path !== "/home"){
                    this.isShow = false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>  
.type-nav {
    border-bottom: 2px solid #ff6900;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        a {
            text-decoration: none;
        }

        .all {
            width: 210px;
            height: 45px;
            background-color: #ff6900;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 510px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }

                        // &:hover {
                        //     background-color: #e0342a;
                        // }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                } 
                .cur{
                    background-color: #ff6900;
                }
            }
        }

        //vue中的动画过渡
        .sort-enter {
            height: 0;
        }
        .sort-enter-to {
            height: 510px;
        }
        .sort-enter-active {
            transition:all .5s linear
        }
    }
}
</style>