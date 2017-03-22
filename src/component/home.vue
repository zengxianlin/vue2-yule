<template>
    <div class="home">
        <mt-header title="首页"></mt-header>
        <div class="banner">
            <swiper :options="swiperOption">
              <swiper-slide v-for="slide in swiperSlides"><img :src="slide" alt="" /></swiper-slide>
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <nav class="nav">
           <div>
             <div class="iconfont">&#xe659;</div>
             <p>新闻</p>
           </div>
           <div>
             <div class="iconfont">&#xe611;</div>
             <p>车票</p>
           </div>
           <div>
             <div class="iconfont">&#xe6f7;</div>
             <p>书籍</p>
           </div>
        </nav>
        <loading :show="show"></loading>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                show:false,
                swiperOption: {
                  autoplay: 2000,
                  setWrapperSize :true,
                  pagination : '.swiper-pagination',
                  paginationClickable :true,
                  mousewheelControl : true,
                  observeParents:true,
                },
                swiperSlides: [
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488188534150&di=2fd100a22735791123612643db41eae4&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F04%2F20%2F33%2F150420eb0641922359cf3ebd313c0b68.jpg',
                  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2920199196,3028011055&fm=15&gp=0.jpg',
                  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3137457080,4163893620&fm=23&gp=0.jpg'
                ]
            }
        },
        components: {

        }
   }
</script>
<style scoped>
  .mint-tab-container{
    margin-top: 3px;
  }
  .mint-tab-item-label{
    font-size: 14px !important;
  }
  .nav{
      display: flex;
      flex-wrap:wrap;
      justify-content: space-around;
      padding: .3rem .14rem .1rem;
      border-top: 1px solid #e9e9e9;
      border-bottom: 1px solid #e9e9e9;
      background-color:rgba(233, 233, 233, 0.5);
  }
  .nav > div{
      width: 31%;
      min-height: 75px;
      position: relative;
      justify-content:space-between;
      justify-content:flex-start;
      text-align: center;
  }
  .nav > div > div{
    width:50px;
    height: 50px;
    line-height: 50px;
    /* background-color:#26a2ff; */
    margin:0 auto;
    color:#fff;
    border-radius:50%;
    font-size:30px;
  }
  .nav > div > p{
    padding-top: .1rem;
    line-height:2;
    color:#333;
    font-size:14px;
  }
  .nav > div:nth-child(1) > div{
    background-color:#ea8010;
  }
  .nav > div:nth-child(2) > div{
    background-color:#eb4f38;
  }
  .nav > div:nth-child(3) > div{
    background-color:#11cd6e;
  }
</style>