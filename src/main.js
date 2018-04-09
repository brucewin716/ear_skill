// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
import './assets/css/my-mint.css'
Vue.use(Mint);
import http from './https/index';
import {check_login} from '@/https/employee';
import Calendar from 'vue-calendar-component';
Vue.use(Calendar);

/* eslint-disable no-new */



router.beforeEach((to,from,next)=>{
	// console.log(to,'to-----')

	if(to.name){
		document.title=to.name;
	}
	if(to.path=='/login'){
		// sessionStorage.
		return next();
	}
	// console.log(store.state.admin);
	// var admin=sessionStorage.admin;
	if(JSON.stringify(store.state.admin)=='{}'){
		Mint.Indicator.open({
			text:"检查登录...",
			spinnerType: 'fading-circle'
		});
		check_login().then((res)=>{
			Mint.Indicator.close();
			document.getElementById("loading-font") && document.getElementById("loading-font").remove();
			if(res.data.error==0){
				store.state.admin=res.data.data;
				//1.根据职位获取tab_auth
				//2.根据职位获取auths 页面
				next();
								// next();
			}else{
				router.push({path:"/login"});//去登录;	
			}
		});
		// return next({path:'/login',redirect:to.path});
	}else{
		// Mint.Indicator.open({
		// 	text:"跳转...",
		// 	spinnerType: 'fading-circle'
		// });		
		next();
		
	}
	// store.state.admin=JSON.parse(admin);
});

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    Mint.Indicator.close();
    return Promise.reject(error);
  });

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Do something with response data
   /* console.log(response,'response');*/
    if(response.data.error==433){//权限没有登录 。问题;
		Mint.Toast({
		  message: '登录已过期',
		  iconClass: 'mint-toast-icon mintui mintui-field-warning',
		});		
		router.push({path:"/login"});//去登录;	
		response.data.data={};
		return response;
    }else if(response.data.error==403){
		Mint.Toast({
		  message: '没有权限进入',
		  iconClass: 'mint-toast-icon mintui mintui-field-warning',
		});		
		// router.push({path:"/login"});//去登录;		
		  router.back();
    	response.data.data={};
    	return response;
    }else{
	    return response;
    }

  }, function (error) {
  	Mint.Indicator.close();
  	 // layer.close(loading_index);
    // Do something with response error
    return Promise.reject(error);
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


