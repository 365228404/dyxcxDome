<template><!-- 个人中心 -->
	<view>
		<loading v-if="isLoading"></loading>
		
		<view class="mine_page">
			<view class="rel header_box">
				<view class="mine_header pd_box bgf flex_sc">
					<view class="header_title" v-if="gld.dYuserInfo.nickName">
						<view class="b500 fz18 c_333 mb10">{{gld.dYuserInfo.nickName}}</view>
						<view class="fz14 c_grey3">121654646464</view>
					</view>
					<view class="header_image">
						<image class="maxBox bdr50 ovh" :src="gld.dYuserInfo.avatarUrl" mode="aspectFill"></image>
						<view class="header_tag">
							<view class="tag_small btn_share">普通会员</view>
						</view>
					</view>
				</view>
				<view class="black_title flex_s c_CA9E5D fz15 b600">
					<view>我的钱包</view>
					<view class="flex_c">
						<view>￥888.88</view>
						<view class="ml10">
							<image class="img20" src="../../static/image/mine/icon_arrow_right_huangse.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 订单 S-->
			<view class="mine_order mb20 mt20">
				<view class="mine_order_info pd30" @click='order(0)'>
					<text class='flex1 fz15 b500 c_333'>我的订单</text>
					<text class='fz12 c_666'>全部订单</text>
					<image class="img20" src="../../static/image/mine/icon_arrow_right_gray.png"></image>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="flex_c mt40">
					<view class='order_item' @click.stop='order(1)'>
						<!-- <view class='order_num bg_theme' wx:if="{{orderInfo.unPaidOrderCount}}">{{orderInfo.unPaidOrderCount>99?'99+':orderInfo.unPaidOrderCount}}</view> -->
						<image class='order_icon' src='../../static/image/mine/icon_pay_gray.png'></image>
						<view class='fz13 c_666'>待支付</view>
					</view>
					<view class='order_item' @click.stop='order(2)'>
						<!-- <view class='order_num bg_theme' wx:if="{{orderInfo.unDispatchCount}}">{{orderInfo.unDispatchCount>99?'99+':orderInfo.unDispatchCount}}</view> -->
						<image class='order_icon' src='../../static/image/mine/icon_shipped_gray.png'></image>
						<view class='fz13 c_666'>待发货</view>
					</view>
					<view class='order_item' @click.stop='order(3)'>
						<!-- <view class='order_num bg_theme' wx:if="{{orderInfo.unDeliveryOrderCount}}">{{orderInfo.unDeliveryOrderCount>99?'99+':orderInfo.unDeliveryOrderCount}}</view> -->
						<image class='order_icon' src='../../static/image/mine/icon_goods_gray.png'></image>
						<view class='fz13 c_666'>待收货</view>
					</view>
					<view class='order_item' @click.stop='order(4)'>
						<image class='order_icon' src='../../static/image/mine/icon_complete_gray.png'></image>
						<view class='fz13 c_666'>已完成</view>
					</view>
				</view>
			</view>
			<!-- 订单 E-->
			
			<!-- 我的服务 S -->
			<view class="mine_serve">
				<view class="flex_sc pd30">
					<view class="c_333 b500 fz15">我的服务</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="flex_sc pd30">
					<view class="c_666 b400 fz14">购物车</view>
					<view>
						<image class="img20" src="../../static/image/mine/icon_arrow_right_gray.png"></image>
					</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="flex_sc pd30">
					<view class="c_666 b400 fz14">联系客服</view>
					<view>
						<image class="img20" src="../../static/image/mine/icon_arrow_right_gray.png"></image>
					</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="flex_sc pd30">
					<view class="c_666 b400 fz14">设置</view>
					<view>
						<image class="img20" src="../../static/image/mine/icon_arrow_right_gray.png"></image>
					</view>
				</view>
			</view>
			<!-- 我的服务 E -->
			
		</view>
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
		<!-- <switchTabBar :tabNum="num" @cutTab="tabItemDidClick"></switchTabBar> -->
	</view>
</template>

<script>
	import switchTabBar from '../../components/switchTabBar';
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		components:{
			switchTabBar
		},
		computed:{
			...mapState(['gld', 'server', 'config'])
		},
		data() {
			return {
				num: 2,
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
			//我的订单
			order(index) {
				// if (this.join()) {
				// 	let orderIndex = index || 0;
				// 	uni.navigateTo({
				// 		url: "../order/order?index=" + orderIndex
				// 	})
				// }
			},
			// 判断是否已经加入(组织)
			join() {
				if (this.gld.organizationState != 1) {
					uni.navigateTo({
						url: '../store/store?oId=' + this.gld.auditOid,
					})
					return false;
				}
				return true;
			},
			// 点击自定义tab
			tabItemDidClick(index) {
				if (index == 2) {
					return;
				}
				if (index == 0) {
					uni.redirectTo({
						url: '../store/store'
					});
				} else if (index == 1) {
					uni.redirectTo({
						url: '../showcase/showcase'
					});
				}
			}
		}
	}
</script>

<style>
	.mine_page {
		padding:20rpx 30rpx;
	}
	.header_box {
		height: 290rpx;
	}
	.mine_header {
		position: absolute;
		border-radius: 16rpx;
		left: 0;
		top: 0;
		right: 0;
		z-index: 1;
	}
	.mine_header .header_image {
		width: 120rpx;
		height: 120rpx;
		position: relative;
	}
	.mine_header .header_tag {
		position: absolute;
		left: 0rpx;
		bottom: 0;
		z-index: 3;
		width: 100%;
		text-align: center;
		line-height: 20rpx;
	}
	.header_box .black_title {
		position: absolute;
		height: 110rpx;
		left: 0;
		right: 0;
		top: 180rpx;
		background: url(../../static/image/mine/black_title.png) no-repeat;
		border-radius: 0 0 16rpx 16rpx;
		padding: 50rpx 30rpx 30rpx;
		box-sizing: border-box;
	}
	.mine_order{
	  width: 100%;
	  background:rgba(255,255,255,1);
		padding-bottom: 40rpx;
		border-radius:16rpx;
	}
	.mine_order_info{
	  display: flex;
	  align-items: center;
	}
	.mine_order .order_item{
	  position: relative;
	  flex: 1;
	  font-size: 0;
	  text-align: center;
	}
	.order_item .order_icon{
	  width: 56rpx;
	  height: 56rpx;
	  margin-bottom: 20rpx;
	}
	.mine_serve {
		background:rgba(255,255,255,1);
		border-radius:16rpx;
	}
		
</style>
