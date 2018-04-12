import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Login from'@/components/Login';
import Index from'@/components/Index';
import Revenue from'@/components/Revenue';
import Check from'@/components/Check';
import Project from'@/components/Project';
import Cash from'@/components/Cash';
export default new Router({
  routes: [
      {
        path:'/login',
        name:'耳艺-登录',
        component:Login
      },
      {
        path:'/index',
        name:'耳艺-首页',
        component:Index
      },
      {
        path:'/revenue',
        name:'耳艺-营业额',
        component:Revenue
      }, 
      {
        path:'/check',
        name:'耳艺-考勤',
        component:Check
      }, 
      {
        path:'/project',
        name:'耳艺-技师项目',
        component:Project
      },
      {
        path:'/cash',
        name:'耳艺-现金流水',
        component:Cash
      },   
  ]
})
