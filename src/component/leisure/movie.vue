<template>
    <div class="sureMovie">
        <header :class="['flex', 'header', isHover ? 'first' : 'last']" @click="tabBtn">
            <div>正在热映</div>
            <div>即将上映</div>
        </header>
        <ul class="movielist">
            <li v-for="(item,index) in movielist">
                <router-link :to="'/leisure/movieDetails/'+item.id">
                    <div class="movieBgimg">
                        <img :src="item.images.large" alt="" />
                    </div>
                    <div class="movieText">
                        <p>{{item.title}}</p>
                        <p class="average">热度：{{item.rating.average}}</p>
                        <p>导演：{{item.directors[0].name}}</p>
                        <p>主演：{{item.casts[0].name}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
        <loading :show="show"></loading>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui/lib/index'
    export default {
        data(){
            return {
                wasUrl: 'https://api.douban.com/v2/movie/in_theaters',
                soonUrl:'https://api.douban.com/v2/movie/coming_soon',
                show: true,
                isHover: true,
                movielist:[]
            }
        },
        mounted(){
            this.movieList();
        },
        methods:{
            tabBtn(){
                this.isHover = !this.isHover;
                this.show = true;
                this.movieList()
            },
            movieList(){
                var _that = this;
                _that.isHover ? _that.movieUrl = _that.wasUrl : _that.movieUrl = _that.soonUrl;
                this.$http.jsonp(_that.movieUrl).then((response) => {
                    _that.movielist = response.body.subjects;
                    _that.show = false;
                })
                .catch(function(err){
                    Toast('错误提示：电影列表'+err.status);
                })
            }
        }
    }
</script>
<style type="text/css">
    .header{
        text-align: center;
        font-size:14px;
        line-height:40px;
    }
    .header.first > div:first-child{
        color:#fff;
        background-color:#26a2ff;
    }
    .header.last > div:last-child{
        color:#fff;
        background-color:#26a2ff;
    }
    .movielist li a{
        display: box;              /* OLD - Android 4.4- */
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
        padding:.4rem;
        background-image: -webkit-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: -o-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: bottom left;
    }
    .movielist .movieBgimg{
        width:80px;
        margin-right:.4rem;
    }
    .movielist .movieText{
        -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1;         /* OLD - Firefox 19- */
        -webkit-flex: 1;          /* Chrome */
        -ms-flex: 1;              /* IE 10 */
        flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height:1.4;
    }
    .movieText p{
        padding-bottom: .15rem;
        color:#666;
    }
    .movieText p:nth-child(1){
        font-size:14px;
        color:#333;
    }
    .starMod{
        width:50px;
        height: 10px;
        background:#f40;
        margin-bottom: .2rem;
    }
</style>