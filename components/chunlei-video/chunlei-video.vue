<template>
	<view>
		<video :src="src" :controls="controls" :show-center-play-btn="false" :show-play-btn="false" :poster="poster" :style="{ height: height,width: width }"
		 :loop="true" @waiting="waiting" :enable-progress-gesture="false" @play="startPlay" @click="clickVideo" :id="`video_${src}`"
		 ref="`video_${src}`" class="video" @timeupdate="timeupdate" loop webkit-playsinline="true" x5-video-player-type="h5-page"
		 x5-video-player-fullscreen="true" playsinline preload="auto"></video>
		<cover-view class="progressBar" :style="{ width: barWidth }"></cover-view>
	</view>
</template>

<script>
	export default {
		props: {
			controls: {
				type: Boolean,
				default: false
			},
			src: {
				type: String,
				default: ''
			},
			play: {
				type: Boolean,
				default: false
			},
			height: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: ''
			},
			initialTime: {
				type: Number,
				default: 0
			},
			gDuration: {
				type: Number,
				default: 999
			}, //大概时长使进度条更准确
			poster: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				time: 0,
				duration: 0,
				playFirst: true
			}
		},
		mounted() {

		},
		created() {
			//console.log("created()",`video_${this.src}`);

			// var video = document.getElementById("video");
			// if (window.WeixinJSBridge) {
			//     WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
			//         video.play();
			//     }, false);
			// } else {
			//     document.addEventListener("WeixinJSBridgeReady", function () {
			//         WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
			//             video.play();
			//         });
			//     }, false);
			// }
			// video.play()
			this.$nextTick(function() {
				this.videoCtx = uni.createVideoContext(`video_${this.src}`, this)

			})
		},

		onUnload() {
			uni.$off('videoCreated');

		},
		methods: {
			timeupdate(event) {
				this.$emit('timeupdate', event)
				// console.log("timeupdate()",`video_${this.src}`)
				this.duration = event.detail.duration
				if (!this.play) return
				if (this.time >= this.duration) this.time = 0
				this.time = event.detail.currentTime
			},
			clickVideo(e) {
				this.$emit('click', e)
			},
			videoPlay() {
				if (this.play) {
					this.videoCtx.play();
					if (this.playFirst) {
						this.videoCtx.seek(this.startTime)
						this.playFirst = false
					}
				} else {
					this.videoCtx.pause();
					this.$emit('pause', this.time)
				}

			},
			waiting() {

			},
			startPlay() {

			}
		},
		watch: {
			play(newVal, oldVal) {
				this.videoPlay()
			},
			startTime: {
				immediate: true,
				handler(newVal, oldVal) {

					this.time = newVal
				}
			},
			gDuration: {
				immediate: true,
				handler(newVal, oldVal) {

					this.duration = newVal
				}
			}
		},
		computed: {
			barWidth() {

				let width = this.time / this.duration * parseInt(this.width)

				return `${width}px`
			},
			startTime() {
				return this.initialTime
			}
		}
	}
</script>

<style scoped>
	.video {
		width: 100%;
		height: 100%;
	}

	.progressBar {
		border-radius: 2upx;
		height: 4upx;
		background-color: #FFFFFF;
		z-index: 999999;
		position: absolute;
		bottom: 4upx;
		//#ifndef APP-PLUS-NVUE
		animation: flicker 4s linear infinite;
		animation-direction: alternate;
		//#endif
	}

	//#ifndef APP-PLUS-NVUE
	@keyframes flicker {
		0% {
			box-shadow: 0 0 0 #FFFFFF;
		}

		/** 暂停效果 */
		10% {
			box-shadow: 0 0 2upx #FFFFFF;
		}

		50% {
			box-shadow: 0 0 10upx #FFFFFF;
		}

		60% {
			box-shadow: 0 0 12upx #FFFFFF;
		}

		90% {
			box-shadow: 0 0 18upx #FFFFFF;
		}

		100% {
			box-shadow: 0 0 20upx #FFFFFF;
		}

	}

	//#endif
</style>
