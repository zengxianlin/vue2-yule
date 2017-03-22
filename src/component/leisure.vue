<template>
    <div class="leisure">
        <mt-header title="休闲"></mt-header>
        <transition name="slide-down">
            <router-view></router-view>
        </transition>
        <!-- {{$route.params}} -->
    </div>
</template>
<script>
    import Music from './leisure/music.vue'
    import Banner from './banner.vue'
    export default{
        data(){
            return {
                selected: '1'
            }
        },
        components: {
            Music,
            Banner
        },
        methods:{
            getID(){
                // this.selected = this.$route.params.id
                // console.log(this.$route.params.id)
            }
        },
        created(){
        },
        mounted(){
            this.getID()
        }
    }
</script>
<style>
    .recreation .mint-tab-item-label{
        font-size:14px !important;
    }
</style>