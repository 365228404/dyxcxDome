<template><!-- 设置 -->
	<view>
		<loading v-if="isLoading"></loading>
		
		<view class="pd2030">
			<view class="pd2030 bgf bdr16 flex_sc">
				<view class="c_333 fz15">店铺头像</view>
				<view class="flexbox">
					<view class="img120 mr20">
						<image class="maxBox bdr50 ovh" :src="gld.dYuserInfo.avatarUrl" mode="aspectFill"></image>
					</view>
					<view>
						<image class="img20" src="../../static/image/order/icon_arrow_right_grey.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="pd_box bgf bdr16 flex_sc mt20">
				<view class="c_333 fz15">店铺名称</view>
				<view class="flexbox">
					<view class="c_grey3 fz14 mr20">
						请输入店铺名称
					</view>
					<view>
						<image class="img20" src="../../static/image/order/icon_arrow_right_grey.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="pd2030 bgf bdr16 flex_sc mt20">
				<view class="c_333 fz15">店铺客服二维码</view>
				<view class="flexbox">
					<view class="img120 mr20">
						<image class="maxBox" :src="gld.dYuserInfo.avatarUrl" mode="aspectFill"></image>
					</view>
					<view>
						<image class="img20" src="../../static/image/order/icon_arrow_right_grey.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="pd_box bgf bdr16 flex_sc mt20">
				<view class="c_333 fz15">收货地址管理</view>
				<view>
					<image class="img20" src="../../static/image/order/icon_arrow_right_grey.png" mode="aspectFill"></image>
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
			console.log(this.gld);
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
