<template>
    <div class="recreation">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">音乐</mt-tab-item>
          <mt-tab-item id="2">电影</mt-tab-item>
          <!-- <mt-tab-item id="3">综合</mt-tab-item> -->
        </mt-navbar>
        <Banner></Banner>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <Music header="主题音乐"></Music>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <Movie></Movie>
          </mt-tab-container-item>
          <!-- <mt-tab-container-item id="3">
            <mt-cell v-for="n in 6" :title="'选项 ' + n" />
          </mt-tab-container-item> -->
        </mt-tab-container>
        <router-view></router-view>
    </div>
</template>
<script>
    import Banner from './../banner.vue'
    import Music from './../leisure/music.vue'
    import Movie from './../leisure/movie.vue'
    export default{
        data(){
            return {
                selected: '1'
            }
        },
        components: {
            Banner,
            Music,
            Movie
        },
        methods:{

        },
        mounted(){
            // this.$ajax.get('https://bird.ioliu.cn/netease?playlist_id=222222').then(function(res){
            //     console.log(res.data)
            // }).catch(function(err){
            //     console.log('错误提示：',err);
            // })
            // this.$ajax.get('../src/component/my/music.json').then(function(res){
            //     console.log(res.data)
            // }).catch(function(err){
            //     console.log('错误提示：',err);
            // })
        }
    }
</script>
<style scoped>
    .leisure{
        width: 100%;
        height: 1000px;
        display: block;
        /* background-color:#f40; */
    }
    .mint-tab-container{
        margin-top: 0;
    }
    .mint-navbar .mint-tab-item.is-selected{
        margin-bottom: 0
    }
</style>