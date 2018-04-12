<template>
  <div class="revenue">
    <mt-header title="耳艺大石店">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="payStyle" v-for="item in business_amount.payments">
      <mt-field :label="item.pay_name" type="number" placeholder="请输入金额" v-model="item.money"></mt-field>
    </div>
    <mt-button type="primary" class="btn_checkout" @click="submit()">提交营业额</mt-button>
  </div>
</template>

<script>
import {Toast,Indicator} from 'mint-ui';
import {get_business_amount,submit_business_amount} from '@/https/employee';
import {mapState} from 'vuex';
export default {
  name: 'revenue',
  data () {
    return {
      business_amount:{
        payments:[]
      }
    }
  },
  computed:{
    ...mapState(['admin'])
  },
  mounted(){
     Indicator.open({
          text: '正在获取数据...',
          spinnerType: 'fading-circle'
        });
        get_business_amount({
          eryi_date:localStorage.eryi_date
        }).then((res)=>{
            Indicator.close();
            var result=res.data;
            if(result.error==0){
               this.business_amount=result.data;
            }else{
               Toast({
                  message: result.message,
                  iconClass: 'mint-toast-icon mintui mintui-field-error'       
                })
            }
        })
  },
  methods:{
    back(){
      history.go(-1);
    },
    submit(){
       Indicator.open({
          text: '正在提交营业额...',
          spinnerType: 'fading-circle'
        });
       submit_business_amount({
        eryi_date:localStorage.eryi_date,
        business_amount:this.business_amount
       }).then((res)=>{
          Indicator.close();
          var result=res.data;
          if(result.error==0){
               Toast({
                  message:result.message,
                  iconClass: 'mint-toast-icon mintui mintui-success'       
                })
          }else{
              Toast({
                  message:result.message,
                  iconClass: 'mint-toast-icon mintui mintui-field-error'        
                })
          }
       })
    }
  }

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
