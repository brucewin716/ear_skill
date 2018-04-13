<template>
  <div class="cash">
    <mt-header title="耳艺大石店">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button  slot="right">
        <i class="fa fa-plus" @click="showMask()"></i>
      </mt-button>
    </mt-header>
    <div class="cash_detail">
      <table id="cash_item">
        <thead>
           <tr>
            <th>摘要</th>
            <th>支出</th>
            <th>收入</th>
            <th>余额</th>
          </tr>
        </thead>
       <tbody>
          <tr v-for="item in amountWaters" @click="showModel(item)">
            <td>{{item.abstract}}</td>
            <td>{{item.amount>0? 0:item.amount }}</td>
            <td>{{item.amount<0? 0:item.amount }}</td>
            <td>{{item.balance}}</td>
          </tr>
       </tbody>
      </table>
    </div>
    <mt-popup v-model="popupVisible">
      <div class="cash_model">
        <mt-field label="摘要" type="text"placeholder="请输入摘要" v-model="amount_water.abstract"></mt-field>
        <mt-field label="支出" type="number"placeholder="请输入支出" v-model="amount_water.expenditure"></mt-field>
        <mt-field label="收入" type="number"placeholder="请输入收入" v-model="amount_water.income "></mt-field>
        <mt-field label="余额" type="number"placeholder="请输入余额" v-model="amount_water.balance "></mt-field>
        <mt-button type="primary" class="btn_submit" @click="submit()">提交</mt-button>
      </div>
    </mt-popup> 
    <mt-popup v-model="showEdit">
      <div class="cash_model">
        <mt-field label="摘要" type="text"placeholder="请输入摘要" v-model="selectedRow.abstract"></mt-field>
        <mt-field label="支出" type="number"placeholder="请输入支出" v-model="selectedRow.expenditure"></mt-field>
        <mt-field label="收入" type="number"placeholder="请输入收入" v-model="selectedRow.income "></mt-field>
        <mt-field label="余额" type="number"placeholder="请输入余额" v-model="selectedRow.balance "></mt-field>
        <mt-button type="primary" class="btn_submit" @click="update()">修改</mt-button>
      </div>
    </mt-popup> 
  </div>
</template>

<script>
import {
  get_amount_water_list,
  submit_amount_water,
  update_amount_water
} from '@/https/employee';
import { Toast,Indicator,Popup} from 'mint-ui';

export default {
  name: 'cash',
  data () {
    return {
      popupVisible:false,
      showEdit:false,
      selectedRow:{},
      amountWaters:[],
      amount_water:{
        abstract:'',
        expenditure:'',
        income:'',
        balance:''
      }
    }
  },
  mounted(){
    this.getAmountWater();
  },
  methods:{
    showMask(){
       this.popupVisible=true;
    },
    showModel(item){
        this.showEdit=true;
        this.selectedRow=item;
        var expenditure=item.amount>0? 0:item.amount;
        var income=item.amount<0? 0:item.amount;
        this.amount_water.expenditure=expenditure;
        this.amount_water.income=income;
    },
    getAmountWater(){
      Indicator.open({
        text: '正在获取当日流水...',
        spinnerType: 'fading-circle'
      });
      get_amount_water_list({
        eryi_date:localStorage.eryi_date
      }).then((res)=>{
        Indicator.close();
        var result=res.data;
        if(result.error==0){
            this.amountWaters=result.data;
        }else{
          Toast({
            message: result.message,
            position: 'middle',
          });
        }
      }).catch((e)=>{
        console.log(e.message);
      })
    },
    submit(){
       Indicator.open({
        text: '正在提交当日现金流水...',
        spinnerType: 'fading-circle'
      }); 
      this.amount_water.eryi_date=localStorage.eryi_date;
       submit_amount_water(this.amount_water).then((res)=>{
          Indicator.close();
          var result=res.data;
          if(result.error==0){
            Toast({
              message:result.message,
              position:"middle",
              iconClass: 'mint-toast-icon mintui mintui-success'
            });
            this.amount_water={
              abstract:"",
              expenditure:"",//支出
              income:"", //收入
              balance:"", //余额  
             };
            this.getAmountWater();
          }else{
            Toast({
              message: result.message,
               position:"middle",
              iconClass: 'mint-toast-icon mintui mintui-field-error' 
            });
          }
       }).catch((e)=>{
          Toast({
              message: e.message,
               position:"middle",
              iconClass: 'mint-toast-icon mintui mintui-field-error' 
            });
       })
    },
    update(){
        if(this.selectedRow.abstract.lenght>20){
           Indicator.open({
            text: '摘要不得超过20个字节...',
            spinnerType: 'fading-circle'
          }); 
        }else{
          Indicator.open({
            text: '正在提交修改...',
            spinnerType: 'fading-circle'
          });
        }    
      update_amount_water({
       amountWater:this.selectedRow 
      }).then((res)=>{
        Indicator.close();
        var result=res.data;
        this.getAmountWater();
        if(result.error==0){
          Toast({
              message:result.message,
              position:"middle",
              iconClass: 'mint-toast-icon mintui mintui-success',
              duration: 9000
            });
        }else{
            Toast({
              message: e.message,
               position:"middle",
              iconClass: 'mint-toast-icon mintui mintui-field-error' 
            });
        }
      }).catch((e)=>{
          Toast({
              message: e.message,
               position:"middle",
              iconClass: 'mint-toast-icon mintui mintui-field-error' 
            });
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cash .cash_detail table{
    width: 100%;

  }
  .cash .cash_detail table tr{
    border-bottom: 1px solid #999;
  }
  .cash .cash_detail table tr th{
    font-size: 16px;
  }
  .cash .cash_detail table tr th,
  .cash .cash_detail table tr td{
    height: 40px;
    text-align: center;
    vertical-align: middle;
    width:20%;
    color: #505050;
  }
  .cash .cash_detail table tr td{
    font-size: 14px;
  }
  .cash .cash_detail table tr td:nth-child(1){
    width: 35%;
  }
  .cash .mint-popup{
    width: 90%;
    top: 60%;
  }
  .cash .cash_model{
    padding-top: 20px;

  }
  .cash .cash_model .btn_submit{
    display: block;
    width: 70%;
    margin: 20px auto;
  }
</style>
