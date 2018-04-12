<template>
  <div class="index">
    <mt-header title="耳艺大石店"></mt-header>
     <Calendar ref="Calendar" class="calendar" @choseDay="clickDay" isHideOtherday=false></Calendar>
     <div class="itemList">
        <router-link to="/check" class="flex-item">
          <mt-button type="default">
            <i class="fa fa-check-circle" v-if="this.situation.is_check" style="color:green;font-size:40px"></i>
            考勤
          </mt-button>
        </router-link> 
        <router-link to="/project" class="flex-item"> 
          <mt-button type="default">
            <i class="fa fa-check-circle" v-if="this.situation.is_write_project" style="color:green;font-size:40px"></i>
            技师项目
          </mt-button>
        </router-link> 
        <router-link to="/revenue" class="flex-item">
          <mt-button type="default">
            <i class="fa fa-check-circle" v-if="this.situation.is_write_business" style="color:green;font-size:40px"></i>
            营业额
          </mt-button>
        </router-link> 
        <router-link to="/cash" class="flex-item">
          <mt-button type="default">
            <i class="fa fa-check-circle" v-if="this.situation.is_write_cash" style="color:green;font-size:40px"></i>
            现金流水
          </mt-button>
        </router-link>  
     </div>
  </div>
</template>

<script>
import{get_Time,get_today_situation}from'@/https/employee';
import moment from'moment';
import {mapState} from'vuex';
import { Indicator,Toast } from 'mint-ui';
export default {
  name: 'index',
  data () {
    return {
      situation:{
        is_check:false,//是否填写考勤信息
        is_write_project:false,//是否填写项目
        is_write_business:false,//是否填写营业额
        is_write_cash:false,//是否填写现金流水帐
      }
    }
  },
  mounted(){
    if(!localStorage.eryi_date){
      get_Time().then((res)=>{
        var result=res.data;
        var str=moment(result).format("YYYY-MM-DD");
        localStorage.eryi_date=str;
        this.$refs.Calendar.ChoseMonth(str);
        this.getTodaySituation();
      }).catch((e)=>{
          alert(e.message);
      })
    }else{
        this.$refs.Calendar.ChoseMonth(localStorage.eryi_date);
        this.getTodaySituation();
    }   
  },
  methods:{
    getTodaySituation(eryi_date,callback){
      //获取当天填写情况；
      Indicator.open({
        text: '正在获取当天情况...',
        spinnerType: 'fading-circle'
      });
      get_today_situation({
        eryi_date:eryi_date?eryi_date:localStorage.eryi_date
      }).then((res)=>{
            Indicator.close();
            var result=res.data;
            if(result.error==0){
                this.situation=result.data;
                callback&&callback()
            }else{
              this.$refs.Calendar.ChoseMonth(localStorage.eryi_date);
              Toast.open({
                message:result.message,
                iconClass: 'mint-toast-icon mintui mintui-field-error'
              })           
            }
      }).catch((e)=>{
          console.log(e.message);
      })
    },
    clickDay(val){
        var eryi_date=val.replace(/\//g,"-");
        var arr=eryi_date.split("-");
        arr[1]=arr[1]<10? "0"+arr[1]:arr[1];
        arr[2]=arr[2]<10? "0"+arr[2]:arr[2];
        eryi_date=arr.join("-");
        localStorage.eryi_date=eryi_date;
        this.getTodaySituation(eryi_date,()=>{
            localStorage.eryi_date=eryi_date;
        });
    },

  },
  computed:{
    ...mapState([
        'admin',
        'count'
      ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index .itemList{
    display: -webkit-flex;
    display: flex;
    flex-direction:row;
    justify-content:space-around ;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .index .itemList .flex-item{
    width: 48%;
    margin-bottom: 10px;
  }
  .index .itemList .flex-item .mint-button--default{
    width: 100%;
    height:115px;
  }
</style>
