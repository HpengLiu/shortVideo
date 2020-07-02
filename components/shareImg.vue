<template>
	<view class="canvas-wrapper" v-if="isShow">
		<canvas style="height: 800rpx;width:600rpx;margin:0 auto" canvas-id="videoCanvas"></canvas>
		<view class="content" style="height: 80rpx;overflow: hidden;">
			<text style="font-size: 14px;text-align: center;line-height: 80rpx;"> {{shareObj.title}}</text>
		</view>
		<view class="share-btn" style="box-shadow: 0 -1px 1px gray;background-color: #007AFF;position: absolute;bottom: 0;width: 600rpx;height: 68rpx;"
		 @click="share">
			<text style="text-align: center;font-size: 14px;line-height: 68rpx;">点击分享到{{where}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				where: '',
				isShow: false,
				shareObj: null
			};
		},
		mounted() {
			uni.$on("postShareWhere", shareObj => {
				this.shareObj = shareObj
				shareObj.scene == "WXSceneSession" ? this.where = "微信" : this.where = "朋友圈",
				this.isShow = true
				// console.log(shareObj)
				let ctx = uni.createCanvasContext('videoCanvas');
				var img = this.shareObj.imageUrl
				console.log(img)
				ctx.drawImage(img, 0, 0, 300, 200)
				ctx.draw()
			})

			// this.drawImg()
		
		},
		methods: {
			closeSelf() {
				console.log('aa')
				this.isShow = false
			},
			share() {
				uni.share({
					provider: this.shareObj.provider,
					scene: this.shareObj.scene,
					// type: item.type,
					type: 2,
					title: this.shareObj.content,
					imageUrl: this.shareObj.imageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
				this.closeSelf()
			},
			drawImg() {
				// let ctx = uni.createCanvasContext('videoCanvas', this);
				// var img = this.shareObj.imageUrl
				// ctx.drawImage(img, 0, 0, 300, 200)
				// ctx.draw()
				console.log(this.shareObj.imageUrl)
				// console.log(ctx)
			}
		}
	}
</script>

<style lang="scss">
	.canvas-wrapper {
		height: 950rpx;
		width: 600rpx;
		position: absolute;
		z-index: 999;
		background-color: white;
		margin-top: 200rpx;
		left: 36%;
		border-radius: 5px;


	}
</style>
