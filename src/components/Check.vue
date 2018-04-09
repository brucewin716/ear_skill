<template>
  <div class="check">
    <mt-header title="耳艺大石店">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="checkList">
      <table>
        <tr>
          <td>国际开</td>
          <td><mt-radio  v-model="value" :options="['上班']"></mt-radio></td>
          <td><mt-radio  v-model="value" :options="['休息']"></mt-radio></td>
          <td><mt-radio  v-model="value" :options="['请假']"></mt-radio></td>
          <td></td>
        </tr>
      </table>
    </div>
    <mt-button type="primary" class="btn_submit">提交结账</mt-button>
  </div>
</template>

<script>
export default {
  name: 'check',
  data () {
    return {
    
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .checkList table tr td{
    width: 20%;
    text-align: left;
  }
</style>
