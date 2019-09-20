<template><!-- 我的钱包 (收益明细) -->
	<view>
		<loading v-if="isLoading"></loading>
		
		<view class="pd2030">
			<view class="bgf bdr16 c_333 fz16">
				<view class="pd2030 flex_s">
					<view>
						<view class="fz14">代购费 (已入帐)</view>
						<view class="fz12 mt20">GQ24732945370483</view>
						<view class="fz12 c_grey3 mt10">2019-08-01 08:00</view>
					</view>
					<view class="c_FD7D6F b500">
						+ 880.88
					</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="pd2030 flex_s">
					<view>
						<view class="fz14">代购费 (已入帐)</view>
						<view class="fz12 mt20">GQ24732945370483</view>
						<view class="fz12 c_grey3 mt10">2019-08-01 08:00</view>
					</view>
					<view class="b500">
						+ 880.88
					</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="pd2030 flex_s">
					<view>
						<view class="fz14">代购费 (待入帐)</view>
						<view class="fz12 mt20">GQ24732945370483</view>
						<view class="fz12 c_grey3 mt10">2019-08-01 08:00</view>
					</view>
					<view class="b500">
						+ 880.88
					</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="pd2030 flex_s">
					<view>
						<view class="fz14">代购费 (待入帐)</view>
						<view class="fz12 mt20">GQ24732945370483</view>
						<view class="fz12 c_grey3 mt10">2019-08-01 08:00</view>
					</view>
					<view class="b500">
						+ 880.88
					</view>
				</view>
			</view>
		</view>
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		computed:{
			...mapState(['gld', 'server', 'config'])
		},
		data() {
			return {
				isLoading: false,
				toastHidden: false,
				showToastTxt: ''
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
			
		}
	}
</script>

<style>
	
</style>
