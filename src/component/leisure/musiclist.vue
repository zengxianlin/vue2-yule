<template>
    <div class="musiclist">
        <mt-header :title="title+'列表'">
          <router-link to="/leisure/1" slot="left">
            <mt-button icon="back" >返回</mt-button>
          </router-link>
        </mt-header>
        <audio id="audioPlay" :src="playUrl"></audio>
        <div class="toggleStatus">
           <mt-button type="primary" @click="toggleStatus1">播放</mt-button>
           <mt-button type="danger" @click="toggleStatus2">暂停</mt-button>
        </div>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="list page-loadmore-list">
                <mt-cell @click.native="audioPaly(index,item.url)" class="page-loadmore-listitem" :title="item.songname" :label="item.singername" is-link v-for="(item, index) in muscilist" >
                    <img class="songImg" slot="icon" :src="item.albumpic_small">
                </mt-cell>
            </div>
          </mt-loadmore>
        </div>
        <loading :show="show"></loading>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui/lib/index'
    export default {
        data(){
            return {
                show: true,
                title:'',
                musicUrl: '',
                muscilist:[],
                playUrl: '',
                type: true,
                playing: false,
                list: [],
                allLoaded: false,
                bottomStatus: '',
                wrapperHeight: 0,
                num:'',
                data: '',
                musicRes: []
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
                    var data = _that.data = res.data.songlist;
                    if(data.length === 0){
                        Toast('当前无'+_that.title+'列表');
                        return false;
                    }
                    for(var i in _that.data){
                        if(_that.data[i].songname == undefined){
                            _that.data[i].songname = '';
                        }
                    }
                    for (let i = 1; i <= 20; i++) {
                        _that.list.push(i);
                        _that.muscilist.push(data[i]);
                    }
                    setTimeout(function(){
                        _that.show = false;
                    },1500)
                }).catch(function(err){
                    Toast('错误提示：',err);
                })
            },
            handleBottomChange(status) {
              this.bottomStatus = status;
            },
            loadBottom() {
                // Toast('数据加载中...');
              setTimeout(() => {
                let lastValue = this.list[this.list.length - 1];
                if (lastValue < this.data.length) {
                  for (let i = 1; i <= 20; i++) {
                    this.list.push(lastValue + i);
                    this.muscilist.push(this.data[lastValue + i])
                  }
                } else {
                  this.allLoaded = true;
                  Toast('暂无数据...');
                }
                this.$refs.loadmore.onBottomLoaded();
              }, 1500);
            },
            audioPaly(index,url){
                this.musicRes.push(this.muscilist[index])
                // 存储到本地
                sessionStorage.musicRes = JSON.stringify(this.musicRes);
                //读取
                var arr1 = sessionStorage.musicRes;
                //重新转换为对象
                console.log(arr1)

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
                this.$emit('isOpen',true);
                if(this.playUrl == ''){
                    this.playUrl = this.muscilist[0].url;
                }
                setTimeout(function(){
                    document.getElementById('audioPlay').play();
                    this.playing = true;
                },1000);
            },
            toggleStatus2(){
                // setTimeout(function(){
                    document.getElementById('audioPlay').pause();
                    this.playing = false;
                // },1000);
            },
        },
        module(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }
</script>
<style>
.musiclist .mint-header{
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 300 !important;
  width:100%;
}
.list{
    /*padding-bottom: 40px;*/
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
    z-index:2222;
}
.mint-spinner-snake{
    border-top-color: #26a2ff !important;
    border-left-color: #26a2ff !important;
    border-bottom-color: #26a2ff !important;
    margin: 0 auto !important;
}
.mint-loadmore-bottom{
    margin-bottom: 0 !important;
    /*padding-bottom: 50px;*/
}
.mint-loadmore-bottom{
    /*color:#26a2ff !important;;*/
}
</style>