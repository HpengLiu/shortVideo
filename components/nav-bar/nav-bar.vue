<template>
	<view class="head">
		<uni-status-bar v-if="statusBar"/>
		<view class="nar-bar--left-wrapper">
			<slot name="left"/>
		</view>
		<view class="nav-bar--title-wrapper">
			<text v-if="title.length">{{title}}</text>
			<slot/>
		</view>
		<view class="nav-bar--right-wrapper">
			<slot name="right"/>
		</view>
		
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import uniStatusBar from '../uni-status-bar/uni-status-bar.vue';
	export default {
		props:{
			statusBar:{
				type:Boolean,
				default:false
			},
		},
		components: {
			uniStatusBar,
			uniIcons
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.head{
		background-color: $uni-bg-color;
		position: fixed;
		//#ifdef APP-PLUS
		padding-top: 40upx;
		//#endif
		z-index: 1;
		left: 0;
		right: 0;
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 88upx;
	}
</style>
