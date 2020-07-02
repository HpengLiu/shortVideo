import Vue from 'vue'
import Vuex from 'vuex'
// import footer_store from "./modules/footer_store.js"
var url_config = "";
import config_url from "@/common/config.js"
import api from "@/api/index.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		videoList: [],
		baseUrl: config_url,
		user: null,
		advert:{},
		subType: [],
		config:{}
	},
	mutations: {
		setVideoList(state, list) {
			state.videoList = list;
		},
		
		setUser(state, user) {
			state.user = user;
		},
		setSubType(state, subType) {
			state.subType = subType;
		},
		setAdvert(state,advert){
			
			state.advert = advert;
		},
		setConfig(state,config){
			state.config = config;
		}
	},
	actions: {

		getUserInfo(context) {
			var user = uni.getStorageSync("user");
			// var token = document.cookie
			//用户在本地已经存储过 ， 拿出存储的token发送给服务器
			if (user) {
				console.log("请求地址：" + context.state.baseUrl + "user/auth");
				console.log("请求参数：", {
					token: user.token
				});
				var params = {
					token: user.token
				};
				api.userAuth(params).then((res)=>{
					
					if (res == undefined) {
						throw "返回数据为 undefinded";
					}
					if (res.statusCode == 200) {
						console.log("验证用户信息结果", res.data);
					
						//成功
						if (res.data.code == 1) {
							context.commit('setUser', null)
						
						} else {
							context.commit('setUser', res.data.data)
						
						}
					} else {
						throw res.data
					}
				})
				
			} else {
				api.userInfo({}).then((res)=>{
					
					if (res == undefined) {
						throw "返回数据为 undefinded";
					}
					if (res.statusCode == 200) {
						console.log("获取的用户信息", res.data);
						
						//成功
						if (res.data.code == 1) {
							context.commit('setUser', null)
						} else {
							context.commit('setUser', res.data.data)
						}
					} else {
						throw res.data
					}
				})
			}

		},
		addVideoList(context, list) {
			console.log(context.state.videoList, list.length)
			for (let item of list) {
				context.state.videoList.push(item);
			}

			console.log(context.state.videoList, list.length)
		},
		getConfig(context){
			api.config().then((res)=>{
				if(res.data.code==1){
					context.commit("setConfig",{});
				}else{
					context.commit('setConfig',res.data.data)
				}
			})
		}
	},
	// modules: {
	// 	footer_store
	// }
})

export default store
