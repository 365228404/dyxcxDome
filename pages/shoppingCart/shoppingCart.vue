<template>
	<!-- 购物车页面 -->
	<view class="pb100">
		<loading v-if="isLoading"></loading>
		<customTabBar :tabNum="num" @cutTab="tabItemDidClick" v-if="!gld.organizationId"></customTabBar>

		<view class="cart_list">
			<!-- 每个商品 S -->
			<view class="order_goods" v-for="(goodsItem, goodsIndex) in shoppingData" :key="goodsIndex">
				<view class="order_goods_item" @touchstart.stop="touchS($event, goodsItem)" @touchmove.stop="touchM($event, goodsItem)" @touchend.stop="touchE($event, goodsItem)" :style="{ left: goodsItem.left + 'rpx' }">
					<view>
						<image class="img36 m20" :src="1? '../../static/image/order/uncheck_gray.png': '../../static/image/order/uncheck_grayActive.png' " mode="aspectFill"></image>
					</view>
					<image class="goods_img" :src="goodsItem.goodsDefaultImage | getImgUrlBySize('s')" mode="aspectFill"></image>
					<view class="goods_info">
						<view>
							<view class="goods_name c_333">{{ goodsItem.goodsName }}</view>
						</view>
						<!-- <view class='c_grey3'>货号：{{goodsItem.goodsNumber}}</view> -->
						<view class="goods_spec tag_small tag_small_type">{{ goodsItem.specName }}</view>
						<view class="flex_sc">
							<view class="c_FD7D6F b500 fz16 flex1">￥{{ goodsItem.goodsPrice }}</view>
							<view class="flexbox">
								<view class="shoppingcart_jian"></view>
								<view class="goodsItem_quantity bg_DEDEDE c_333 ml10 mr10">{{ goodsItem.quantity }}</view>
								<view><image mode="aspectFill" class="img20" src="../../static/image/order/shoppingcart_jia.png"></image></view>
							</view>
						</view>
					</view>
				</view>
				<view class="order_goods_oper" @click="deleteItem(goodsIndex)">删除</view>
			</view>
			<!-- 每个商品 E -->
			<!-- 底部悬浮栏 S-->
			<view class="page_footer_100">
				<view class="flex_c">
					<view>
						<image class="img36 mr20" :src="1? '../../static/image/order/uncheck_gray.png': '../../static/image/order/uncheck_grayActive.png' " mode="aspectFill"></image>
					</view>
					<view class="c_333 fz12">全选</view>
				</view>
				<view class="flex_c">
					<view class="fz14 c_333">合计: <text class="c_FD7D6F">￥0.00</text></view>
					<view class="btn_main btn_darkgrey ml20">去结算</view>
				</view>
			</view>
			<!-- 底部悬浮栏 E-->
		</view>
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import customTabBar from '../../components/customTabBar';
import Touches from '../../utils/Touches';
export default {
	components: {
		customTabBar
	},
	computed: {
		...mapState(['gld', 'server', 'config'])
	},
	data() {
		return {
			isLoading: false,
			toastHidden: false,
			showToastTxt: '',
			num: 1,
			shoppingData: [
				{
					currPrice: '30.00',
					currRefundState: false,
					description: '',
					goodsDefaultImage: 'file/group_2/goods_3334111/1566550575572_264519s.jpg',
					goodsId: 3334111,
					goodsName: 'V4407维达超韧3层100g20长卷无芯卫生卷纸',
					goodsNumber: 'WD014',
					goodsPrice: '30.00',
					goodsSpecId: 11487870,
					imageInfo:
						'15771059-1-file/group_2/goods_3334111/1566550575213_795418,15771061-1-file/group_2/goods_3334111/1566550575289_947680,15771063-1-file/group_2/goods_3334111/1566550575380_627103,15771065-1-file/group_2/goods_3334111/1566550575514_853602,15771060-1-file/group_2/goods_3334111/1566550575252_075324,15771062-1-file/group_2/goods_3334111/1566550575342_687514,15771064-1-file/group_2/goods_3334111/1566550575485_931670,15771066-0-file/group_2/goods_3334111/1566550575572_264519',
					price: 30,
					quantity: 2,
					refundDesc: '--',
					refundPrice: '0.00',
					refundQuantity: 0,
					refundQuantityPrice: '0.00',
					remark: '',
					scateName: '卷纸',
					specName: '20卷',
					specOne: '20卷',
					specTwo: '',
					stockOutQuantity: 0,
					left: 0
				},
				{
					currPrice: '30.00',
					currRefundState: false,
					description: '',
					goodsDefaultImage: 'file/group_2/goods_3334111/1566550575572_264519s.jpg',
					goodsId: 3334111,
					goodsName: 'V4407维达超韧3层100g20长卷无芯卫生卷纸',
					goodsNumber: 'WD014',
					goodsPrice: '30.00',
					goodsSpecId: 11487870,
					imageInfo:
						'15771059-1-file/group_2/goods_3334111/1566550575213_795418,15771061-1-file/group_2/goods_3334111/1566550575289_947680,15771063-1-file/group_2/goods_3334111/1566550575380_627103,15771065-1-file/group_2/goods_3334111/1566550575514_853602,15771060-1-file/group_2/goods_3334111/1566550575252_075324,15771062-1-file/group_2/goods_3334111/1566550575342_687514,15771064-1-file/group_2/goods_3334111/1566550575485_931670,15771066-0-file/group_2/goods_3334111/1566550575572_264519',
					price: 30,
					quantity: 2,
					refundDesc: '--',
					refundPrice: '0.00',
					refundQuantity: 0,
					refundQuantityPrice: '0.00',
					remark: '',
					scateName: '卷纸',
					specName: '20卷',
					specOne: '20卷',
					specTwo: '',
					stockOutQuantity: 0,
					left: 0
				},
				{
					currPrice: '30.00',
					currRefundState: false,
					description: '',
					goodsDefaultImage: 'file/group_2/goods_3334111/1566550575572_264519s.jpg',
					goodsId: 3334111,
					goodsName: 'V4407维达超韧3层100g20长卷无芯卫生卷纸',
					goodsNumber: 'WD014',
					goodsPrice: '30.00',
					goodsSpecId: 11487870,
					imageInfo:
						'15771059-1-file/group_2/goods_3334111/1566550575213_795418,15771061-1-file/group_2/goods_3334111/1566550575289_947680,15771063-1-file/group_2/goods_3334111/1566550575380_627103,15771065-1-file/group_2/goods_3334111/1566550575514_853602,15771060-1-file/group_2/goods_3334111/1566550575252_075324,15771062-1-file/group_2/goods_3334111/1566550575342_687514,15771064-1-file/group_2/goods_3334111/1566550575485_931670,15771066-0-file/group_2/goods_3334111/1566550575572_264519',
					price: 30,
					quantity: 2,
					refundDesc: '--',
					refundPrice: '0.00',
					refundQuantity: 0,
					refundQuantityPrice: '0.00',
					remark: '',
					scateName: '卷纸',
					specName: '20卷',
					specOne: '20卷',
					specTwo: '',
					stockOutQuantity: 0,
					left: 0
				}
			],
			startX: '',
		};
	},
	onLoad(options) {},
	onShow() {},
	// 页面下拉刷新
	onPullDownRefresh() {},
	// 页面上拉触底
	onReachBottom() {},
	// 右上角分享
	onShareAppMessage() {},
	// 页面滚动事件
	onPageScroll() {},
	methods: {
		deleteItem(index) {
			this.$delete(this.shoppingData, index);
		},
		// 左滑删除 S
		touchS(e) {
			console.log('触摸开始', e);
			this.startX = Touches.getClientX(e)
		},
		touchM(e, item) {
			Touches.touchM(e, item, this.startX);
		},
		touchE(e, item) {
			console.log('触摸结束', e);
			const width = 134; // 定义操作列表宽度
			Touches.touchE(e, item, this.startX, width);
		},
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
};
</script>

<style>
.cart_list {
	padding: 20rpx 30rpx;
}
.order_goods {
	position: relative;
	overflow-x: hidden;
	overflow-y: hidden;
	width: 100%;
	height: 240rpx;
	margin-bottom: 10rpx;
}
.order_goods_item {
	display: flex;
	align-items: center;
	background: #fff;
	padding: 30rpx 20rpx;
	border-radius: 16rpx;
	position: absolute;
	z-index: 2;
	left: 0;
	top: 0;
	width: 100%;
	height: 240rpx;
	box-sizing: border-box;
}
.order_goods_oper {
	position: absolute;
	z-index: 1;
	right: 0;
	top: 0;
	height: 240rpx;
	width: 134rpx;
	line-height: 240rpx;
	text-align: center;
	font-size: 28rpx;
	background: #fd7d6f;
	color: #fff;
	border-radius: 0 18rpx 18rpx 0;
}
.order_goods_item .goods_img {
	width: 180rpx;
	height: 180rpx;
	border-radius: 16rpx;
	margin-right: 20rpx;
}
.order_goods_item .goods_info {
	flex: 1;
	font-size: 28rpx;
}

.goods_info .goods_name {
	height: 60rpx;
	display: -webkit-box;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	font-size: 24rpx;
	line-height: 30rpx;
}

.goods_info .goods_spec {
	overflow: hidden;
	font-size: 22rpx;
	margin: 20rpx 0 40rpx;
}
.goodsItem_quantity {
	width: 70rpx;
	height: 30rpx;
	line-height: 30rpx;
	text-align: center;
	border-radius: 4rpx;
}
.shoppingcart_jian {
	width: 20rpx;
	height: 2rpx;
	background: rgba(222, 222, 222, 1);
	border-radius: 2rpx;
}
</style>
