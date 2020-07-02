import Vue from 'vue'
import App from './App'
import api from './api/index.js'
import config from './common/config.js'
import util from './common/util.js'
// import babelPolyfill from 'babel-polyfill'
// Vue.config.productionTip = false 
// Vue.use(babelPolyfill)

// 引入vuex 状态库
import store from "./store";
Vue.prototype.$loading = function(status) {
	if (status) {
		if (status == "1" || status == "0") {

			store.commit("switch_loading", status)
		} else {
			console.log("输入的参数 有误，应为 0/1");
		}
	} else {
		store.commit("switch_loading", 'change')
	}
};
// 状态数据

Vue.prototype.$api = api;
Vue.prototype.$store = store;
Vue.prototype.$config = config;
Vue.prototype.$utils = util;
App.mpType = 'app'


Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}
const app = new Vue({
	store,
	...App
})
app.$mount()
