<template><!-- 小B 确认订单 -->
	<view class="pb100">
		<loading v-if="isLoading"></loading>
		
		<view class="pd2030">
			<!-- 收货地址 S -->
			<view class="pd30 bdr16 bgf flex_c">
				<view class="flex1">
					<view v-if="!site" class="site_no c_333 fz16">请填写收货地址</view>
					<view class="fz14" v-else>
						<view class="c_333 mb20 flexbox b500">
							<view>{{site.name}}</view>
							<view class="mr20 ml20">{{site.phone}}</view>
							<view v-if="site.isDefault == 1" class="tag_small tag_small_buy">默认</view>
						</view>
						<view class="c_666 nowrap1 lh30">
							{{site.area}}{{site.address}}
						</view>
					</view>
				</view>
				<view class="ml10">
					<image class="img20" src="../../static/image/mine/icon_arrow_right_gray.png"></image>
				</view>
			</view>
			<!-- 收货地址 E -->
			
			<!-- 订单列表 S -->
			<view>
				<view class="pd30 bdr16 bgf mt20" v-for="(item, index) in orderArray" :key="index">
					<view class="flexbox mb30">
						<view class="mr10"><image class="img28" src="../../static/image/order/home_gray.png"></image></view>
						<view class="c_333 fz13">{{item.name}}</view>
					</view>
					<view>
						<!-- 每个商品 S -->
						<view class='order_goods_item' v-for="(goodsItem, goodsIndex) in item.data" :key="goodsIndex">
						  <image class='goods_img' :src="goodsItem.goodsDefaultImage | getImgUrlBySize('s')" mode='aspectFill'></image>
						  <view class='goods_info'>
						    <view class='flex_s'>
						      <view class='goods_name c_333'>{{goodsItem.goodsName}}</view>
						      <view class='goods_num c_666'>x {{goodsItem.quantity}}</view>
						    </view>
						    <!-- <view class='c_grey3'>货号：{{goodsItem.goodsNumber}}</view> -->
						    <view class='goods_spec tag_small tag_small_type'>{{goodsItem.specName}}</view>
						    <view class='flexbox'>
						      <view class='c_FD7D6F b500 fz16 flex1'>￥{{goodsItem.goodsPrice}}</view>
						      <view v-if="isOpenGoodCircle==1&&item.currState==4">
						        <!-- <share-button v-if="{{goodsItem.product.item_code}}" product="{{goodsItem.product}}" type="1" fore-color="#989898" bind:error="on_error"/> -->
						      </view>
						      <view class='tag_small tag_small_red' v-if="goodsItem.refundQuantity>0">退款成功</view>
						      <view class='tag_small tag_small_red' v-if="goodsItem.currRefundState!=2&&goodsItem.currRefundState">{{goodsItem.refundDesc}}</view>
						    </view>
						  </view>
						</view>
						<!-- 每个商品 E -->
					</view>
				</view>
			</view>
			<!-- 订单列表 E -->
			<view class="bgf bdr16 fz13 mt20">
			 <view class="flex_sc pd30 pr20">
				<view class="c_333 b400">商品总计</view>
				<view class="c_FD7D6F">￥654.00</view>
			 </view>
			 <view class="h1 bg_DEDEDE ml30 mr30"></view>
			 <view class="flex_sc pd30 pr20">
				<view class="c_333 b400">红包</view>
				<view>￥999.00</view>
			 </view>
			 <view class="h1 bg_DEDEDE ml30 mr30"></view>
			 <view class="flexbox pd30 pr20">
				<view class="c_333 b400 mr30">留言</view>
				<input class="flex1" maxlength='60' placeholder='选填，60字以内' placeholder-class="wg_placeholder"></input>
			 </view>
			</view>
			<!-- 底部悬浮栏 S-->
			<view class="page_footer_100 fz14">
				<view class="flexbox c_333">
					<view>应付</view>
					<view class="c_FD7D6F ml10">￥654.23</view>
				</view>
				<view :class="['btn_main', site? 'btn_main_theme':'btn_darkgrey']">去结算</view>
			</view>
			<!-- 底部悬浮栏 E-->
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
				showToastTxt: '',
				site: {
					address: "大幅度的",
					area: "天津市-河东区-水电电",
					id: "d0189178ae364739a9adc340d59bd435",
					isDefault: 1,
					name: "东方闪电发",
					phone: "15814999999",
					userId: "f6a2f5e85709471e8caa74066a12a70f"
				},
				orderArray: [{
					name: '东京热卖',
					data: [
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
						},{
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
				},{
					name: '云货专场',
					data: [
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
				}]
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
	.site_no {
		line-height: 76rpx;
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
