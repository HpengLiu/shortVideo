<template>
	<view>
		<transition name="slide-fade">
			<!-- <image class="skr-img" src="/static/img/skr_active.png" v-show="doubleClick" mode="widthFix"></image> -->
		</transition>
	</view>
</template>

<script>
	export default {
		name:'heart',
		props: {
			doubleClick: Boolean
		},
		data() {
			return {

			};
		},
		mounted() {
			this.$nextTick(() => { //使用nextTick为了保证dom元素都已经渲染完毕 
				this.$emit('setHeight', this.$el.clientHeight);
				this.$emit('setWidth', this.$el.clientWidth);
			});
		}
	}
</script>

<style>
	.skr-img {
		width: 150upx;
		height: 100%;
	}

	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	/* // 进入的动画 opacity: 0=>1, translateX: 10=>0 */
	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	/* // 离开的动画 opacity: 1=>0, translateX: 0=>10 */
	.slide-fade-leave-active {
		transition: all .8s ease
	}

	/* // 进入第一帧和离开最后一帧的状态 */
	.slide-fade-enter {
		transform: scale(0.5);
		opacity: 0;
	}

	.slide-fade-leave-to
		{
		transform: scale(1);
		opacity: 0;
	}
</style>
