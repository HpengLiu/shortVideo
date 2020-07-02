<template>
	<view class="content">
				<home ref="home"></home>
	</view>
</template>

<script>
	import home from "./home/index.vue";
	import modal from '@/components/modal/modal.vue'
	export default {
		data() {
			return {	
				showModal:false,
				selectModalData:[],
				sysheight: 0,
				type:'select'
			}
		},
		components: {
			home,
			modal
		},
		created() {
			this.sysheight = uni.getSystemInfoSync().windowHeight
		},
		onShow() {

		},
		onLoad() {
			uni.$on("showModelData",(data)=>{
				this.clickItem =data.clickItem;
				this.selectModalData = data.data;
				this.type = data.type;
				this.showModal=true;
			})
			uni.$on('loadMore', (data) => {
				this.$refs.home.onLoadMore();
			})
			let user = uni.getStorageSync('user');
			if (user) {
				this.$store.commit('setUser', user);
			}
		},
		onReachBottom() {
			var $page = this.$store.state.footer_store.now_page_index;
			var $page = this.page_code;
			switch ($page) {
				case "home":
					this.$refs.home.onLoadMore();
					break;
				case "collection":
					this.$refs.collection.onLoadMore();
					break;
				case "user":
					this.$refs.user.onLoadMore();
					break;
			}
		},
		computed: {
			current(){
				var index = this.$store.state.footer_store.now_page_index;
				let length = this.$store.state.footer_store.footer_nav.length;
				if (index == Math.floor(length / 2)||index > Math.floor(length / 2)) {
					//中心按钮点击
					
					return index-1;
				}
				return index;
			},
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			},
			user() {
				return this.$store.state.user;
			}
		},
		methods: {
			onConfirm(e){
				this.$refs.home.onConfirm(e);
			},
			onCancel(){
				
			},
			change(e){
				var index = e.detail.current;
				let length = this.$store.state.footer_store.footer_nav.length;
				if (index == Math.floor(length / 2)||index > Math.floor(length / 2)) {
					//中心按钮点击
					this.$store.commit("change_page", index+1)
					return;
				}
				//console.log(index);
				this.$store.commit("change_page", index)
			},
			change_nav(index) {
				let length = this.$store.state.footer_store.footer_nav.length;
				if (index == Math.floor(length / 2)) {
					//中心按钮点击
	
					this.centerClick();
					return;
				}
				
				this.$store.commit("change_page", index)
			},
			centerClick() {
				if (this.user == null) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				uni.navigateTo({
					url: 'publish/publish'
				})
			}
		},
		onPullDownRefresh() {
			//console.log('index refresh');
			var $page = this.page_code;
			switch ($page) {
				case "home":
					this.$refs.home.refresh();
					break;
				case "collection":
					this.$refs.collection.refresh();
				case "user":
					this.$refs.user.refresh();
					break;
			}
		}
	}
</script>

<style>
	.content {
		/* background: rgba(0, 0, 0, 0.05); */
	}
</style>
