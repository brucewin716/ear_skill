<template>
  <div class="check">
    <mt-header title="耳艺大石店">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="checkList">
       <ul >
         <li v-for='(item,index) in items'>
          <mt-radio  :title="item"   :options="['上班','休息','请假']"></mt-radio>
        </li>
       </ul>
    </div>
    <mt-button type="primary" class="btn_submit">提交</mt-button>
  </div>
</template>

<script>
export default {
  name: 'check',
  data () {
    return {
      items:['国际开','杨杰','王婷婷','贺国军','郭积开','杨大爷','呵呵哒','京东方','打的费','赶得到']
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn_submit{
    display: block;
    width:80%;
    margin:20px auto 0px auto;
  }
</style>
