<template>
  <div class="login">
  		<!-- <mt-header fixed title="快速登录"></mt-header> -->
  		<div class="logo"><img src="/public/images/eryi_logo.png" width="100px" alt=""></div>
   		<mt-field label="工号/手机" placeholder="请输入员工编号或者手机号码" v-model="username"></mt-field>
   		<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
   		<br>
   		<mt-button type="primary" size="large" style="display:block;width:70%;margin:0 auto" @click.native.prevent="handleSubmit">登录</mt-button>
  </div>
</template>

<script>
import {login} from '@/https/employee';
import {LOGIN} from '@/constants/actionTypes';
export default {
  name: 'login-page',
  data () {
    return {
     	username:"",
     	password:"",
    }
  },
  methods:{
		handleSubmit(){
			this.$indicator.open({
			  text: '登录中...',
			  spinnerType: 'fading-circle'
			});
			login(this.username,this.password).then((res)=>{
				this.$indicator.close();
					var result = res.data;
					if(result.error==0){
						this.$toast({
							message:"欢迎回来",
							iconClass: 'mint-toast-icon mintui mintui-success',
						});
						this.$store.dispatch(LOGIN,result.data);
						setTimeout(()=>{
							var redirect=this.$route.query.redirect;
							this.$router.push({path:redirect||'/'});
						},1000);
					}else{
						this.$toast({
							 message:result.message||'错误了',
							 iconClass: 'mint-toast-icon mintui mintui-field-error',
						})						
					}
			}).catch((err)=>{
				this.$indicator.close();
				this.$toast({
					 message:err.message||'错误了',
					 iconClass: 'mint-toast-icon mintui mintui-field-error',
				})
			})
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.login{
		.logo{
			text-align: center;
			padding-top:20px;
			padding-bottom: 20px;
			margin-top:80px;
		}
	}
</style>
