<template>
  <div id="app">
    <transition name="slide-down">
      <router-view></router-view>
    </transition>
    <div :class="['iconfont','musicTion',musicDate.isPlay?'musicRotate':'']" @click="musicTion">&#xe606;</div>
    <MusicPlay :musicDate="musicDate" @isOpen="getdata"></MusicPlay>
    <Footers></Footers>
  </div>
</template>

<script>
  import Footers from './component/footer.vue'
  import MusicPlay from './component/musicplay.vue'
  export default {
    name: 'app',
    data(){
      return {
        musicDate:{
          isOpen: false,
          isPlay: false,
          musicRes: []
        }
      }
    },
    methods:{
      musicTion(){
        var session = sessionStorage.musicRes;
        if(session !== undefined){
            this.musicDate.musicRes = JSON.parse(session);
        }
        this.musicDate.isOpen = true
      },
      getdata(res){
        this.musicDate.isOpen = res
      }
    },
    components:{
      MusicPlay,
      Footers
    }
  }
</script>
<style>
   @import url('./assets/css/base.css');   /*引入公共样式*/
   #app{
     padding-bottom: 1.4rem;
   }
   .mint-header{
    z-index:200 !important;
   }
   .musicTion{
      position: fixed;
      right: 30px;
      bottom: 120px;
      width:45px;
      height:45px;
      line-height:50px;
      font-size:45px;
      border-radius:50%;
      text-align: center;
      color:#fff;
      background-color:#26a2ff;
      z-index:999;
   }
   .musicRotate{
      -webkit-animation:rotate 5s infinite linear;
         -moz-animation:rotate 5s infinite linear;
              animation:rotate 5s infinite linear;
   }
   @-moz-keyframes rotate{
      0%{
        -moz-transform:rotate(0deg);
      }
      100%{
        -moz-transform:rotate(360deg);
      }
   }
   @-webkit-keyframes rotate{
      0%{
        -webkit-transform:rotate(0deg);
      }
      100%{
        -webkit-transform:rotate(360deg);
      }
   }
   @keyframes rotate{
      0%{
        transform:rotate(0deg);
      }
      100%{
        transform:rotate(360deg);
      }
   }
</style>

