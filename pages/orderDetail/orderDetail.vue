<template>
	<!-- 订单详情 -->
	<view class="pb164">
		<loading v-if="isLoading"></loading>

		<view class="pd2030">
			<view class="bgf bdr16 pd30">
				<view><view class="fz22 b500 c_FFD662">已发货</view></view>
				<view class="bg_DEDEDE mt30 mb30 h1"></view>
				<view class="flexbox fz14 c_333 b500">
					<view class="mr20">{{ site.name }}</view>
					<view>{{ site.phone }}</view>
				</view>
				<view class="address fz14 c_666">{{ site.area }}{{ site.address }}</view>
			</view>

			<view class="bgf bdr16 pd30 mt20">
				<view class="order_goods_item" v-for="(goodsItem, goodsIndex) in orderDetailList" :key="goodsIndex">
					<image class="goods_img" :src="goodsItem.goodsDefaultImage | getImgUrlBySize('s')" mode="aspectFill"></image>
					<view class="goods_info">
						<view class="flex_s">
							<view class="goods_name c_333">{{ goodsItem.goodsName }}</view>
							<view class="goods_num c_666">x {{ goodsItem.quantity }}</view>
						</view>
						<!-- <view class='c_grey3'>货号：{{goodsItem.goodsNumber}}</view> -->
						<view class="goods_spec tag_small tag_small_type">{{ goodsItem.specName }}</view>
						<view class="flexbox">
							<view class="c_FD7D6F b500 fz16 flex1">￥{{ goodsItem.goodsPrice }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bgf bdr16 fz13 mt20">
				<view class="flex_sc pd30 pr20">
					<view class="c_333 b400">商品总计</view>
					<view class="c_FD7D6F">￥654.00</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="flex_sc pd30 pr20">
					<view class="c_333 b400">运费</view>
					<view>￥999.00</view>
				</view>
			</view>
			<view class="bgf bdr16 fz13 mt20 c_333">
				<view class="flex pd30 pr20">
					<view >订单编号：</view>
					<view>DH201988788893</view>
				</view>
				<view class="h1 bg_DEDEDE ml30 mr30"></view>
				<view class="flex pd30 pr20">
					<view >下单时间：</view>
					<view>2019.08.15 15:47</view>
				</view>
			</view>
		</view>

		<!-- 底部悬浮栏 S-->
		<view class="page_footer_100 fz14">
			<view class="flexbox c_333">
				<view>应付</view>
				<view class="c_FD7D6F ml10">￥654.23</view>
			</view>
			<view class="flexbox">
				<view class="btn_white btn_main fz14 mr20 pd2044">查看物流</view>
				<view class="btn_main btn_main_theme fz14 pd2244">确认收货</view>
			</view>
		</view>
		<!-- 底部悬浮栏 E-->
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
		...mapState(['gld', 'server', 'config'])
	},
	data() {
		return {
			isLoading: false,
			toastHidden: false,
			showToastTxt: '',
			site: {
				address: '大幅度的',
				area: '天津市-河东区-水电电就放假案件都放假安排上飞机就阿萨德放假了按时发动机',
				id: 'd0189178ae364739a9adc340d59bd435',
				isDefault: 1,
				name: '东方闪电发',
				phone: '15814999999',
				userId: 'f6a2f5e85709471e8caa74066a12a70f'
			},
			orderDetailList: [
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
					currPrice: '60.00',
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
			]
		};
	},
	onLoad(options) {},
	onShow() {},
	// 页面下拉刷新
	onPullDownRefresh() {},
	// 页面上拉触底
	onReachBottom() {},
	// 右上角分享
	onShareAppMessage(shareOption) {
		
	},
	// 页面滚动事件
	onPageScroll() {},
	methods: {}
};
</script>

<style>
.address {
	height: 68rpx;
	display: -webkit-box;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	margin-top: 20rpx;
	line-height: 34rpx;
}
.pd2244 {
	padding: 22rpx 44rpx;
}
.pd2044 {
	padding: 20rpx 44rpx;
}

.order_goods_item{
	  display: flex;
	  margin-top: 20rpx;
	}
	.order_goods_item .goods_img{
	  width: 180rpx;
	  height: 180rpx;
	  border-radius: 16rpx;
	  margin-right: 20rpx;
	}
	.order_goods_item .goods_info{
	  flex: 1;
	  font-size: 28rpx;
	}
	
	.goods_info .goods_name {
	  width: 354rpx;
	  height:60rpx;
	  display:-webkit-box;
	  text-overflow:ellipsis;
	  -webkit-box-orient:vertical;
	  -webkit-line-clamp:2;
	  overflow:hidden;
	  font-size: 24rpx;
	  line-height: 30rpx;
	}
	
	.goods_info .goods_spec{
	  overflow: hidden;
	  font-size: 22rpx;
	  margin: 20rpx 0 40rpx;
	}
</style>
