<template>
  <div class="login">
    <img src="static/eryi_logo.png" alt="">
    <mt-field  placeholder="请输入工号" v-model="username" class='btn_input'></mt-field>
    <mt-field  placeholder="请输入密码" type="password" v-model="password" class='btn_input'></mt-field>
    <mt-button type="primary" class="btn_login" @click="submitLogin()">登录</mt-button>
  </div>
</template>

<script>
import { login} from '@/https/employee';
import { Toast,Indicator } from 'mint-ui';
export default {
  name: 'login',
  data () {
    return {
        username:'',
        password:''
    }
  },
  methods:{
      verify(){
        if(!/^[a-zA-Z0-9]{8}$/.test(this.username)){
          Toast({
            message: '账号错误',
            position: 'middle',
          });
          return false;
        }else if(!/^[0-9]{6}$/.test(this.password)){
          Toast({
            message: '密码错误',
            position: 'middle',
          });
          return false;
        }
      },
      submitLogin(){
        //登录前的验证
       this.verify();
        //提交登录
        login({
          account:this.username,
          password:this.password
        }).then((res)=>{
          // Indicator.open({
          //   text: '验证成功,即将登录',
          //   spinnerType: 'fading-circle'
          // });
          var result=res.error;
          console.log(result);
          if(result==0){
              Indicator.open({
                text: '登录成功,正在跳转',
                spinnerType: 'fading-circle'
              });
              this.$router.replace({ path: 'index' });
          }
        })

      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login img{
    display: block;
    width: 100px;
    margin:100px auto 30px auto;

  }
  .login .btn_input{
    margin-bottom: 10px;
   }
 .login .btn_input,.btn_login{
    display: block;
    width: 80%;
    margin: 0px auto;
  }
</style>
