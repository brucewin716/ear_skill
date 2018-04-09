<template>
  <div class="revenue">
    <mt-header title="耳艺大石店">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button  slot="right">
        <i class="fa fa-plus"></i>
      </mt-button>
    </mt-header>
    <div class="payStyle">
      <mt-field label="现金支付" type="text" placeholder=""></mt-field>
      <mt-field label="支付宝" type="text" placeholder=""></mt-field>
      <mt-field label="刷卡" type="text" placeholder=""></mt-field>
      <mt-field label="扫描二维码" type="text" placeholder=""></mt-field>
    </div>
    <mt-button type="primary" class="btn_checkout">提交结账</mt-button>
  </div>
</template>

<script>
export default {
  name: 'revenue',
  data () {
    return {
    
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .revenue .btn_checkout{
    display: block;
    height: 50px;
    width: 70%;
    margin: 20px auto 0px auto;
  }
</style>
