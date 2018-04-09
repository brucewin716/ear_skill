<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view class="child-view"></router-view>
     </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
       transitionName:'slide-left'
    }
  },
  watch:{
    '$route' (to, from) {
      const toDepth = to.path.split('/').filter((item)=>item!="").length
      const fromDepth = from.path.split('/').filter((item)=>item!="").length

      // console.log(from.path)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      // console.log(this.transitionName)
    }    
  },
  methods:{
  }
}
</script>

<style>
.wh_content_all{
  background-color: #fff;
}
.wh_top_changge .wh_content_li{
  color: #000;
}
.wh_content_item{
  color:#000;
}
.wh_jiantou2{
      border-top: 2px solid #000;
    border-right: 2px solid #000;
}
.wh_jiantou1{
    border-top: 2px solid #000;
    border-left: 2px solid #000;
}
&.move-enter-active, &.move-leave-active{
   transition: all 0.2s linear
}
&.move-enter,&.move-leave-active{
  transform: translate3d(100%, 0, 0)
}
.price{
  color:red;
}
#app {
height: 100%;
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.2s;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
  z-index: -1;
}
/*.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}*/
.child-view {
  position: absolute;
  width:100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100px, 0);
  transform: translate(100px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100px, 0);
  transform: translate(-100px, 0);
}
</style>
