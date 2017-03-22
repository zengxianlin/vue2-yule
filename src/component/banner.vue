<template>
    <div class="banner">
        <swiper :options="swiperOption">
          <swiper-slide v-for="slide in swiperSlides"><img :src="slide" alt="" /></swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    export default {
      name: 'carrousel',
      data() {
        return {
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
      mounted() {

      }
    }
</script>
<style scoped>
  img{
    width:100%;
  }
</style>