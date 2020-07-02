<template>
	<view style="height: 100vh;">
		<!-- 顶部开始 -->
		<view class="head shadow" style="background-color: #F1F1F1;">
			<view class="title_wrap">
				<view class="" style="text-align: center; width: 100%;line-height: 88rpx;font-size: 34rpx;color:#333333;">
					<text>短视频</text>
				</view>
			</view>
		</view>
		<!-- 顶部结束 -->


		<refresh ref="refresh" @isRefresh="isRefresh"></refresh>
		<!-- 	<swiper :style="{height:sysheight+'px'}" :indicator-dots="false" :current="active" :autoplay="false" :duration="300"
		 @change="changeCurrent"> -->
		<swiper-item v-for="(item,index) in tabList" :key="index" :item-id="'item_'+index">

			<scroll-view style="height: 92%;border-radius: 25px;" scroll-y="true" class="content" @scrolltolower="onLoadMore"
			 @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
				<video-page class="video-page" :videoList="tabList[0].videoList" :page="tabList[0].page" :type="tabList[0].id"></video-page>

				<view :style="{'textAlign':'center'}" class="loading">
					<text v-if="!tabList[active].isMore">暂无更多数据</text>
				<load-dh v-if="tabList[active].isMore"></load-dh>
				</view>
				<view v-if="tabList[active].videoList.length>15" class="white-footer"></view>
			</scroll-view>

		</swiper-item>
		<!-- </swiper>
 -->
	</view>
</template>
<script>
	// 引入下拉刷新
	import refresh from '@/components/refresh/refresh.vue';
	import videoPage from "@/components/video/video-page.vue"
	import loadDh from "@/components/loading.vue"
	export default {
		components: {
			videoPage,
			refresh,
			loadDh
		},
		data() {
			return {
				// selectModalData: [{
				// 		title: '复制'
				// 	},
				// 	{
				// 		title: '不感兴趣'
				// 	},
				// 	{
				// 		title: '内容重复'
				// 	},
				// 	{
				// 		title: '屏蔽此人'
				// 	},
				// ],
				// shareData: [{
				// 		title: '微信好友',
				// 		icon: '/static/img/fenxiang1.png'
				// 	},
				// 	{
				// 		title: '朋友圈',
				// 		icon: '/static/img/fenxiang2.png'
				// 	},
				// 	{
				// 		title: 'QQ好友',
				// 		icon: '/static/img/fenxiang3.png'
				// 	},
				// 	{
				// 		title: 'QQ空间',
				// 		icon: '/static/img/fenxiang4.png'
				// 	},
				// ],
				index: 0,
				sysheight: 0,
				swiperHeight: 0,
				active: 0,
				page: 1,
				tabList: [{
						init: false,
						id: "hot",
						title: "热门",
						videoList: [],
						page: 1,
						isMore: true,
						showAd: true,
						type: 0,
						loadmore: false
					}
					// , {
					// 	init: false,
					// 	id: "new",
					// 	title: "最新",
					// 	videoList: [],
					// 	page: 1,
					// 	isMore: true,
					// 	showAd: true,
					// 	type: 0,
					// 	loadmore: false
					// },
					// {
					// 	init: false,
					// 	id: "iliao",
					// 	title: "爱聊",
					// 	data: [],
					// 	page: 1,
					// 	isMore: true,
					// 	showAd: true,
					// 	type: 1,
					// 	loadmore: false
					// },
					// {
					// 	init: false,
					// 	id: "images",
					// 	title: "图吧",
					// 	data: [],
					// 	page: 1,
					// 	isMore: true,
					// 	showAd: true,
					// 	type: 1,
					// 	loadmore: false
					// }
				],
				clickItem: {}
			}
		},
		created() {
			this.sysheight = uni.getSystemInfoSync().windowHeight
			this.init();

		},
		onShow() {

		},
		methods: {
			init(key) {
				// 最热视频列表初始化获取
				if (!key) {
					key = 0;
				}
				var item = this.tabList[key];
				if (item.init) {
					return;
				}
				this.tabList[key].init = true;
				if (item.type == 0) {
					this.$api.videoList({
						'type': item.id,
						'page': item.page
					}).then(res => {
						console.log(res.data)
						console.log(res.data.data)



						if (res.data.code == 1) {

							uni.showToast({
								title: '暂无数据',
								icon: "none"
							});
							this.tabList[key].loadmore = false;
							this.tabList[key].isMore = false;
							this.tabList[key].videoList = [];
							return;
						}

						// 获得数据 
						this.tabList[key].videoList = res.data.data;
						// console.log(this.)

						if (res.data.data.length < 20) {
							this.tabList[key].loadmore = false;
							this.tabList[key].isMore = false;
						}
						//this.onLoadMore();
					}).catch(res => {
						// 失败进行的操作
						uni.showToast({
							title: res.msg,
							icon: "none"
						});

					})
				} else if (item.type == 1) {
					var type = key - 2;
					this.$api.textImageList({
						type: type
					}).then((res) => {
						console.log("TextImage", res);
						if (res.data.code == 1) {
							uni.showToast({
								title: '暂无数据',
								icon: "none"
							});
							this.tabList[key].loadmore = false;
							this.tabList[key].isMore = false;
							this.tabList[key].videoList = [];
							return;
						}
						this.tabList[key].videoList = res.data.data;
						if (res.data.data.length < 20) {
							this.tabList[key].loadmore = false;
							this.tabList[key].isMore = false;
						}
					}).catch(res => {
						// 失败进行的操作
						uni.showToast({
							title: res.msg,
							icon: "none"
						});

					})
				}
			},
			//点击头像事件
			tapAvater(uid) {
				uni.navigateTo({
					url: '/pages/index/user/other?uid=' + uid
				})
			},
			previmg(urls, index) {
				urls = urls.map((item, key) => {
					return this.formatUrl(item)
				})
				console.log("预览图片", urls, index);
				uni.previewImage({
					current: index,
					indicator: "default",
					urls: urls,
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							switch (data.tapIndex) {
								case 0: //保存图片
									uni.downloadFile({
										url: urls[data.index],
										success: (res) => {
											if (res.statusCode === 200) {
												uni.saveImageToPhotosAlbum({
													filePath: res.tempFilePath,
													success: function() {
														uni.showToast({
															title: "保存成功"
														});
													},
													fail: function() {
														uni.showToast({
															title: "保存失败，请稍后重试",
															icon: "none"
														});
													}
												});
											}
										}
									})
									break;
							}
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			StringtoArray(images) {
				if (images == undefined || images == "") {
					return [];
				}
				return images.split(",");
			},
			// showModelData(key) {
			// 	this.clickItem = key;
			// 	var res = {
			// 		clickItem: key,
			// 		data: this.selectModalData,
			// 		type: "select"
			// 	};
			// 	uni.$emit("showModelData", res)
			// },
			// // showModelDataShare(key) {
			// // 	this.clickItem = key;
			// // 	var res = {
			// // 		clickItem: key,
			// // 		data: this.shareData,
			// // 		'type': 'share'
			// // 	};
			// // 	uni.$emit("showModelData", res)
			// // },
			// onConfirm(e) {
			// 	var provider = "",
			// 		scene = "",
			// 		type = 1
			// 	let item = this.tabList[this.active].videoList[this.clickItem];
			// 	switch (e.title) {
			// 		case "复制":

			// 			uni.setClipboardData({
			// 				data: item.content,
			// 				success: function() {
			// 					uni.showToast({
			// 						title: '复制成功',
			// 					});
			// 				}
			// 			});

			// 			break;
			// 		case "不感兴趣":
			// 			/* this.tabList[this.active].videoList.some((item, i) => {
			// 				if (i == this.clickItem) {
			// 					this.tabList[this.active].videoList.splice(i, 1)
			// 					//在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
			// 					return true
			// 				}
			// 			})
			// 			this.$set(this.tabList[this.active],'videoList',this.tabList[this.active].videoList) */
			// 			uni.showToast({
			// 				title: '以后少为您推荐该内容',
			// 				icon: 'none'
			// 			});
			// 			break;
			// 		case "内容重复":
			// 			uni.showToast({
			// 				title: '已提交',
			// 				icon: 'none'
			// 			});
			// 			break;
			// 		case "屏蔽此人":
			// 			uni.showToast({
			// 				title: '已为您屏蔽此人',
			// 				icon: 'none'
			// 			});
			// 			break;
			// 		case "微信好友":
			// 			provider = "weixin"
			// 			scene = "WXSceneSession"
			// 			uni.share({
			// 				provider: provider,
			// 				scene: scene,
			// 				type: type,
			// 				title: this.subContent(item.content),
			// 				summary: item.content,
			// 				href: "http://songshu.youyacao.com/",
			// 				success: function(res) {
			// 					console.log("success:" + JSON.stringify(res));
			// 				},
			// 				fail: function(err) {
			// 					console.log("fail:" + JSON.stringify(err));
			// 				}
			// 			});
			// 			break
			// 		case "朋友圈":
			// 			provider = "weixin"
			// 			scene = "WXSenceTimeline"
			// 			uni.share({
			// 				provider: provider,
			// 				scene: scene,
			// 				type: type,
			// 				title: this.subContent(item.content),
			// 				summary: item.content,
			// 				href: "http://songshu.youyacao.com/",
			// 				success: function(res) {
			// 					console.log("success:" + JSON.stringify(res));
			// 				},
			// 				fail: function(err) {
			// 					console.log("fail:" + JSON.stringify(err));
			// 				}
			// 			});
			// 			break
			// 		case "QQ好友":
			// 			provider = "qq"
			// 			scene = ""
			// 			uni.share({
			// 				provider: provider,
			// 				scene: scene,
			// 				type: type,
			// 				title: this.subContent(item.content),
			// 				summary: item.content,
			// 				href: "http://songshu.youyacao.com/",
			// 				success: function(res) {
			// 					console.log("success:" + JSON.stringify(res));
			// 				},
			// 				fail: function(err) {
			// 					console.log("fail:" + JSON.stringify(err));
			// 				}
			// 			});
			// 			break
			// 		case "QQ空间":
			// 			provider = "qq"
			// 			scene = ""
			// 			uni.share({
			// 				provider: provider,
			// 				scene: scene,
			// 				type: type,
			// 				title: this.subContent(item.content),
			// 				summary: item.content,
			// 				href: "http://songshu.youyacao.com/",
			// 				success: function(res) {

			// 				},
			// 				fail: function(err) {
			// 					console.log("fail:" + JSON.stringify(err));
			// 				}
			// 			});
			// 			break;

			// 	}
			// },
			onCancel() {

			},
			subContent(text) {
				if (text == undefined) {
					return;
				}
				return text.slice(0, 80) + (text.length > 50 ? "......" : "")
			},
			formatUrl(url, scale) {
				if (!scale) {
					scale = 1;
				}
				if (url == undefined) {
					return "";
				}
				var index = url.indexOf("http");
				if (index == 0) {
					return url;
				}
				return this.$store.state.baseUrl + "/thumb/" + scale + "?url=" + url;
			},
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			//刷新名需写为isRefresh,刷新组件中会回调此事件
			isRefresh() {
				this.refresh();
			},
			/**
			 * @param {Object} type 切换的选项卡ID
			 */
			changeTab: function(type) {

				this.active = type;
			},
			loadmore() {
				//console.log("loadmore")
				this.onLoadMore();
			},
			scroll(e) {
				//console.log("loadmore", e)
			},
			scrolltop() {
				uni.startPullDownRefresh()
			},
			changeCurrent(e) {
				this.active = e.detail.current;
				this.init(this.active)
			},

			seach() {
				/* uni.showModal({
					content: '我是搜索',
					showCancel: false
				});
				 */
				uni.navigateTo({
					url: '/pages/index/seacher/seacher',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			onLoadMore() {
				if (!this.tabList[this.active].isMore) {
					return;
				}
				//console.log("loading more");
				if (this.tabList[this.active].isMore) {
					this.tabList[this.active].loadmore = true;
					// 初始化视频列表
					this.$api.videoList({
						'type': this.tabList[this.active].id,
						'page': ++this.tabList[this.active].page
					}).then(res => {
						uni.stopPullDownRefresh();
						if (res.data.code == 0) {
							this.tabList[this.active].videoList = this.tabList[this.active].videoList.concat(res.data.data);

						} else {
							this.tabList[this.active].isMore = false;
						}
						this.tabList[this.active].loadmore = false;
					}).catch(res => {
						this.tabList[this.active].isMore = false;
						this.tabList[this.active].loadmore = false;
						uni.stopPullDownRefresh();
						// 失败进行的操作
					})
				} else {
					this.tabList[this.active].loadmore = true;
					uni.showToast({
						title: '暂无更多数据'
					});
				}

			},
			//刷新视频数据
			refreshVideo() {
				this.tabList[this.active].page = 1;
				this.tabList[this.active].isMore = true;
				this.tabList[this.active].loadmore = true;
				// 初始化视频列表
				this.$api.videoList({
					'type': this.tabList[this.active].id,
					'page': this.tabList[this.active].page
				}).then(res => {
					this.$refs.refresh.endAfter() //刷新结束调用
					if (res.data.code == 1) {
						uni.showToast({
							title: '暂无数据',
							icon: "none"
						});
						this.tabList[this.active].loadmore = false;
						this.tabList[this.active].isMore = false;
						this.tabList[this.active].videoList = [];
						return;
					}
					this.tabList[this.active].videoList = res.data.data;
					if (res.data.data.length < 20) {
						this.tabList[this.active].loadmore = false;
						this.tabList[this.active].isMore = false;
					}
				}).catch(res => {
					this.$refs.refresh.endAfter() //刷新结束调用
					uni.showToast({
						title: res.msg
					});
					// 失败进行的操作
				})
			},
			//刷新图文信息
			refreshTextImage() {
				this.tabList[this.active].page = 1;
				this.tabList[this.active].isMore = true;
				this.tabList[this.active].loadmore = true;
				// 初始化视频列表
				this.$api.textImageList({
					'type': this.active - 2,
				}).then(res => {
					this.$refs.refresh.endAfter() //刷新结束调用
					if (res.data.code == 1) {
						uni.showToast({
							title: '暂无数据',
							icon: "none"
						});
						this.tabList[this.active].loadmore = false;
						this.tabList[this.active].isMore = false;
						this.tabList[this.active].videoList = [];
						return;
					}
					this.tabList[this.active].videoList = res.data.data;
					if (res.data.data.length < 20) {
						this.tabList[this.active].loadmore = false;
						this.tabList[this.active].isMore = false;
					}
				}).catch(res => {
					this.$refs.refresh.endAfter() //刷新结束调用
					uni.showToast({
						title: res.msg
					});
					// 失败进行的操作
				})
			},
			timeago(time) {
				this.$utils.timeago(time)
			},
			refresh() {
				this.$store.dispatch('getAdvert')
				this.tabList[this.active].showAd = true;
				//console.log("home refresh");
				if (this.tabList[this.active].type == 0) {
					this.refreshVideo();
				} else if (this.tabList[this.active].type == 1) {
					this.refreshTextImage();
				}
			},
			closeAd() {
				this.tabList[this.active].showAd = false;
			},
			toTextImage(item) {

				uni.navigateTo({
					url: '/pages/index/iliao/iliao',
					success: res => {
						uni.$emit('setTextImageData', item);
					},
					fail: () => {},
					complete: () => {}
				});
				return false;
			},
			//点击赞
			// tapLove(index) {
			// 	var item = this.tabList[this.active].videoList[index];
			// 	if (this.user == null) {
			// 		uni.showToast({
			// 			title: '请先登录',
			// 			icon: 'none'
			// 		});
			// 		uni.navigateTo({
			// 			url: '/pages/login/login'
			// 		})
			// 		return;
			// 	}

			// 	//点赞视频
			// 	this.$api.videoLike({
			// 		type: 1,
			// 		vid: item.id,
			// 		skr: item.skr != 0 ? "0" : "1",
			// 	}).then(res => {
			// 		if (res.data.code == 1) {
			// 			uni.showToast({
			// 				title: res.data.msg,
			// 				icon: 'none'
			// 			});
			// 		} else {
			// 			this.tabList[this.active].videoList[index].skr = this.tabList[this.active].videoList[index].skr != 0 ? 0 : 1;
			// 			if (!this.tabList[this.active].videoList[index].skr) {
			// 				this.tabList[this.active].videoList[index].skr_count = this.tabList[this.active].videoList[index].skr_count -
			// 					1;
			// 			} else {
			// 				this.tabList[this.active].videoList[index].skr_count = this.tabList[this.active].videoList[index].skr_count +
			// 					1;
			// 			}
			// 		}
			// 	}).catch(res => {
			// 		// 失败进行的操作
			// 	})
			// 	var list = this.tabList[this.active].videoList;
			// 	delete this.tabList[this.active].videoList;
			// 	this.$set(this.tabList[this.active], 'videoList', list)
			// },
			//点击踩
			// tapNegative(index) {
			// 	var item = this.tabList[this.active].videoList[index];
			// 	if (this.user == null) {
			// 		uni.showToast({
			// 			title: '请先登录',
			// 			icon: 'none'
			// 		});
			// 		uni.navigateTo({
			// 			url: '/pages/login/login'
			// 		})
			// 		return;
			// 	}

			// 	//点踩
			// 	this.$api.videoNegative({
			// 		type: 1,
			// 		vid: item.id,
			// 		negative: item.negative != 0 ? "0" : "1",
			// 	}).then(res => {
			// 		if (res.data.code == 1) {
			// 			uni.showToast({
			// 				title: res.data.msg,
			// 				icon: 'none'
			// 			});
			// 		} else {
			// 			this.tabList[this.active].videoList[index].negative = this.tabList[this.active].videoList[index].negative != 0 ?
			// 				0 : 1;
			// 			if (!this.tabList[this.active].videoList[index].negative) {
			// 				this.tabList[this.active].videoList[index].negative_count = this.tabList[this.active].videoList[index].negative_count -
			// 					1;
			// 			} else {
			// 				this.tabList[this.active].videoList[index].negative_count = this.tabList[this.active].videoList[index].negative_count +
			// 					1;
			// 			}
			// 		}
			// 	}).catch(res => {
			// 		// 失败进行的操作
			// 	})
			// 	var list = this.tabList[this.active].videoList;
			// 	delete this.tabList[this.active].videoList;
			// 	this.$set(this.tabList[this.active], 'videoList', list)
			// },
		},
		computed: {
			advert() {
				return this.$store.state.advert.page
			},
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {








		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color-content;
	}
//加载动画

.spinner {
  margin: 20rpx auto;
  width: 20px;
  height: 20px;
  position: relative;

}
 
.container1 > view, .container2 > view, .container3 > view {
  width: 6px;
  height: 6px;
  background-color: #333;
 
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
 
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}















	swiper {
		min-height: 100%;
	}

	.head {
		position: fixed;
		//#ifdef APP-PLUS
		padding-top: 40rpx;
		//#endif
		z-index: 1;
		left: 0;
		right: 0;
		background: $uni-bg-color;
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 88rpx;
	}

	.content {
		position: relative;
		padding-top: 88rpx;
		padding-bottom: 123rpx;
		//#ifdef APP-PLUS
		padding-top: 128rpx;
		//#endif
		width: 100%;
		bottom: 0;
	}

	.shadow {
		box-shadow: 0 1px 6px #ccc;
	}

	.title_wrap {
		flex: 9;
		display: flex;
		flex-direction: row;

		.title {
			width: 100rpx;
			align-items: center;
			justify-content: center;
			display: flex;
			flex-direction: column;
			margin: 10rpx 10rpx;

			text {
				font-size: $uni-font-size-base;
			}
		}

		.active {
			text {
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}

			.pink {
				border-bottom: 5rpx solid $uni-text-color-active;
				box-shadow: 0rpx 4rpx 5rpx 0rpx $uni-text-color-active;
			}
		}

		.head-line {
			overflow: hidden;
			margin-top: 5rpx;
			width: 30rpx;

		}

	}

	.seach {
		flex: 1;
		display: flex;
		flex-direction: row;
		position: relative;
		right: 0rpx;
		justify-content: flex-end;
		align-items: center;

		image {
			display: inline-block;
			width: 35rpx;
			height: 25rpx;
			margin-right: 25rpx;

		}
	}

	.white-footer {
		display: flex;
		background-color: white;
		height: 100rpx;
		width: 100vw;
	}

	.text-image-item:first-child {
		padding-top: 12rpx;
	}

	.text-image-item {
		margin-bottom: 12rpx;
		background: white;
		display: flex;
		flex-direction: column;
		padding: 0 24rpx;
		justify-content: center;
	}

	.text-image-head-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		position: relative;
	}

	.text-image-head {
		margin-top: 12rpx;
		margin-bottom: 12rpx;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		align-items: center;
	}

	.text-image-name-wrapper {
		margin-left: 12rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.text-image-name {
		font-size: 27rpx;
		font-family: PingFang SC;

		margin-bottom: 5rpx;
		color: rgba(0, 0, 0, 1);
	}

	.text-image-time {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.5);
		line-height: 12px;
	}

	.text-image-down-wrapper {
		padding: 0 20rpx;
		height: 100%;
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.text-image-down {
		width: 30rpx;
		height: 20rpx;
	}

	.text-image-content-wrapper {
		margin-top: 24rpx;
		margin-bottom: 30rpx;
	}

	.text-image-content {
		width: 100%;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 46rpx;
	}

	.text-image-menu {
		margin-bottom: 25rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.text-image-menu-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.text-image-menu-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.text-image-menu-count {
		font-size: 24rpx;
		margin-left: 12rpx;
		padding-bottom: 5rpx;
	}

	.text-image-images-wrapper {
		margin-top: 12rpx;
		margin-bottom: 12rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-right: -12rpx;
	}


	.text-image-images-3 {
		max-height: 220rpx;
		max-width: 30vw;
	}

	.text-image-images {
		margin-right: 12rpx;
		flex: 4;
		min-width: 30vw;
		margin-bottom: 12rpx;
	}

	.text-image-content-text {
		width: 100%;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 46rpx;
		margin-bottom: 24rpx;
	}
</style>

