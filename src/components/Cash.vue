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
        <tr>
          <th>摘要</th>
          <th>支出</th>
          <th>收入</th>
          <th>余额</th>
        </tr>
        <tr class="devide">
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>营业额</td>
          <td>1,000</td>
          <td>0</td>
          <td>3,000</td>
        </tr>
        <tr class="devide">
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>宵夜支出</td>
          <td>11</td>
          <td>0</td>
          <td>3,000</td>
        </tr>
        <tr class="devide">
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>老板取走</td>
          <td>22</td>
          <td>0</td>
          <td>2,000</td>
        </tr>
        <tr class="devide">
          <td colspan="4"></td>
        </tr>
      </table>
    </div>
    <div class="mask">
      <div class="cash_model">
        <ul>
          <li>
            <mt-field label="摘要" placeholder="请输入摘要" v-model=" abstract"></mt-field>
          </li>
          <li>
            <mt-field label="支出" placeholder="请输入支出" v-model="pay"></mt-field>
          </li>
          <li>
            <mt-field label="收入" placeholder="请输入收入" v-model="earning "></mt-field>
          </li>
          <li>
            <mt-field label="余额" placeholder="请输入余额" v-model="balance "></mt-field>
          </li>
        </ul>
        <mt-button type="primary" class="btn_submit" @click="addItem()">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cash',
  data () {
    return {
      abstract:'',
      pay:'',
      earning:'',
      balance:''
    }
  },
  methods:{
    showMask(){
        var mask=document.getElementsByClassName('mask')[0];
        mask.style.display="block";
    },
    addItem(){
      var cash_table=document.getElementById("cash_item");
      var mask=document.getElementsByClassName('mask')[0];
      var itemHtml="<tr><td>"+this.abstract+"</td><td>"+this.pay+"</td><td>"+this.earning+"</td><td>"+this.balance+"</td></tr>";
      // cash_table.appendChild(itemHtml);
      mask.style.display="none";

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cash .cash_detail table{
    width: 100%;
  }
  .cash .cash_detail table tr.devide td{
    border-bottom: 1px solid #999;
    height: 0px;
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
  .cash .cash_model{
    position: absolute;
    left:40px;
    top:230px;
    background:#fff;
    width: 80%;
    padding-top: 20px;
    z-index: 5;
  }
  .cash .cash_model ul li{
    height:50px;
    border-bottom:1px solid black;
  }
  .cash .cash_model ul li a{
    background:#fff;
  }
  .cash .cash_model .btn_submit{
    display: block;
    width: 70%;
    margin: 20px auto;
  }
  .cash .mask{
    width: 100%;
    min-height:667px;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color:#000;
    opacity: 0.6;
    z-index: 1;
    display: none;
  }
</style>
