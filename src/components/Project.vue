<template>
  <div class="project">
    <mt-header title="耳艺大石店">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="project_list">
        <ul id="name_list">
          <li v-for="(item,key) in items">
            <div @click="show(item,key)">
              <div class="nameBox">
                <p class="name">{{item.ep_name}}</p>
                <p class="position">{{item.cate_name}} {{item.pos_name}} </p>
              </div>
              <p class="icon"><i class="fa fa-angle-down fa-2x" v-if="item.toggle"></i></p>
              <p class="icon"><i class="fa fa-angle-up fa-2x" v-if="!item.toggle"></i></p>
            </div>
            <ul id="item_list" v-if="item.toggle">
              <div class="collapse" v-if="item.service_items.length">
                <li v-for="subItem in item.service_items">
                  <p class="item">{{subItem.products_name}}</p>
                  <p class="calc">
                    <button @click="reduce(subItem)">-</button>
                    <input type="number" name="calc" v-model="subItem.count">
                    <button @click="add(subItem)">+</button>
                  </p>
                </li>
                <mt-button type="primary" class="btn_submit" @click="serviceSubmit(item)">提交</mt-button>
              </div> 
              <div v-else>
                <h4 class="data-null">该员工没有掌握技能</h4>
              </div>
            </ul> 
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { get_emyloyee_list,submit_service_items } from '@/https/employee';
import { Indicator,Toast } from 'mint-ui';
export default {
  name: 'project',
  data () {
    return {
        items:[
          // {"id":"0","ep_name":"王廷廷","cate_name":"按摩师","pos_name":"技师",
          // "service_item":[
          //   {"products_name":"特色采耳","count":"2"},
          //   {"products_name":"全身按摩","count":"3"},
          //   {"products_name":"耳根治疗","count":"4"},
          // ]},
        ]
    }
  },
  methods:{
    show(item,key){
        if(item.toggle){
          item.toggle=!item.toggle;
        }else{
          this.$set(this.items[key],"toggle",true);
        }
    },
    reduce(val){
        var count=0;
        if(val.count&&(val.count|0)>0){
          val.count--;
        }else{
          val.count=0;
        }
        
    },
    add(val){
        var count=parseInt(val.count)|0;
        this.$set(val,"count",count);
        count++;
        val.count=count;    
    },
    serviceSubmit(item){
      Indicator.open({
        text: '正在提交数据',
        spinnerType: 'fading-circle'
      });
      item.eryi_date=localStorage.eryi_date;
      submit_service_items(item).then((res)=>{
          Indicator.close();
          var result=res.data;
          console.log(result);
          if(result.error==0){
              Toast({
                message: '修改成功',
                iconClass: 'mint-toast-icon mintui mintui-success'
              });
          }else{
              Toast({
                message: '数据提交失败',
                iconClass:'mint-toast-icon mintui mintui-field-error'    
              });
          }
      })
    }
  },
  mounted(){
    Indicator.open({
      text: '正在获取员工数据...',
      spinnerType: 'fading-circle'
    });
    get_emyloyee_list({
      eryi_date:localStorage.eryi_date
    }).then((res)=>{
        Indicator.close();
        var result=res.data;
        console.log(result);
        if(result.error==0){
          this.items=result.data.all;
        }
        
    }).catch((e)=>{
        Toast({
          message: e.message,
          position:'middle',
        });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .project .project_list ul#name_list{
    border-bottom: 1px solid #999;
  }
  .project .project_list ul#name_list li{
    box-sizing: border-box;
    padding: 10px 10px 0px 10px;
    min-height:50px;
    width: 100%;
    border-top: 1px solid #999;
  }
  .project .project_list ul#name_list li>div{
    width: 100%;
    min-height:50px;
  }
  .project .project_list ul#name_list li .nameBox{
    width: 50%;
    float: left;
  }
  .project .project_list ul#name_list li .nameBox .name{
    margin-bottom: 5px;
    text-indent: 10px;
  }
  .project .project_list ul#name_list li .icon{
    width: 6%;
    float: right;
    text-align: right;
  }
  .project .project_list ul#name_list li .collapse .btn_submit{
    display: block;
    margin: 10px auto;
    width: 70%;
  }
  .project .project_list ul#name_list li ul#item_list{
    width: 100%; 
  }
  .project .project_list ul#name_list li ul#item_list li{
    line-height:30px;
    height: 50px;
    padding:10px 0px 0px 0px;
  }
  .project .project_list ul#name_list li ul#item_list  li:last-of-type{
    border-bottom:1px solid #999;
  }
  .project .project_list ul#name_list li ul#item_list li .item{
    width: 50%;
    float: left;
  }
  .project .project_list ul#name_list li ul#item_list li .calc{
    width: 50%;
    float: left;
    text-align: right;
  }
  .project .project_list ul#name_list li ul#item_list li .calc button{
    width: 22%;
    height: 30px;
  }
  .project .project_list ul#name_list li ul#item_list li .calc input{
    width: 40%;
    height: 30px;
    border: 1px solid #999;
    /*margin: 0px 10px;*/
    border-radius: 5px;
    outline: none;
    text-align: center;
  }
  .data-null{
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #999;
  }
</style>
