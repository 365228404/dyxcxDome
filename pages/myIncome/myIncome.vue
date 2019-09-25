<template><!-- 我的钱包 -->
	<view>
		<loading v-if="isLoading"></loading>
		
		<view>
			<view class="income_card">
				<image class="maxBox" src="../../static/icon_money_card.png"></image>
				<view class="card_box cf">
					<view class="flex_s fz13 pt40" @click="goIncomeDetails">
						<view>余额 (元)</view>
						<view class="flexbox">
							<view class="mr10">账户明细</view>
							<view>
								<image class="img20" src="../../static/image/order/icon_arrow_right_white.png"></image>
							</view>
						</view>
					</view>
					<view class="flex_sc mt30">
						<view class="flex">
							<view class="fz16 pt16">￥</view>
							<view class="fz28 b500">88.88</view>
						</view>
						<view class="btn_money bgf c_FD7D6F" @click="goBalance">
							提现
						</view>
					</view>
					
					<view class="get_money flex_s fz13">
						<view class="tc">
							<view>已入账</view>
							<view class="mt20 fz16 b500">9899</view>
						</view>
						<view class="tc">
							<view>待入账</view>
							<view class="mt20 fz16 b500">9899.88</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="pd30 pt10">
				<view>
					<view class="c_333 fz13">今日销售额</view>
					<view class="flex mt20 c_FD7D6F">
						<view class="fz16 pt16">￥</view>
						<view class="fz28 b500">88.88</view>
					</view>
				</view>
				<view class="mt30 c_333 fz13">
					<view class="pd_box flex_s bdr16 bgf border_shadow">
						<view>昨日销售额</view>
						<view>￥ 88.88</view>
					</view>
					<view class="pd_box flex_s bdr16 bgf border_shadow mt10">
						<view>本周销售额</view>
						<view>￥ 88.88</view>
					</view>
					<view class="pd_box flex_s bdr16 bgf border_shadow mt10">
						<view>本月销售额</view>
						<view>￥ 88.88</view>
					</view>
				</view>
				
				<view class="mt40">
					<view class="c_333 fz13">今日分佣</view>
					<view class="flex mt20 c_FD7D6F">
						<view class="fz16 pt16">￥</view>
						<view class="fz28 b500">88.88</view>
					</view>
				</view>
				<view class="mt30 c_333 fz13">
					<view class="pd_box flex_s bdr16 bgf border_shadow">
						<view>昨日分佣</view>
						<view>￥ 88.88</view>
					</view>
					<view class="pd_box flex_s bdr16 bgf border_shadow mt10">
						<view>本周分佣</view>
						<view>￥ 88.88</view>
					</view>
					<view class="pd_box flex_s bdr16 bgf border_shadow mt10">
						<view>本月分佣</view>
						<view>￥ 88.88</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	import loading from '../../components/loading';
	import toast from '../../components/toast';
	import auth from '../../components/auth';
	import noData from '../../components/noData';
	export default {
		components:{
			loading,
			toast,
			auth,
			noData
		},
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
			goIncomeDetails() {
				uni.navigateTo({
					url:'../IncomeDetails/IncomeDetails'
				})
			},
			goBalance() {
				uni.navigateTo({
					url:'../balance/balance'
				})
			}
		}
	}
</script>

<style>
	.income_card {
		position: relative;
		padding: 12rpx 14rpx 0;
		height: 432rpx;
		box-sizing: border-box;
	}
	.card_box {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		padding: 38rpx 56rpx 66rpx;
	}
	.btn_money {
		padding: 16rpx 54rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
	}
	.get_money {
		margin: 94rpx 74rpx 0 92rpx; 
	}
	.border_shadow {
		box-shadow:0 2rpx 0 0 rgba(255,214,98,1);
	}
</style>
