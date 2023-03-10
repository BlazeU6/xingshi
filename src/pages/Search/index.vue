<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread  面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">x</i></li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademak">{{searchParams.trademak.split(":")[1]}}<i @click="removeTradeMark">x</i></li>
            <!-- 商品所选属性面包屑 -->
            <li 
              class="with-x" 
              v-for="(attrValue,index) in searchParams.props"
              :key="index"
            >
              {{attrValue.split(":")[1]}}
              <i @click="removeAttrInfo(index)">x</i>
            </li>

          </ul>
        </div>

        <!--selector  这是Search下的子组件-->
        <SearchSelector/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合</a>
                </li>
                <li :class="{active:isTwo}"  @click="changeOrder('2')">
                  <a>销量
                    <span 
                      v-show="isTwo"
                      v-html="orderType"
                      >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
                v-for="good in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link 
                      :to="{
                        name:'detail',
                        params:{skuid:good.id}
                      }"
                    >
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchList.total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters,mapState} from "vuex"
  export default {
    name: 'Search',
    data(){
      return {
        searchParams: {
          //带给服务器的数据
          category1Id: "",
          category2Id: "",
          category3Id: "",
          //分类的名字
          categoryName: "",
          keyword: "",
          //排序
          order: "1:asc",
          //页器用的---表示当前是第一页
          pageNo: 1,
          //每一页展示的数据
          pageSize: 10,
          //商品的属性
          props: [ ],
          //品牌
          trademak: ""
        }
      }
    },
    components: {
      SearchSelector
    },
    methods:{
      //将发请求封装起来
      sendData(){
        this.$store.dispatch("search/getSearchList",this.searchParams);
      },
      removeCategoryName(){
        //如果把数据改为空的字符串，它还是会给服务器发过去，这是没有必要的，但是改为undefined后就不会发过去了
        this.searchParams.categoryName = undefined;
        //重置category1Id,2Id,3Id
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        //地址栏也需要修改 --- 路由跳转
        
        if(this.$route.params){
            this.$router.push({
            name:"search",
            params:this.$route.params
          })
        }
      },
      removeKeyword(){
        this.searchParams.keyword = undefined;
        //利用全局事件总线通知header组件删除keyword关键字
        this.$bus.$emit("clearKeyword");
        //路由跳转
        //这里还得严谨一点，还有一个query参数要带上
        if(this.$route.query){
          this.$router.push({
            name:"search",
            query:this.$route.query
          })
        }
      },
      removeTradeMark(){
        this.searchParams.trademak = ""
      },
      removeAttrInfo(index){
        //index为想要删除的属性在数组中的序号
        this.searchParams.props.splice(index,1);
        this.sendData();
      },
      changeOrder(flag){
        //order默认是"1:asc"
        let originFlag = this.searchParams.order.split(":")[0];
        let originOrder = this.searchParams.order.split(":")[1];
        let newOrder = "";
        
        if(flag == originFlag){
          //说明点击的一定是综合
          newOrder = `${flag}:${originOrder == 'desc' ? 'asc' : 'desc'}`;
          if(flag == '1') newOrder = `${flag}:${'asc'}`
        }else{
          //说明点击的一定是价格
          newOrder = `${flag}:${'asc'}`
        }
        this.searchParams.order = newOrder;
        this.sendData();
      },
      getPageNo(pageNo){
          this.searchParams.pageNo = pageNo;
          this.sendData()
      }
    },
    computed:{
      ...mapGetters("search",["goodsList"]),
      ...mapGetters("search",["trademarkList"]),
      ...mapGetters("search",["attrsList"]),
      ...mapState("search",["searchList"]),
      isOne(){
        return this.searchParams.order.indexOf('1') != -1;
      },
      isTwo(){
        return !this.isOne;
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1;
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1;
      },
      orderType(){
        return this.isDesc ? "降" : "升"
      }
    },
    watch:{
      //监听路由的信息是否变化，再次发送请求
      $route(newVal,oldVal){
        //注意：这里的$route不用加this  
      
        //发起请求之前重新整理数据
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        this.sendData()
        //重置category1Id,2Id,3Id
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
      }
    },
    beforeMount(){
      //ES6语法  合并对象
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
      this.sendData()
      //全局事件总线实现点击品牌展示该品牌的产品
      this.$bus.$on("checkTradeMark",(trademark)=>{
        this.searchParams.trademak = `${trademark.tmId}:${trademark.tmName}`;
        //再次发请求
        sendData()
      });
      //全局事件总线传递商品属性值、属性名、属性Id
      this.$bus.$on("checkAttr",(attr,tmValue)=>{
        let attrInfos = `${attr.attrId}:${tmValue}:${attr.attrName}`;
        if(this.searchParams.props.indexOf(attrInfos) == -1){
          this.searchParams.props.push(attrInfos);
          this.sendData()
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;
    
    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
                text-decoration: none;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }
                a:hover {
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #ff6900;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: 5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #ff6900;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>