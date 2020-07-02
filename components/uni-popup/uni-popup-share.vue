<template>
	<view class="uni-popup-share">
		<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
		<view class="uni-share-content">
			<view class="uni-share-content-box">
				<view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @click="share(index)">
					<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
					<text class="uni-share-text">{{item.text}}</text>
				</view>

			</view>
		</view>
		<view class="uni-share-button-box">
			<button class="uni-share-button" @click="close">取消</button>
		</view>
	</view>
</template>

<script>
	// import wx from '../../node_modules/jweixin-module/lib/index.js'
	export default {
		name: 'UniPopupShare',
		props: {
			title: {
				type: String,
				default: '分享到'
			},
			shareIndex: {

			},
			shareIndexUrl: {
				type: String,
				default: ''
			},
			currentVideo: {
				type: Object,
				default: {}
			}
		},
		inject: ['popup'],
		data() {
			return {
				bottomData: [{
						text: '朋友圈',
						icon: '../../static/icon/pengyouquan.svg',
						name: 'wx'
					},

					{
						text: '朋友',
						icon: '../../static/icon/py.svg',
						name: 'wx-friend'
					}

					,
					{
						text: '下载到本地',
						icon: '../../static/icon/xiazai.svg',
						name: 'more'
					}
				]
			}
		},
		created() {

		},
		methods: {
			emitEvent() {
				uni.$emit('OpenMask')
			},
			//分享
			share(index, shareIndex) {
				switch (index) {
					case 0:
						//分享到朋友圈
						console.log(this.currentVideo.content)
						console.log('分享到朋友圈')
						wx.updateTimelineShareData({
							title: `集众帮短视频    ${this.currentVideo.content}`,
							desc: this.currentVideo.content,
							link: 'http://xiaoship.jzbang.vip',
							imgUrl: this.currentVideo.img,
							success: (res) => {
								console.log(res)
							}
						})
						this.emitEvent()
						break;
					case 1:
						console.log('分享给朋友')
						//分享给朋友
						wx.updateAppMessageShareData({
							title: '集众帮短视频',
							desc: this.currentVideo.content,
							link: 'http://xiaoship.jzbang.vip',
							imgUrl: this.currentVideo.img,
							success: function() {
								// 设置成功
							}
						})
						this.emitEvent()
						break;

					case 2:
						//#ifdef H5
						this.copyVideoUrl()
						//#endif
						uni.downloadFile({
							url: this.currentVideo.src,
							success: res => {
								if (res.statusCode === 200) {
									console.log('下载成功');
								}
							}
						})
				}
				this.close()
			},


			/**
			 * 选择内容
			 */
			// select(item,index) {
			// 	this.$emit('select', {
			// 		item,
			// 		index
			// 	}, () => {
			// 		this.popup.close()
			// 	})

			// },
			/**
			 * 关闭窗口
			 */
			//视频地址复制
			copyVideoUrl() {
				var oInput = document.createElement("input");
				oInput.value = this.currentVideo.src;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				oInput.className = "oInput";
				oInput.style.display = "none";
				uni.showModal({
					title: '提示',
					content: '视频地址已帮您复制，由于微信限制，请您打开手机浏览器，在地址栏中粘贴地址进行下载!'
				})
			},
			close() {
				this.popup.close()
			}
		},
		onShow() {
			console.log('show')
			// uni.request({
			// 	url:'https://www.haloworld.xyz/getConfig',
			// 	success: (res) => {
			// 		console.log(res)
			// 	}
			// }),
			// wx.config({
			// 	debug: false,
			// 	appId: "wxa1019a8dd96961ab",
			// 	timestamp:Date.now(),
			// 	nonceStr: "111",
			// 	signature: "111",
			// 	jsApiList: []
			// });

		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-share {
		background-color: #fff;
	}

	.uni-share-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
	}

	.uni-share-title-text {
		font-size: 14px;
		color: #666;
	}

	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 10px;
	}

	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		width: 360px;
	}

	.uni-share-content-item {
		width: 90px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
		align-items: center;
	}

	.uni-share-content-item:active {
		background-color: #f5f5f5;
	}

	.uni-share-image {
		width: 30px;
		height: 30px;
	}

	.uni-share-text {
		margin-top: 10px;
		font-size: 14px;
		color: #3B4144;
	}

	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
	}

	.uni-share-button {
		flex: 1;
		border-radius: 50px;
		color: #666;
		font-size: 16px;
	}

	.uni-share-button::after {
		border-radius: 50px;
	}
</style>
