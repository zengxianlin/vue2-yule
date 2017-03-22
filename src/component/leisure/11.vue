<template>
    <div class="musiclist">
        <mt-header :title="title+'列表'">
          <router-link to="/leisure/1" slot="left">
            <mt-button icon="back" >返回</mt-button>
          </router-link>
        </mt-header>
        <audio id="audioPlay" :src="playUrl"></audio>
        <!-- {{$route.params.id}} -->
        <div class="list">
            <mt-cell @click.native="audioPaly(item.url)" :class="{pause: playing}" :title="item.songname" :label="item.singername" is-link v-for="(item, index) in muscilist" >
                <img class="songImg" slot="icon" :src="item.albumpic_small">
            </mt-cell>
        </div>
        <div class="toggleStatus" v-if="type === true">
           <mt-button type="primary" @click="toggleStatus1">播放</mt-button>
           <mt-button type="danger" @click="toggleStatus2">暂停</mt-button>
        </div>

    </div>
</template>
<script>
    import { Toast } from 'mint-ui/lib/index'
    export default {
        data(){
            return {
                title:'',
                musicUrl: '',
                muscilist:[],
                playUrl: '',
                type: true,
                playing: false
            }
        },
        created() {
            var id = this.$route.params.id;
            if(id == '101'){
                this.title = '热门榜';
                this.musicUrl = '../src/data/musicHot.json';
            }else if(id == '102'){
                this.title = '新歌榜';
                this.musicUrl = '../src/data/musicNew.json';
            }else if(id == '103'){
                this.title = '推荐榜';
                this.musicUrl = '../src/data/musicPut.json';
            }else{
                this.title = '主题音乐';
                this.musicUrl = '../src/data/musicUs.json';
            }
            this.getMusicUrl()
        },
        methods:{
            getMusicUrl(){
                var _that = this;
                this.$ajax.get(this.musicUrl).then(function(res){
                    var data = res.data.songlist;
                    if(data.length === 0){
                        Toast('当前无'+_that.title+'列表');
                        return false;
                    }
                    _that.muscilist = data;
                    _that.play = data[0].url;
                }).catch(function(err){
                    Toast('错误提示：',err);
                })
            },
            canPlaySong(){

            },
            audioPaly(url){
                this.playUrl = url
                setTimeout(function(){
                    document.getElementById('audioPlay').play();
                    this.type = true;
                    this.playing = false
                },1000)
            },
            toggleStatus(){
                if(this.playing == true ){
                    setTimeout(function(){
                        document.getElementById('audioPlay').play();
                        this.playing = false;
                    },1000);
                }else{
                    setTimeout(function(){
                        document.getElementById('audioPlay').pause();
                        this.playing = true;
                    },1000);
                }
                console.log(this.playing)

            },
            toggleStatus1(){
                setTimeout(function(){
                    document.getElementById('audioPlay').play();
                    this.playing = true;
                },1000);
            },
            toggleStatus2(){
                setTimeout(function(){
                    document.getElementById('audioPlay').pause();
                    this.playing = false;
                },1000);
            }

        },
        module(){
        }
    }
</script>
<style>
.musiclist .mint-header{
  position: fixed !important;
  top: 0;
  left: 0;
  z-index:122;
  width:100%;
}
.musiclist{
  padding-top: 40px;
}
.list{
    padding-bottom: 60px;
}
.mint-cell-wrapper{
    font-size:14px !important;
    padding-left: 14px !important;
}
.mint-cell-label{
    font-size:10px !important;
}
.list .mint-cell-wrapper .mint-cell-title{
    margin-left:44px !important;;
}
.songImg{
    position: absolute;
    top: 50%;
    left: 12px;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    border-radius:50%;
}
.musiclist .mint-cell{
    min-height: 50px !important;
}

.musiclist .mint-cell-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.toggleStatus{
    position: fixed;
    right:0;
    top: 50%;
    height:100px;
    width: 150px;
    margin-top: -50px;
}
</style>