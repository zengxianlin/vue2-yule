<template>
    <div class="prsoonal">
        <mt-header title="个人中心">
          <!-- <router-link to="/" slot="right"> -->
            <mt-button icon="more" @click="popupBtn" slot="right"></mt-button>
          <!-- </router-link> -->
        </mt-header>
        <div class="cell-list">
            <mt-cell title="资料修改" to="/my/revisions" is-link value=""></mt-cell>
            <mt-cell title="资料修改1" to="" is-link value=""></mt-cell>
            <mt-cell title="资料修改2" is-link value=""></mt-cell>
            <mt-cell :title="'设置  '+switchs"><mt-switch v-model="switchs"></mt-switch></mt-cell>
        </div>
        <mt-popup
          v-model="popupVisible"
          position="bottom"
          popup-transition="popup-fade">
            <div class="popup-conent">
                <div class="flex share">
                    <div class="weixin iconfont" @click="ageBox" >&#xe637;</div>
                    <div class="QQ iconfont">&#xe706;</div>
                    <div class="weibo iconfont">&#xe66b;</div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui/lib/index';
    export default {
        data(){
            return {
                popupVisible: false,
                switchs: false,
                message: '分享到...',
                title: '提示'
            }
        },
        methods:{
            popupBtn(){
                this.popupVisible = !this.popupVisible
            },
            ageBox(){
                MessageBox.confirm(this.message, this.title).then(action => {
                    if(action == 'confirm'){
                       console.log('操作成功')
                    }
                    this.popupBtn()
                })
            },
            ajaxBtn(){
                console.log('1')

                console.log(this.$emit())
                console.log(this.$on())


            }
        },
        mounted() {

        }
    }
</script>
<style scoped>
    .mint-popup-bottom{
        width: 100%;
        text-align: center;
    }
    .popup-conent{
        width: 90%;
        margin: 10px auto 20px;
        /* height:1.5rem; */
        /* line-height:1.5rem; */
        -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
                box-sizing: border-box;
    }
    .share > div{
        color:#26a2ff;
        font-size:30px;
        line-height:50px;
        margin: 0 10px 20px;
        border-bottom: 1px solid #26a2ff;
    }
</style>