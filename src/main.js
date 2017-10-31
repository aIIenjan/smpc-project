// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from 'components/pages/app/app'
import routes  from './router'
// import store from './vuex/store'
// import store from './store/index'
import Vuex from 'vuex'
import axios from 'axios'
import md5 from 'md5'
// import store from 'videojs-contrib-hls'
Vue.prototype.$md5 = md5
Vue.prototype.Base64 = require('js-base64').Base64
import cookies from 'js-cookie'
Vue.prototype.$cookie = cookies
import $ from 'jquery'
import global_ from 'components/globle/globle'
import VueLazyload from "vue-lazyload"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import SocialSharing from 'vue-social-sharing'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'
// import VideoPlayer from 'vue-video-player'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import 'common/css/video-js.css'
// import 'common/js/video.js'
// import 'common/js/videojs-contrib-hls.js'

import {getCookie, GetDateDiff, getNowFormatDate} from './util'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.GLOBAL = global_

// Vue.use(VideoPlayer)

Vue.use(VueVideoPlayer)
Vue.use(SocialSharing)
Vue.use(ElementUI)

Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)

Vue.use(require('vue-wechat-title')); //实例化参数

Vue.use(VueLazyload, {error: 'static/error.jpg'})

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	linkExactActiveClass: 'mode-active',
	routes
})

/* eslint-disable no-new */
new Vue({
	router,
	// store,
	el: '#app',
	render: h => h(App)
})
