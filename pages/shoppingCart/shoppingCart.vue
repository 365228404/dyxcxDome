<template><!-- 购物车页面 -->
	<view>
		<loading v-if="isLoading"></loading>
		<customTabBar :tabNum="num" @cutTab="tabItemDidClick" v-if="!gld.organizationId"></customTabBar>
		
		<view></view>
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	import customTabBar from '../../components/customTabBar';
	export default {
		components: {
			customTabBar
		},
		computed:{
			...mapState(['gld', 'server', 'config'])
		},
		data() {
			return {
				isLoading: true,
				toastHidden: false,
				showToastTxt: '',
				num: 1,
			}
		},
		onLoad(options) {
			
		},
		onShow() {
			
		},
		// 页面下拉刷新
		onPullDownRefresh() {
			
		},
		// 页面上拉触底
		onReachBottom() {
			
		},
		// 右上角分享
		onShareAppMessage() {

		},
		// 页面滚动事件
		onPageScroll() {

		},
		methods: {
			// 点击自定义tab
			tabItemDidClick(index) {
				if (index == 1) {
					return;
				}
				if (index == 0) {
					uni.redirectTo({
						url: '../Cshowcase/Cshowcase'
					});
				} else if (index == 2) {
					uni.redirectTo({
						url: '../Cmine/Cmine'
					});
				}
			}
		}
	}
</script>

<style>
	
</style>
