<template>
    <div class="briefed">
        <mt-header fixed title="资讯"></mt-header>
        <nav class="nav">
            <ul class="navlist">
                <li :class="[num == item[0] ? 'hover' : '']" v-for="(item, index) in cancellist" @click="navBtn(index,item[0])">{{item[1]}}</li>
            </ul>
            <div class="spreadBtn iconfont" @click="spreadBtn">&#xe62d;</div>
        </nav>
        <ul class="briefedlist">
            <li v-for="(item,index) in datalist" @click="brieBtn(item.url)">
                <h3>{{item.title}}</h3>
                <div class="bgImg">
                    <img :src="item.thumbnail_pic_s" alt="" />
                    <img :src="item.thumbnail_pic_s02" alt="" />
                    <img :src="item.thumbnail_pic_s03" alt="" />
                </div>
                <p>{{item.author_name}} &nbsp; {{item.date}}</p>
            </li>
        </ul>
        <div :class="['supervise', isHover ? 'hover' : '']">
            <mt-header title="频道管理">
               <mt-button icon="back" slot="left" @click="backBtn">返回</mt-button>
            </mt-header>
            <p>点击删除频道</p>
            <ul class="cancellist">
                <li v-for="(item,index) in cancellist" data-type="123" @click="cancelBtn(index)" ><span>{{item[1]}}</span></li>
            </ul>
            <p>点击添加频道</p>
            <ul class="additionlist">
                <li v-for="(item,index) in additionlist" @click="additionBtn(index)" ><span>{{item[1]}}</span></li>
            </ul>
        </div>
        <div :class="['supervise', isDetails ? 'details' : '']">
            <mt-header title="资讯详情">
               <mt-button icon="back" slot="left" @click="backBtn">返回</mt-button>
            </mt-header>
            <iframe name="FrameName" class="iframe" :src="detailsUrl"></iframe>
            <!-- <a :href="detailsUrl"></a> -->
        </div>
        <loading :show="show"></loading>
    </div>
</template>
<script type="text/javascript">
    import { Toast } from 'mint-ui/lib/index'
    export default {
        data(){
            return {
                show: true,
                cancellist: [['top','头条'],['shehui','社会'], ['guonei','国内'], ['guoji','国际'], ['yule','娱乐'], ['tiyu','体育'], ['junshi','军事'], ],
                additionlist: [['keji','科技'], ['caijing','财经'], ['shishang','时尚']],
                isHover: false,
                num: 'top',
                datalist: [],
                isDetails: false,
                detailsUrl: ''
            }
        },
        created(){

        },
        mounted(){
            this.briefedlist(this.cancellist[0][0]);
             this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters?count=20', {}, {
                headers: {
                    'Access-Control-Allow-Origin': true
                },
                emulateJSON: true
            }).then(function(response) {
                // 这里是处理正确的回调
                console.log(response)
            }, function(response) {
                // 这里是处理错误的回调
                console.log(response)
            });
        },
        methods:{
            navBtn(index,item){
                this.briefedlist(item);
                this.show = true;
                this.num = item;
            },
            spreadBtn(){
                this.isHover = true;
            },
            backBtn(){
               this.isHover = false;
               this.isDetails = false;
               this.detailsUrl = '';
            },
            cancelBtn(index){
                if(index == 0){
                    return false;
                }
                if(this.cancellist.length === 4){
                    Toast('必须保留四个频道');
                    return false;
                }
                this.additionlist.push(this.cancellist[index]);
                this.cancellist.splice(index,1);
            },
            additionBtn(index){
                this.cancellist.push(this.additionlist[index]);
                this.additionlist.splice(index,1);
            },
            briefedlist(type){
                var _that = this;
                var url = '../src/data/news-'+type+'.json';
                this.$ajax.get(url).then(function(res){
                    var data = res.data.data;
                    for(var i in data){
                        if(data[i].thumbnail_pic_s02 == undefined || res.data.data[i].thumbnail_pic_s03 == undefined){
                            data[i].thumbnail_pic_s02 = data[i].thumbnail_pic_s03 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488361751377&di=678cc5510933bf36be37c79770ef7e33&imgtype=0&src=http%3A%2F%2Fds.devstore.cn%2F20141112%2F1415779700880%2F16.jpg';
                        }
                    }
                    _that.datalist = res.data.data;
                    setTimeout(function(){
                        _that.show = false;
                    },1500)
                }).catch(function(err){
                    Toast('错误提示：',err);
                    _that.show = false;
                })
            },
            brieBtn(url){
                this.isDetails = true;
                this.detailsUrl = url;
            }
        },
        components: {

        }
   }
</script>
<style type="text/css">
    .nav{
        position: fixed;
        top:40px;
        right: 0;
        left: 0;
        z-index:200;
        /* background-color:rgba(233, 233, 233, 0.8); */
        background-color:#dedede;
    }
    .navlist{
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        line-height:40px;
        font-size:14px;
        color:#333;
        margin:0 10px;
    }
    .navlist li{
        padding-left: 6px;
        padding-right: 16px;
        display: inline-block;
    }
    .navlist li:last-child{
        padding-right: 0;
        margin-right:40px;
    }
    .navlist li.hover{
        color:#26a2ff;
    }
    .spreadBtn{
        position: absolute;
        top: 0;
        right:0;
        width:40px;
        height: 40px;
        line-height:40px;
        background-color:rgba(255, 255, 255, 0.8);
        text-align: center;
        font-size:24px;
        color:#26a2ff;
    }
    .supervise{
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
        height:100%;
        background-color:#fff;
        z-index:1000;
        -webkit-transition: all 0.2s linear;
                transition: all 0.2s linear;
          -webkit-transform: translate3d(100%, 0, 0);
                  transform: translate3d(100%, 0, 0);
    }
    .supervise.hover,.supervise.details{
          -webkit-transform: translate3d(0, 0, 0);
                  transform: translate3d(0, 0, 0);
    }
    .supervise > p{
        background-color:#e9e9e9;
        line-height:24px;
        text-indent:10px;
        color:#888;
    }
    .cancellist li:first-child span{
        background-color:#f0f0f0;
    }
    .supervise ul{
        overflow: hidden;
        margin-top: 10px;
    }
    .supervise ul > li{
        width:25%;
        float: left;
        text-align: center;
        line-height:30px;
        -webkit-animation: zoomIn 300ms ease;
    }
    @-webkit-keyframes zoomIn {
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3,.3,.3);
            transform: scale3d(.3,.3,.3);
        }

        50% {
            opacity: 1;
        }
    }
    .supervise ul > li span{
        margin:0 10px 10px;
        border: 1px solid #ddd;
        font-size:16px;
        display: block;
        color:#333;
    }
    .bgImg{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;
    }
    .bgImg img{
        width: 31%;
        height:3rem;
        justify-content:space-between;
        justify-content:flex-start;
    }
    .briefedlist{
        margin-top: 80px;
        padding:12px 10px;
    }
    .briefedlist li{
        text-indent:4px;
        padding-bottom:14px;
        margin-bottom: 12px;
        background-image: -webkit-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: -o-linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(#d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: bottom left;
    }
    .briefedlist h3{
        font-size:14px;
        line-height:1;
        margin-bottom: 10px;
        color:#333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .briefedlist p{
        padding-top: 6px;
        color:#999;
    }
    iframe{
        width: 100%;
        height: 100%;
        margin-top: -75px;
    }
    .news-gg-img3{
        display: none !important;
    }
</style>