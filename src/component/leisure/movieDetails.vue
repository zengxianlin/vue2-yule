<template>
    <div class="movieDetails">
        <mt-header title="电影详情">
          <router-link to="/leisure/1" slot="left">
            <mt-button icon="back" >返回</mt-button>
          </router-link>
        </mt-header>
        <section class="film-item">
            <div class="movieBgImg" style="background-image:url('https://gw.alicdn.com/tps/i4/TB1pa7pJFXXXXX6XFXXwwg20FXX-640-448.png')"></div>
            <div class="poster-wrapper"><span :style="{backgroundImage:'url('+contents.images.large+')'}"></span></div>
            <dl>
                <dt>{{contents.title}}</dt>
                <dd>{{contents.original_title}}</dd>
                <dd><span v-for="item in contents.genres">{{item}}&nbsp;</span></dd>
                <dd><span v-for="item in contents.countries">{{item}}&nbsp;</span>| 120分钟</dd>
                <dd>{{contents.year}} 中国上映</dd>
                <dd>想看人数&nbsp;{{contents.wish_count}}</dd>
            </dl>
        </section>
        <section class="summary">
            <p :class="['line-limit',isHover ? 'ellipsis' : '']">{{contents.summary}}</p>
            <mt-button type="primary" size="large" @click="openBtn">{{open}}</mt-button>
        </section>
        <section class="actor">
            <h3>演职人员</h3>
            <ul class="actorlist">
                <li v-for="item in contents.directors">
                    <router-link :to="'/leisure/filmDetails/'+item.id">
                        <img :src="item.avatars.medium" alt="" />
                        <p class="mediumName">{{item.name}}阿士大夫士大夫</p>
                        <p>导演</p>
                    </router-link>
                </li>
                <li v-for="item in contents.casts">
                    <router-link :to="'/leisure/filmDetails/'+item.id">
                        <img :src="item.avatars.medium" alt="" />
                        <p class="mediumName">{{item.name}}</p>
                        <p>演员</p>
                    </router-link>
                </li>
            </ul>
        </section>
        <loading :show="show"></loading>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui/lib/index'
    export default {
        data(){
            return {
                show: true,
                isHover: true,
                open: '展开',
                title:'',
                movieUrl: 'https://api.douban.com/v2/movie/subject/'+this.$route.params.id,
                bottomStatus: '',
                wrapperHeight: 0,
                num:'',
                contents: []
            }
        },
        created() {
            var id = this.$route.params.id;
            this.getMusicUrl()
        },
        methods:{
            getMusicUrl(){
                var _that = this;
                this.$http.jsonp(this.movieUrl).then((response) => {
                    _that.contents = response.body;
                    console.log(_that.contents.images.large)
                    _that.show = false;
                }).catch(function(err){
                    Toast('错误提示：',err);
                })
                // this.$http.jsonp(this.musicUrl).then(function(res){
                //     var data = _that.data = res.data.songlist;
                //     if(data.length === 0){
                //         Toast('当前无'+_that.title+'列表');
                //         return false;
                //     }
                //     for(var i in _that.data){
                //         if(_that.data[i].songname == undefined){
                //             _that.data[i].songname = '';
                //         }
                //     }
                //     for (let i = 1; i <= 20; i++) {
                //         _that.list.push(i);
                //         _that.muscilist.push(data[i]);
                //     }
                //     setTimeout(function(){
                //         _that.show = false;
                //     },1500)
                // }).catch(function(err){
                //     Toast('错误提示：',err);
                // })
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
            openBtn() {
                this.isHover = !this.isHover;
                this.isHover ? this.open = '展开' : this.open = '收起';
            }
        },
        module(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }
</script>
<style scoped>
.film-item{
    position: relative;
    overflow: hidden;
    width:100%;
    height:5.333333rem;
    background-position: center bottom;
    background-size:cover;
    display: box;              /* OLD - Android 4.4- */
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
.movieBgImg{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    z-index:-1;
}
.poster-wrapper{
    position: relative;
    width:3.35rem;
    height: 100%;
    margin-left: 16px;
    margin-right: 16px;
}
.poster-wrapper span{
    position: absolute;
    bottom:0;
    left: 0;
    width:3.35rem;
    height: 4.75rem;
    background-size:cover;
    display: flex;
}
dl{
    color:#fff;
    padding:.3rem .5rem 0 0;
    -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;         /* OLD - Firefox 19- */
    -webkit-flex: 1;          /* Chrome */
    -ms-flex: 1;              /* IE 10 */
    flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
dt{
    font-size:18px;
    line-height:30px;
}
dd{
    font-size:13px;
    opacity:.8;
    line-height:24px;
}
.summary{
    margin-top: 10px;
    padding:15px;
    font-size:14px;
    color:#333;
    line-height:26px;
}
.ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    display: -webkit-box;
    -webkit-line-clamp: 3;
}
.summary button{
    width:85%;
    margin: 20px auto;
}
.actorlist{
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
}
.actor{
    padding: 15px;
    background-image: -webkit-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: -o-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
}
.actor h3{
    font-size:16px;
    font-weight:600;
    line-height:30px;
    margin-bottom: 10px;
}
.actorlist > li{
    width:2.75rem;
    display: inline-block;
    text-align: center;
    color:#999;
    margin-right:6px;
    font-size:13px;
}
.mediumName{
    color:#333;
    line-height:30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
