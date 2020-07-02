<template>
	<view class="share">
		<view class="title" style="">
			<text style="">分享到{{where}}</text>
		</view>
		<view class="c-wrapper" style="">
			<canvas canvas-id="f-canvas" style="width: 280px;height: 450px" ></canvas>
		</view>
		<view class="share-btn">
			点击开始分享
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
				shareObj.scene == "WXSceneSession" ? this.where = "微信" : this.where = "朋友圈",
					console.log(shareObj)
					uni.showLoading({
						title:'海报生成中'
					})
				const ctx = uni.createCanvasContext('f-canvas')
				console.log(ctx)
				var img =  shareObj.imageUrl
				ctx.drawImage(img, 0, 0,280,300 )
				ctx.setFontSize(15)
				ctx.fillText(shareObj.title, 12, 330)
				ctx.fillText('二维码',200,390)
				ctx.strokeRect(170, 340, 100, 100)
				ctx.draw()
				uni.hideLoading()
				// uni.canvasToTempFilePath({
				// 	x:0,
				// 	y:0,
				// 	width:280,
				// 	height:450,
				// 	canvasId:'f-canvas',
				// 	quality:1,
				// 	success: (res) => {
				// 		console.log(res)
				// 		console.log(res.tempFilePath)
				// 	}
				// })
				
			})
			





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
		},
		created() {
			uni.getSubNVueById('forward').hide()
		}
	}
</script>

<style lang="scss">
	$font-size:30rpx;
	.title {
		height: 100rpx;
		box-shadow: 0 1px 5px gray;
		text-align: center;
		padding-top: 50rpx;
		background-image: linear-gradient(-90deg, #fe671e 0%, #ffe240 99%), linear-gradient(#fa7300, #fa7300);
		text{
			line-height: 100rpx;
			font-size: $font-size;
			color: white;
		}
	}
	.c-wrapper{
		width: 280px;
		height: 450px;
		// background-color:white;
		margin: 50rpx auto;
		box-shadow: 0 0 5px gray;
		border-radius: 5px;
	
	}
	.share-btn{
		width: 500rpx;
		height: 100rpx;
		background-image: linear-gradient(-90deg, #fe671e 0%, #ffe240 99%), linear-gradient(#fa7300, #fa7300);
		border-radius: 25px;
		margin: 0 auto;
		line-height: 100rpx;
		text-align: center;
		color: white;
		font-size:$font-size ;
	}
</style>
