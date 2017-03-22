import Vue from 'vue'
import App from './App.vue'
import router from './router'
import loading from './loading'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource'

Vue.use(loading);
Vue.use(VueResource);

Vue.use(VueAwesomeSwiper)
import axios from 'axios'

//关于axios配置
axios.interceptors.request.use(function(config) { //发送请求
    return config;
}, function(error) {
    return Promise.reject(error);
});


axios.interceptors.response.use(function(response) { //请求回来
    return response;
}, function(error) {
    return Promise.reject(error);
});
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.baseURL='http://api.douban.com/'; //配置请求根路径
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$ajax = axios; //把axios对象挂到Vue原型上

Vue.http.options.headers={
'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
};
// post的时候会把JSON对象转成formdata
Vue.http.options.emulateJSON=true;

import './MintUI/index.js'  // 引入 mint-ui

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
