<template>
    <div class="sureMusic">
        <nav v-if="!show">
            <ul class="flex topped">
                <li class="hot-topped ">
                    <router-link to="/leisure/musiclist/101">
                        <em class="iconfont">&#xe722;</em>
                        <p>热门榜</p>
                    </router-link>
                </li>
                <li class="new-topped ">
                    <router-link to="/leisure/musiclist/102">
                        <em class="iconfont">&#xe604;</em>
                        <p>新歌榜</p>
                    </router-link>
                </li>
                <li class="put-topped ">
                    <router-link to="/leisure/musiclist/103">
                        <em class="iconfont">&#xe65d;</em>
                        <p>推荐榜</p>
                    </router-link>
                </li>
            </ul>
            <div class="newModule">
                <mt-cell :title="header" to="/leisure/musiclist/104" is-link>更多</mt-cell>
                <ul class="moudle-list">
                    <li v-for="(item, index) in songlist" @click="btn">
                        <img :src="item.albumpic_big" :alt="item.singername" />
                        <em class="iconfont">&#xe6bf;&nbsp;{{item.singerid}}万</em>
                        <p>{{item.songname}}</p>
                    </li>
                </ul>
            </div>
        </nav>
        <loading :show="show"></loading>
    </div>
</template>
<script>
    import { InfiniteScroll , Indicator , Toast } from 'mint-ui/lib/index'
    export default {
        data(){
            return {
                selected: '1',
                musicUrl: '../src/data/musicUs.json',
                musicUrl1: '../src/component/my/music.json',
                songlist:[],
                show: true
            }
        },
                props:['header'],
        mounted(){
            this.musicList();
        },
        created(){

        },
        methods:{
            btn(){
                // console.log('2')
                 // this.$emit('isOpen',true);
            },
            musicList(){
                var _that = this;
                this.$ajax.get(_that.musicUrl).then(function(res){
                    var data = res.data.songlist;
                    if(data.length !== 0){
                        for(var i in data){
                            if(i<=11){
                                _that.songlist.push(data[i]);
                            }
                        }
                        setTimeout(function(){
                            _that.show = false;
                        },1500)
                    }
                }).catch(function(err){
                    console.log('错误提示：',err);
                })
            }
        }
   }
</script>
<style scoped>
    .sureMusic{
       background-color:#f2f4f5;
    }
    .topped li{
       font-size:14px;
       padding:12px 0;
       text-align: center;
    }
    .topped em{
        display: block;
        font-size:40px;
        height: 1.0rem;
        line-height:1.0rem;
        padding-bottom:10px;
        font-weight: 500;
    }
    .topped li:nth-child(1) em{
        color:#e34951;
    }
    .topped li:nth-child(2) em{
        color:#26a2ff;
    }
    .topped li:nth-child(3) em{
        color:#f36192;
    }
    .topped p{
        color:#333;
        font-size:13px;
    }
    .moudle-list{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;
        padding: .3rem .14rem 0;
        background-image: -webkit-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: -o-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
    }
    .moudle-list li{
        width: 31%;
        position: relative;
        justify-content:space-between;
        justify-content:flex-start;
    }
    .moudle-list img{
        width:100%;
        height:3rem;
        background-color:#000;
    }
    .moudle-list p{
        line-height:2;
        text-align: center;
        margin-bottom: .15rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .moudle-list em{
        position: absolute;
        top: 0;
        left:0;
        width:100%;
        height:.5rem;
        line-height:.5rem;
        padding-right:6px;
        background-color:rgba(0,0,0,.5);
        color:#fff;
        text-align: right;
        -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
                box-sizing: border-box;
    }
    .mint-cell-wrapper{
        font-size:13px !important;
    }
</style>