<template>
	<view class="video-list g-container">
			<view class="g-queue"  show-scrollbar="false" enableBackToTop="true" scroll-y loadmoreoffset="15">
		<!-- <list class="g-queue"  show-scrollbar="false" enableBackToTop="true" scroll-y loadmoreoffset="15"> -->
			<!-- cell @tap="toPlay(index)" class="video-page-card g-item" v-if="(index+1)%2==1" v-for="(item,index) in videoList" -->
			<view @tap="toPlay(index)" class="video-page-card g-item" v-if="(index+1)%2==1" v-for="(item,index) in videoList"
			 :key="index">
				<image class="img-bg" lazy-load :src="formatUrl(item.img)" mode="widthFix"></image>
				<view class="tips" v-if="item.state==0">
					<text style="color: #ffffff;">
						审核中
					</text>
				</view>
				<view class="tips" v-if="item.state==2">
					<text style="color: #FF0000;">
						审核未通过
					</text>
				</view>
				<view class="video-footer">
					<text class="video-page-title">{{item.title}}</text>
					<view class="user-wrap">
						<view class="user-info">
							<image class="user-head" lazy-load :src="formatUrl(item.head_img)" mode="aspectFill"></image>
							<text>{{item.name}}</text>
						</view>
						<view class="skr-info">
							<image class="skr-icon" src="/static/home/heart.png" mode=""></image>
							<text>{{item.skr_count}}</text>
						</view>
					</view>
				</view>
				<!-- </cell> -->
			</view>
		</view>
		<view class="g-queue" show-scrollbar="false">
		<!-- <list class="g-queue" show-scrollbar="false"> -->
			<!-- <cell @tap="toPlay(index)" class="video-page-card g-item" v-if="(index+1)%2==0" v-for="(item,index) in videoList" -->
			<view @tap="toPlay(index)" class="video-page-card g-item" v-if="(index+1)%2==0" v-for="(item,index) in videoList"
			 :key="index">
				<image  class="img-bg" lazy-load :src="formatUrl(item.img)" mode="widthFix"></image>
				<view class="tips" v-if="item.state==0">
					<text style="color: #ffffff;">
						审核中
					</text>
				</view>
				<view class="tips" v-if="item.state==2">
					<text style="color: #FF0000;">
						审核未通过
					</text>
				</view>
				<view class="video-footer">
					<text class="video-page-title">{{item.title}}</text>
					<view class="user-wrap">
						<view class="user-info">
							<image class="user-head" lazy-load :src="formatUrl(item.head_img)" mode="aspectFill"></image>
							<text>{{item.name}}</text>
						</view>
						<view class="skr-info">
							<image class="skr-icon" src="/static/home/heart.png" mode=""></image>
							<text>{{item.skr_count}}</text>
						</view>
					</view>
				</view>
				</view>
			<!-- </cell> -->

		</view>
	</view>
</template>
<style lang="scss">
	$lineCount: 2;

	.g-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow: hidden;
	}

	.g-queue {
		display: flex;
		flex-direction: column;
		flex-basis: 50%;
		margin-right: 2%;
	}

	.g-item {
		position: relative;
		width: 100%;
		margin-top: 2%;
		padding-right: 12upx;
	}
</style>
<script>
	export default {
		data() {
			return {

			}
		},

		props: {
			videoList: {
				type: Array,
				default: []
			},
			page: {
				type: Number,
				default: 1
			},
			type: {
				type: String,
				default: "hot"
			}
		},
		methods: {
			//格式化链接地址
			formatUrl(url1) {
				if (url1 == undefined) {
					return;
				}
				var index = url1.indexOf("http");
				if (index == 0) {
					return url1;
				}
				return this.$store.state.baseUrl + url1;
			},
			toPlay(index) {

				this.$store.commit("setVideoList", this.videoList.slice(index, this.videoList.length));

				uni.navigateTo({
					url: '/pages/video/index?index=0' + '&type=' +
						this.type + '&page=' + this.page,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			loadmore() {
				//console.log(":loadMore");
				uni.$emit("loadMore", {})
			}
		},
		mounted() {
			//console.log("videoPage_mounted");
		}
	}
</script>

<style lang="scss">
	.video-list {
		margin-left: 2%;
		margin-top: 2%;
	}

	.tips {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 12upx;
		bottom: 12upx;
		text-align: center;
		background-color: rgba(0, 0, 0, .6);
		padding-top: 5upx;
		padding-bottom: 5upx;
		right: 12upx;
	}

	.video-page-title {
		padding: 0 12upx;
		flex-wrap: nowrap;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		lines: 1;
	}

	/**
	 * 视频卡片开始
	 */
	.video-page-card {

		position: relative;
		width: 100%;
		transition: opacity .4s ease-in-out; // 检索或设置对象变换时的过渡
		
		.img-bg {
			background-color: white;
			border-radius: 12upx;
			width: 100% !important;
		}

		.video-footer {
			padding: 10upx;
			font-size: $uni-font-size-sm;
			height: 100upx;
			width: 100%;
			display: flex;
			flex-direction: column;
			position: absolute;
			bottom: 0;
			color: $uni-text-color-inverse;
			font-family: PingFang SC;

			.user-wrap {
				margin-top: 10upx;
				display: flex;
				flex-direction: row;

				.user-info {
					flex: 7;
					display: flex;
					flex-direction: row;
					align-items: center;

					.user-head {
						border-radius: 50%;
						width: 48upx !important;
						height: 48upx;
					}

					text {
						font-size: 18upx;
						margin-left: 10upx;
					}

				}

				.skr-info {
					flex: 3;
					flex-shrink: 0;
					align-items: center;
					display: flex;
					flex-direction: row;

					image {
						width: 24upx !important;
						height: 24upx;
					}

					text {
						font-size: 18upx;
						margin-left: 10upx;
					}
				}
			}

		}
	}
</style>
