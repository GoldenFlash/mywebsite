// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import './assets/css/base.css';
import './assets/css/checkout.css';
import './assets/css/login.css';
import './assets/css/product.css';

import {currency} from './util/currency.js';

import vuelazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(Vuex);
//懒加载插件
Vue.use(vuelazyload,{
	// loading:"./assets/loading/loading-balls.svg"
	loading:'/assets/loading/loading-cylon-red.svg'
});

Vue.use(infiniteScroll)//无限滚动插件

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter("currency",currency);

var store = new Vuex.Store({
	state:{
		cartCount:0
	},
	mutations:{
		updateCartCount(state,cartCount){
			state.cartCount +=cartCount
		},
		initCartCount(state,cartCount){
			state.cartCount =cartCount
		}
	}
});

var app=new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
