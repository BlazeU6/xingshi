<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="updateChecked(cart.skuId,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartInfoList.length > 0" @click="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"  @click="$router.push('trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  //引入lodash中的节流
  import throttle from "lodash/throttle"
  export default {
    name: 'ShopCart',
    methods:{
      //获取个人购物车数据
      getData(){
        this.$store.dispatch("shopcart/getCartList");
      },
      handler: throttle(async function (type, disNum, cart) {
        switch (type) {
          case "add":
            disNum = 1;
            break;
          case "minus":
            disNum = cart.skuNum > 1 ? -1 : 0;
            break;
          case "change"://用户自己输入的
            //判段是否非法
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0
            } else {
              disNum = parseInt(disNum) - cart.skuNum;
            }
            break;
        }
        //派发actions
        try {
          await this.$store.dispatch("detail/updateShopCart", { skuId: cart.skuId, skuNum: disNum });
          //再一次获取服务器最新的购物车数据进行展示
          this.getData();
        } catch (error) {
        }
      }, 500),
      //删除产品
      async deleteCartById(skuId){
        try {
          await this.$store.dispatch("shopcart/deleteCart",skuId);
          this.getData();
        } catch (error) {
          alert(error.message)
        }
      },

      //修改商品选中状态
      async updateChecked(skuId,event){
        try {
          //这里的checked是一个布尔值，要转一下
          
          let isChecked = event.target.checked ? "1": "0";
          this.$store.dispatch("shopcart/updateCheckedById",{skuId,isChecked});
          this.getData();
          // console.log(this.cartInfoList);
        } catch (error) {
          alert(error.message)
        }
      },
      //删除所有选中的商品
      async deleteAllChecked(){
        try {
          await this.$store.dispatch("shopcart/deleteAllChecked");
          this.getData()
        } catch (error) {
          alert(error.message)
        }
        
      },
      //通过全选按钮修改所有产品的状态
      async updateAllCartChecked(event){
        let isAllCheck = event.target.isChecked ? "1":"0";
        try {
          await this.$store.dispatch("shopcart/updateAllCartChecked",isAllCheck);
          this.getData();
          
        } catch (error) {
          alert(error.message)
        }
      }
    },
    computed:{
      ...mapState("shopcart",["cartList"]),
      cartInfoList(){
        return this.cartList || [];
      },
      isAllCheck(){
        return this.cartInfoList.every((item) => item.isChecked == "1");
      },
      totalPrice(){
        let sum = 0;
        this.cartInfoList.filter(item => {
          return item.isChecked == "1"
        }).forEach(item => {
          sum += item.skuNum * item.skuPrice;
        });
        return sum;
      }
    },
    mounted(){
      
      this.getData();  
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
            padding-top: 30px;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          // .cart-list-con3 {
          //   width: 20.8333%;

          //   .item-txt {
          //     text-align: center;
          //   }
          // }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;
            a {
              text-decoration: none;
            }
            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              display: block;
              color: #666;
              margin-bottom: 5px;
              text-decoration: none;
              &:hover {
                cursor: pointer;
              }
            }
            
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>