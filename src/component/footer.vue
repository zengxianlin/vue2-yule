<template>
  <div class="footer">
    <ul class="flex">
      <router-link class="home" to="/home" tag='li'>
          <em class="iconfont">&#xe616;</em>
          <p>首页</p>
      </router-link>
      <router-link class="briefed" to="/briefed" tag='li'>
          <em class="iconfont">&#xe616;</em>
          <p>资讯</p>
      </router-link>
      <router-link class="leisure" to="/leisure" tag='li'>
          <em class="iconfont">&#xe616;</em>
          <p>休闲</p>
      </router-link>
      <router-link class="my" to="/my" tag='li'>
          <em class="iconfont">&#xe616;</em>
          <p>我的</p>
      </router-link>
    </ul>
  </div>
</template>
<style scoped>
  .footer{
      width: 100%;
      max-width:750px;
      background-color: #e9e9e9;
      z-index: 200;
      position: fixed;
      left: 50%;
      bottom: 0;
      -webkit-transform: translate(-50%, 0);
         -moz-transform: translate(-50%, 0);
          -ms-transform: translate(-50%, 0);
           -o-transform: translate(-50%, 0);
              transform: translate(-50%, 0);

        background-image: -webkit-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: -o-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
      /* margin-bottom: 0; */
  }
  .footer li{
      padding: 0.20rem 0;
      text-align: center;
      color: #333;
      height: 1rem;
      line-height:1;
      position: relative;
      overflow: hidden;
  }
  .footer .iconfont{
      font-size: 0.5rem;
      padding-bottom: 0.166667rem;
  }
  .footer li.router-link-active{
      color: #fff;
      background-color: #26a2ff;
  }
  .footer li.router-link-active:after{
      content:'';
      width: 100%;
      height: 1.5rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, .7);
      -webkit-transform: scale(0);
      -ms-transform: scale(0);
      transform: scale(0);
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -50%;
      margin-top: -0.75rem;
      opacity: 1;
      -webkit-animation: rippleDrop .6s linear;
              animation: rippleDrop .6s linear;
  }
  @-webkit-keyframes rippleDrop {
      100% {
          -webkit-transform: scale(2.5);
          transform: scale(2.5);
          opacity: 0;
      }
  }
  @keyframes rippleDrop {
      100% {
          -webkit-transform: scale(2.5);
          transform: scale(2.5);
          opacity: 0;
      }
  }
</style>