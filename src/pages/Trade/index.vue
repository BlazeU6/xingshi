<template>
  <div class="trade-container">
    <h2 class="title">填写并核对订单信息</h2>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div 
        class="address clearFix"
        v-for="address in addressInfo"
        :key="address.id"
      >
        <span class="username" :class="{selected:address.isDefault == 1}">{{address.consignee}}</span>
        <p @click="changeDefault(address,addressInfo)">
          <span class="s1">{{address.fullAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-show="address.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h3 class="pay">支付方式</h3>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h3>配送方式</h3>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h3>商品清单</h3>
        <ul class="list clearFix"
          v-for="order in orderInfo.detailArrayList"
          :key="order.skuId"
        >
          <li>
            <img :src="order.imgUrl" alt="" style="width:100px;height:100px">
          </li>
          <li>
            <p>
              {{order.skuName}}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>{{order.orderPrice}}</h3>
          </li>
          <li>X{{order.skuNum}}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h3>买家留言：</h3>
        <textarea 
          placeholder="建议留言前先与商家沟通确认" 
          class="remarks-cont"
          v-model="message"
        >
        </textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h4>发票信息：</h4>
        <div>普通发票（电子） 个人 明细</div>
        <h4>使用优惠/抵用</h4>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{orderInfo.totalNum}}</i>件商品，总商品金额</b>
          <span>{{orderInfo.totalAmount}}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥5399.00</span></div>
      <div class="receiveInfo">
        寄送至:
        <span style="margin-right:50px">{{userSelectedAddressInfo.fullAddress}}</span>
        收货人：<span>{{userSelectedAddressInfo.consignee}}</span>
        <span>{{userSelectedAddressInfo.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex" 
  export default {
    name: 'Trade',
    data(){
      return {
        message:"",
        //订单号
        orderId:""
      }
    },
    computed:{
      ...mapState("trade",["addressInfo","orderInfo"]),
      //结算之前获取用户选中的地址信息
      userSelectedAddressInfo(){
        return this.addressInfo.find(item => {
            return item.isDefault == "1"
        }) || {};
      }
    },
    methods:{
      //修改默认地址
      changeDefault(address,addressInfo){
        //排他思想
        addressInfo.forEach(item => {
          item.isDefault = "0";
        });
        address.isDefault ="1";
      },
      //提交订单先向服务器发请求
      async submitOrder() {
        //收集信息 
        let tradeNo = this.orderInfo.tradeNo;
        let data = {
          "consignee": this.userSelectedAddressInfo.consignee,
          "consigneeTel": this.userSelectedAddressInfo.phoneNum,
          "deliveryAddress": this.userSelectedAddressInfo.fullAddress,
          "paymentWay": "ONLINE",
          "orderComment": this.message || "",
          "orderDetailList": this.orderInfo.detailArrayList
        };
        let result  = await this.$api.reqPostOrderInfo(tradeNo,data);
        if(result.data.code == 200){//提交订单成功
          this.orderId = result.data.data;
          
          //路由跳转 + 传参
          this.$router.push({
            name:"pay",
            query:{
              orderId:this.orderId
            }
          })
        }else{
          alert(result.data)
        }
      }
      
    },
    mounted(){
      this.$store.dispatch("trade/getUserAddress");
      this.$store.dispatch("trade/getOrderInfo")
    }
  }
</script>

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
      text-align: left;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        font-size:16px;
        line-height: 36px;
        margin: 18px 0;
        text-align: left;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h3 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;
          border-bottom:1px solid #7e7a7a;
          margin-top: 30px;
          li {
            line-height: 30px;

            p {

              margin-bottom: 20px;
            }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
          }
        }
      }

      .bbs {
        
        margin-bottom: 15px;

        h3 {
          text-align: left;
          margin-top: 50px;
          margin-bottom: 20px;
        }
        h5 {
          line-height: 50px;
        }

        textarea {
          width: 95%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
          padding: 10px;
          margin-right: 10px;
        }
      }

      .bill {
        text-align: left;
        
        h4 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .money {
      width: 1200px;
      margin: 20px auto;

      ul {
        width: 220px;
        float: right;

        li {
          line-height: 30px;
          display: flex;
          justify-content: space-between;

          i {
            color: red;
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      background-color: #f4f4f4;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>