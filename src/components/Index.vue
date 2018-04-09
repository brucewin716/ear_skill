<template>
  <div class="index">
    <mt-header title="耳艺大石店"></mt-header>
     <Calendar ref="Calendar" class="calendar"></Calendar>
     <div class="itemList">
        <router-link to="/" class="flex-item">
          <mt-button type="default">考勤</mt-button>
        </router-link> 
        <router-link to="/" class="flex-item"> 
          <mt-button type="default">技师项目</mt-button>
        </router-link> 
        <router-link to="revenue" class="flex-item">
          <mt-button type="default">营业额</mt-button>
        </router-link> 
        <router-link to="/" class="flex-item">
          <mt-button type="default">现金流水</mt-button>
        </router-link>  
     </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    
    }
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
