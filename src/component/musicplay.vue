<template>
    <div :class="['musicplay','animated',musicDate.isOpen ? 'bounceInDown' : '']" v-show="musicDate.isOpen">
        <header>
            <div class="down iconfont" @click="downBtn">&#xe613;</div>
            <p class="musicTitle" v-if="musicDate.musicRes.length > 0">{{musicDate.musicRes[index].songname}}</p>
            <div class="close iconfont" @click="closeBtn">&#xe67a;</div>
        </header>
        <div class="operation flex">
            <div class="iconfont">&#xe6de;</div>
            <div @click="playBtn">
                <div class="iconfont" v-show="!musicDate.isPlay">&#xe612;</div>
                <div class="iconfont" v-show="musicDate.isPlay">&#xe6e0;</div>
            </div>
            <div class="iconfont">&#xe6dd;</div>
            <div class="iconfont" @click="playltBtn">&#xe62f;</div>
        </div>
        <audio id="audioPlay" class="audioPlay" :src="playUrl"></audio>
        <ul class="playList" :style="{bottom:Bottom+'%'}">
            <li v-for="(item,index) in musicDate.musicRes" @click="playlistBtn(index)">
             <span>{{index+1}}</span>
            {{item.singername}}</li>
        </ul>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui/lib/index'
    export default {
        data(){
            return {
                index: 0,
                playUrl: 'http://ws.stream.qqmusic.qq.com/200650888.m4a?fromtag=46',
                Bottom: '-100',
                listOpen: false,
            }
        },
        props:['musicDate'],
        methods:{
            closeBtn(){
                this.$emit('isOpen',false);
            },
            downBtn(){
                this.closeBtn();
                this.musicDate.isPlay = false;
                document.getElementById('audioPlay').pause();
                document.getElementById('audioPlay').currentTime = 0;
            },
            playBtn(){
                if(this.musicDate.musicRes.length === 0){
                    Toast('列表当前暂无音乐')
                    return false;
                }
                this.musicDate.isPlay = !this.musicDate.isPlay;
                if(this.musicDate.isPlay == true ){
                    setTimeout(function(){
                        document.getElementById('audioPlay').play();
                    }, 1000)
                }else{
                    document.getElementById('audioPlay').pause();
                }
            },
            playlistBtn(index){
                this.index = index;
                this.musicDate.isPlay == true;
                this.playBtn();
            },
            playltBtn(){
                if(this.listOpen == false){
                    this.Bottom = '0';
                    this.listOpen = true;
                }else{
                    this.Bottom = '-100';
                    this.listOpen = false;
                }
            }
        }

    }
</script>
<style scoped>
    .musicplay{
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
        height:100%;
        z-index:1000;
        background-color:#03a9f4;
    }
    header{
        width: 100%;
        height:50px;
        line-height:50px;
        font-size:30px;
        color:#fff;
        background-color:rgba(0, 0, 0, .08);
        position: relative;

    }
    .close,.down{
        position: absolute;
        top: 0;
        width:50px;
        height:50px;
        text-align: center;
    }
    .close{
        right: 0;
        font-size:20px;
    }
    .musicTitle{
        width:100%;
        padding: 0 50px;
        text-align: center;
        font-size:16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
                box-sizing: border-box;
    }
    .operation{
        width:80%;
        color:#fff;
        margin:0 auto;
        font-size:46px;
        line-height:46px;
        text-align: center;
    }
    .playList{
        overflow:hidden;
        overflow-y: auto;
        position: absolute;
        bottom:0;
        left: 0;
        width:100%;
        height:200px;
        color:#fff;
        background-color:rgba(255, 255, 255, 0.1);
        -webkit-transition:left .45s; /* Safari */
                transition:left .45s;
    }
    .playList li{
        font-size:14px;
        height:40px;
        line-height:40px;
        margin: 0 15px;
        border-bottom: 1px solid #03a9f4;
    }
    .playList li span{
        width:22px;
        height:22px;
        line-height:22px;
        text-align: center;
        display:inline-block;
        margin: 0 10px 0 5px;
        border-radius:50%;
        background-color:rgba(255, 255, 255, 0.6);
        color:#fff;
    }
</style>