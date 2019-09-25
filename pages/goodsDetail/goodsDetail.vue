<template><!-- 小B（品牌会场商品详情） -->
	<view class="pb100" id="goodsDetail_page">
		<loading v-if="isLoading"></loading>
		<auth v-if="!gld.isAuth&&gld.type" @authSuccess="authSuccess"></auth>
		<view>
			<!-- banner S -->
			<view class="rel pl30 pr30 bgf">
				<swiper>
					<block v-for="(item, index) in imageList" :key="index">
						<swiper-item>
							<image :src="item.filesPath | fiterImgUrl" mode='aspectFill'></image>
							<view class="swiper_number">{{index+1}}/{{imageList.length}}</view>
							<view class='sold_out_goods' v-if="goodsItem.isSoldOut || goodsItem.isSellOut"></view>
							<view class="sold_out_btn btn_darkgrey fz11" v-if="goodsItem.isSoldOut || goodsItem.isSellOut">{{goodsItem.isSellOut?'已售罄':'已下架'}}</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- banner E -->
			
			<!-- 价格 S -->
			<view class='fz0 bgf'>
				<view class='goods_title'>
					<view class="flex1 fz14 lh36"> {{goodsItem.name}}</view>
				</view>
				<view class="goods_price">
					<view class="mr20 c_333">
						<view class='flex_text'>
							<view class='fz13'>￥</view>
							<view class='fz20 b'>{{purchaseGoods.lowestPrice}}</view>
						</view>
						<view class="mt20 fz13 tc">销售价</view>
					</view>
					<view class="price_vertical_line"></view>
					<view class="ml20 mr10 c_FD7D6F">
						<view class='flex_text'>
							<view class='fz13'>￥</view>
							<view class='fz20 b'>{{purchaseGoods.supplyPrice}}</view>
						</view>
						<view class="mt20 fz13 tc">供货价</view>
					</view>
					<view class="dib c_666 fz12 mr10 vb mt10">
						<text class="t_line">￥{{purchaseGoods.brandPrice}}</text>
					</view>
				</view>
			</view>
			<!-- 价格 E -->
			<view class='h20'></view>
			
			<!-- 如果售罄不显示 -->
			<view v-if="!goodsItem.isSellOut">
				<!-- 规格 S -->
				<view class='pd40_vertical pl30 bgf'>
					<view class='mb20 b'>规格选择</view>
					<view class='spec_box pl0'>
						<view class='shop_spec' v-if="goodsSpecMap.specOneList.length>0">
							<view class='spec_name'>{{specOneName}}</view>
							<block v-for="(item, index) in goodsSpecMap.specOneList" :key="index">
								<view :class="['spec_btn','btn_default', goodsItem.isSoldOut?'btn_soldout':item.notChoose?'btn_grey':!item.isSelected?'btn_white':'']" @click='specDidClick(index, 1)'>{{item.color}}</view>
							</block>
						</view>
						<view class='shop_spec' v-if="goodsSpecMap.specTwoList.length>0">
							<view class='spec_name'>{{specTwoName}}</view>
							<block v-for="(item, index) in goodsSpecMap.specTwoList" :key="index">
								<view :class="['spec_btn','btn_default', goodsItem.isSoldOut?'btn_soldout':item.notChoose?'btn_grey':!item.isSelected?'btn_white':'']" @click='specDidClick(index, 2)'>{{item.size}}</view>
							</block>
						</view>
						<view class='shop_spec'>
							<view class='spec_name'>数量</view>
							<view class='num_box'>
								<view :class="['reduction',goodsItem.isSoldOut?'btn_soldout':quantity==1?'bd_grey4 c_grey4':'']" @click='reduceGoods'>-</view>
								<view :class="[goodsItem.isSoldOut?'quantity_out':'numDisplayed']">{{goodsItem.isSoldOut? 0:quantity}}</view>
								<view :class="['add','c_grey3', goodsItem.isSoldOut?'btn_soldout':quantity==purchaseGoods.totalStock?'bd_grey4 c_grey4':'']" @click='increaseGoods'>+</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 规格 E -->
				<view class='h20'></view>
				<!-- 详情 S -->
				<view class='pd40_vertical pb150 bgf'>
					<view v-if="organizationGoods.information || imageList.length > 0">
						<view class='ml30 mb40 b500 c_333'>商品详情</view>
						<view v-if="imageList" class="mga10">
							<block v-for="(item) in imageList" :key="item.imageId">
								<view class="flex_c">
									<image class='maxW' :src="item.filesPath | fiterImgUrl" mode='widthFix'></image>
								</view>
							</block>
						</view>
					</view>
				</view>
				<!-- 详情 E -->
				
				<!-- 下架商品 S -->
				<view class="sold_out" v-if="!goodsItem.isSoldOut">
					<view class="btn_darkgrey btn_480" @click="soldOutGoods">
						下架商品
					</view>
				</view>
				<!-- 下架商品 E -->
			</view>
			<view v-else>
				<view class='pb20 b pl30' v-if="groupGoodsList.length">猜你喜欢</view>
				<view class="list_box">
					<view v-for="(item, index) in groupGoodsList" :key="index" class='goodsItem bgf' @click='goodsDetail(item, index)'>
						<view class='goodsItem_imgBox'>
							<image class='goodsItem_img' mode='aspectFill' :src="item.filesPath | fiterImgUrl" lazy-load></image>
							<view class='sold_out_goods'></view>
							<view class="sold_out_btn btn_darkgrey fz11">已售罄</view>
						</view>
						<view class='goods_bottom'>
							<view class='goods_name'>{{item.name}}</view>
							<view class='goods_footer'>
								<view class='goods_price'>
									<view class='c_FD7D6F mr10'>
										<text class='fz16 b'>￥{{item.supplyPrice | toFixedNum}}</text>
									</view>
									<view class='t_line fz12 c_grey3'>￥{{item.brandPrice | toFixedNum}}</view>
								</view>
							</view>
							<view class='sales_box bg_FFF5CA'>
								<view class="flexbox">
									<view>
										<image class="icon_money ml10" src='../../static/image/store/icon_store_money.png'></image>
									</view>
									<view>
										<text class="ml10 mr10 fz12 c_AD8C4E">带货赚￥{{item.makePrice | toFixedNum}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class='nodata' v-if="groupGoodsList.length==0" style='width:750rpx;line-height:300rpx;'>暂无商品~</view>
					<button class='loadmore' v-if="isLoad&&hasMoreData&&groupGoodsList.length>0" loading='true'>
						正在努力加载更多~
					</button>
					<view class='loadmore' v-if="!isLoad&&!hasMoreData&&groupGoodsList.length>0">
						暂无更多商品~
					</view>
				</view>
			</view>
			
			<!-- 底部悬浮栏 S-->
			<view class="page_footer_100">
				<view class='flex1 flex_s' v-if="!(goodsItem.isSellOut || goodsItem.isSoldOut)">
					<form reportSubmit='true' class="dib">
						<button class="btn_main bg_FFD662 cf" formType="submit" @click="keepTap(0)">购买</button>
					</form>
					<button class="btn_480 btn_douyin" open-type="share" data-channel="video">拍抖音</button>
				</view>
				<view v-else class="flex">
					<view class="btn_main btn_darkgrey flex1" v-if="goodsItem.isSellOut">商品已售罄</view>
					<view class="btn_main btn_main_theme flex1" v-else>上架当前商品</view>
				</view>
			</view>
			<!-- 底部悬浮栏 E-->
			
			<!-- 购物弹窗 S -->
			<view :class="[showShopModal ? 'js_dialog' : '']">
				<view class="dialog_mask" />
				<view class="dialog_container" @click.stop="setShopModalStatus(0)">
					<view class="drawer_modal" @click.stop="emptyEvent">
						<image class="drawer_close" src="../../static/image/default/icon_pop_close.png" @click="setShopModalStatus(0)"></image>
						<!-- 商品信息  -->
						<view class="shop_hd">
							<view class="shop_show"><image class="shop_img" mode="aspectFill" :src="imageList[0].filesPath | fiterImgUrl"></image></view>
							<view class="shop_info">
								<view class="goods_name">{{ goodsItem.name }}</view>
								<view>
									<text class="fz12 themeC">￥</text>
									<text class="fz18 themeC b">{{ purchaseGoods.supplyPrice }}</text>
									<text class="c_grey3 fz11 ml10 t_line">￥{{ purchaseGoods.brandPrice }}</text>
								</view>
							</view>
						</view>
						<!-- 规格与数量 -->
						<scroll-view scroll-y="true" :class="['shop_bd', 'spec_box', isIpFullScreen ? 'ip_shop_bd' : '']">
							<view class="shop_spec" v-if="goodsSpecMap.specOneList.length > 0">
								<view class="spec_name">{{ goodsSpecMap.specOneName }}</view>
								<block v-for="(item, index) in goodsSpecMap.specOneList" :key="index">
									<view :class="['spec_btn', 'btn_default', item.notChoose ? 'btn_grey' : !item.isSelected ? 'btn_white' : '']" @click="specDidClick(index, 1)">
										{{ item.color }}
									</view>
								</block>
							</view>
							<view class="shop_spec" v-if="goodsSpecMap.specTwoList.length > 0">
								<view class="spec_name">{{ goodsSpecMap.specTwoName }}</view>
								<block v-for="(item, index) in goodsSpecMap.specTwoList" :key="index">
									<view :class="['spec_btn', 'btn_default', item.notChoose ? 'btn_grey' : !item.isSelected ? 'btn_white' : '']" @click="specDidClick(index, 2)">
										{{ item.size }}
									</view>
								</block>
							</view>
							<view class="shop_spec">
								<view class="spec_name">数量</view>
								<view class="num_box">
									<view :class="['reduction', quantity == 1 ? 'bd_grey4 c_grey4' : '']" @click.stop="reduceGoods">-</view>
									<view class="numDisplayed">{{ quantity }}</view>
									<view :class="['add', 'c_grey3', quantity == purchaseGoods.totalStock ? 'bd_grey4 c_grey4' : '']" @click.stop="increaseGoods">+</view>
								</view>
							</view>
						</scroll-view>
						<view :class="['drawer_ft', isIpFullScreen ? 'ip_shop_bottom' : '']">
							<view class="drawer_btn drawer_btn_white" @click="keepTap(1)">加入购物车</view>
							<view class="drawer_btn bg_theme cf" @click="keepTap(2)">立即购买</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 购物弹窗 E  -->
			
		</view>
		<!-- 返回顶部 -->
		<image class='scrollTop' mode='aspectFill' v-if="floorstatus" @click='pageScrollToTop' src='../../static/image/default/icon_up.png'></image>
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	import {setPurGoodsItem} from '../../utils/goodsTools';
	import {getDidClickSpec, dealGoodsSpec, keepTap, disposeGoodsSpec} from '../../utils/shoppingTools';
	import {getImgUrlBySize} from '../../utils/imageTool';
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
			...mapState(['gld', 'server', 'config', 'imgServer', 'upd'])
		},
		data() {
			return {
				isLoading: true,
				toastHidden: false,
				showToastTxt: '',
				goodsSpecId: '',
				goodsGroupId: '',
				goodsGroup: {},
				organizationState: '',
				shoppingNotice: '',
				endActivity: '',
				// 是否未开售
				noSale: false,
				sourceType: '',
				organizationGoods: [],
				goodsTotalStock: '',
				netStatus: false,
				goodsMarkList: [],
				weixinShoppingCartList: [],
				cashBackEnable: '',
				showShopGuide: false,
				//优惠券列表
				couponList: [],
				couponListShow: [],
				isShowInstructions: false,
				specOneName: '颜色',
				specTwoName: '尺码',
				// 购物相关 S
				// 规格大数组
				goodsSpecMap: {
					specOneName: '',
					specOneList: [],
					specTwoName: '',
					specTwoList: []
				},
				onASpecOneItemIndex: 0,
				onASpecTwoItemIndex: 0,
				// 购买数量
				quantity: 1,
				// 选中的商品规格（加入购物车/立即购买）
				isPurchasing: true,
				// 购物相关 E
				customPremiumIndex: 0,
				customOaPremiumIndex: 0,
				// 分享类型(1：分享图片 2：分享链接)
				shareType: 1,
				isNewUserDialog: false,
				fromUserId: '',
				brandEnter: false, // 小B从品牌会场进入的商品详情
				
				isSoldOut: false, // 是否下架
				isSellUp: false, // 是否售罄
				
				// 猜你喜欢
				groupGoodsList: [],
				isLoad: false,
				hasMoreData: false,
				length: 10,
				pageSize: 10,
				floorstatus: false, // 返回顶部
				
				showShopModal: false,
				
				goodsItem: {}, // 当前商品对象
				imageList: [{}], // 当前商品图片数组
				purchaseGoods: {}, // 选中的商品规格 （默认选中第一种）
				defaultPurchaseGoods: {},
			}
		},
		onLoad(options) {
			console.log(this.upd.goodsItem);
			if (options.brandEnter) {
				this.brandEnter = true;
			}
			if (options.goodsSpecId) {
				this.goodsSpecId = options.goodsSpecId;
			}
			if (options.goodsGroupId) {
				this.goodsGroupId = options.goodsGroupId;
			}
			this.util.getUserInfo((userInfo)=>{
				if (!this.gld.isAuth) return;
				this.getData(options);
			})
		},
		onShow() {
			
		},
		// 页面滚动事件
		onPageScroll(e) {
			if (e.scrollTop > 330 && !this.floorstatus) {
				this.floorstatus = true;
			} else if (e.scrollTop <= 330 && this.floorstatus) {
				this.floorstatus = false;
			}
		},
		// 页面下拉刷新
		onPullDownRefresh() {
			if (this.goodsItem.isSellOut) {
				this.ProductManagerList(true);
			}
		},
		// 页面上拉触底
		onReachBottom() {
			if (this.goodsItem.isSellOut) {
				if (this.hasMoreData) {
					if (!this.isLoad) {
						this.isLoad = true;
						this.ProductManagerList();
					}
				}
			}
		},
		// 右上角分享
		onShareAppMessage(shareOption) { 
			let that = this;
			let path = '/pages/InPurchasing/goodsDetail?goodsSpecId=' + this.goodsSpecId +'&goodsGroupId='+ this.goodsSpecId;
			switch (shareOption.channel) {
				case 'video':
					return {
						channel: 'video',
						title: '十二星选优惠多多',
						path: path,
						extra: {
							videoPath: shareOption.target.dataset.path
						}
					};
					break;
				default:
					return {
						title: '十二星选',
						desc: '3.3折等你来购',
						path: path, // ?后面的参数会在转发页面打开时传入onLoad方法
						imageUrl: '../../static/image/default/searchDemo1.jpg', // 支持本地或远程图片，默认是小程序icon
						templateId: '3s56sfujosf5jrcf42',
						success() {
							console.log('转发发布器已吊起，并不意味着用户转发成功，微头条不提供这个时机的回调');
						},
						fail() {
							console.log('转发发布器吊起失败');
						}
					};
					break;
			}
		},
		methods: {
			...mapMutations(['changeUpd']),
			getData(options) {
				// if (options.fromUserId) {
				// 	this.fromUserId = options.fromUserId;
				// }
				// this.getGoodsDetailByGoosdId();
				if (this.upd.goodsItem) {
					this.goodsItem = this.upd.goodsItem;
					this.disposeGoodsData();
					if (this.goodsItem.isSellOut) {
						this.ProductManagerList();
					}
					this.changeUpd({
						goodsItem: null
					})
				}
			},
			disposeGoodsData() { // 处理当前商品数据
				let goodsItem = this.goodsItem;
				this.imageList = goodsItem.photos || []; // 商品照片数组
				this.defaultPurchaseGoods = goodsItem.specs[0] || {}; // 暂存第一个规格信息（用作未选择规格时的默认数据）
				disposeGoodsSpec(this, goodsItem, false); // 处理商品规格数据
				this.isLoading = false;
			},
			authSuccess() {
				this.getData(this.options);
			},
			// (猜你喜欢)
			ProductManagerList(onPullDown) {
				let that = this;
				let pageNumber = onPullDown? 1 : ((this.groupGoodsList.length/this.pageSize)+1);
				this.util.sendPost({
					url: this.config.ProductManagerList,
					method: 'POST',
					data: JSON.stringify({
						pageNumber,
						pageSize: that.pageSize
					}),
					successFn(res) {
						uni.stopPullDownRefresh();
						console.log(res);
						let groupGoodsList = res.data.rows || [];
						groupGoodsList.forEach(item=>{
							// console.log(item.photos[0].filesPath);
							item.photos = item.photos || [{}];
							item.specs = item.specs || [{}];
							item.filesPath = item.photos[0].filesPath || '';
							item.supplyPrice = item.specs[0].supplyPrice;
							item.brandPrice = item.specs[0].brandPrice;
							item.makePrice = item.specs[0].lowestPrice - item.specs[0].supplyPrice;
							item.isSoldOut = item.specs.every(item=>item.stock==0); // 是否售罄
							item.isSellOut = false; //是否下架
						})
						
						if (groupGoodsList.length < that.pageSize) { //如果返回的数据小于分页长度表示没有更多数据了
							that.hasMoreData = false;
						} else {
							that.hasMoreData = true;
						}
						if (onPullDown) {
							that.groupGoodsList = groupGoodsList;
						} else {
							that.groupGoodsList = that.groupGoodsList.concat(groupGoodsList);
						};
						that.isLoading = false;
						that.isLoad = false;
						
					},
					failFn(error) {
						uni.stopPullDownRefresh();
					}
				})
			},
			// 点击规格
			specDidClick(index, specType) {
				let that = this;
				getDidClickSpec(that, index, specType);
			},
			// 减少商品
			reduceGoods() {
				if (this.quantity > 1) {
					this.quantity--;
				}
			},
			// 增加商品
			increaseGoods: function () {
				if (this.purchaseGoods.totalStock == this.quantity) {
					return;
				}
				if (this.quantity >= this.purchaseGoods.totalStock) { //如果设置的数量大于等于总库存，直接返回
					return;
				}
				if (this.sourceType == 6) {
					this.util.showToast(this, '因海淘直邮商品涉及入境清关，单个订单限购一组');
					return;
				}
				this.quantity++;
			},
			// 确认添加购物车 / 确认购买
			keepTap(shoppingType) {
				console.log(shoppingType);
				let that = this;
				if (shoppingType == 0) {
					this.showShopModal = true;
					return;
				}
				if (!that.purchaseGoods.id || !that.purchaseGoods.supplyPrice) {
					
					that.util.showToast(that, '请勾选商品类型');
					return;
				}
				console.log('选择了规格111111');
				that.util.showToast(that, '暂无接口');
				// 查询商品库存
			},
			// 返回顶部
			pageScrollToTop() {
				if (uni.createSelectorQuery()) {
					uni.createSelectorQuery().select('#goodsDetail_page').boundingClientRect(function(rect) {
						uni.pageScrollTo({
							scrollTop: rect.top
						})
					}).exec()
				} else {
					uni.pageScrollTo({
						scrollTop: 0
					})
				}
			},
			setShopModalStatus() {
				this.showShopModal = false;
			},
			getSpecObj(specItem) { //创建一个新的规格对象
				let newSpecItem = {};
				newSpecItem.brandPrice = specItem.brandPrice;
				newSpecItem.costPrice = specItem.costPrice;
				newSpecItem.id = specItem.id;
				newSpecItem.lowestPrice = specItem.lowestPrice;
				newSpecItem.productId = specItem.productId;
				newSpecItem.stock = specItem.stock;
				newSpecItem.color = specItem.color;
				newSpecItem.size = specItem.size;
				newSpecItem.supplyPrice = specItem.supplyPrice;
				newSpecItem.topPrice = specItem.topPrice;
					
				newSpecItem.isSelected = specItem.isSelected;
				newSpecItem.specOneList = specItem.specOneList || [];
				newSpecItem.specTwoList = specItem.specTwoList || [];
				return newSpecItem
			},
			emptyEvent() {},
			soldOutGoods() {
				this.util.showToast(this, '功能待开发');
			},
		}
	}
</script>

<style>
	/* 头部 S */
	/* 商品图片 */
	.brand_box{
	  padding-left: 10rpx;
	  font-size: 0;
	}
	.brand_item{
	  position: relative;
	  width: 108rpx;
	  margin: 0 20rpx 20rpx;
	  display: inline-block;
	  text-align: center;
	}
	
	.brand_logo{
	  width: 108rpx;
	  height: 108rpx;
	  border-radius:50%;
	}
	.brand_name{
	  display: inline-block;
	  width: 4em;
	  white-space: nowrap;
	  overflow: hidden;
	  text-align: center;
	  margin-top: 20rpx;
	  font-size: 26rpx;
	}
	.group_infor{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 40rpx 30rpx;
	  background: #fff;
	}
	
	swiper{
	  width: 690rpx;
	  height: 690rpx;
	  border-radius: 12rpx;
	  overflow: hidden;
	}
	swiper-item image{
	  width: 100%;
	  height: 100%;
	  border-radius: 12rpx;
	}
	.swiper_number{
	  position: absolute;
	  right: 20rpx;
	  bottom: 20rpx;
	  padding: 6rpx 16rpx;
	  font-size: 20rpx;
	  color: #fff;
	  background: rgba(0,0,0,0.2);
	  border-radius:16rpx;
	}
	.sold_out_goods {
	  position: absolute;
		background:linear-gradient(180deg,rgba(252,252,252,0.3) 0%,rgba(247,247,247,1) 100%);
	  top: 0rpx;
	  left: 0rpx;
	  z-index: 2;
		right: 0rpx;
	  bottom: 0rpx;
	}
	.sold_out_btn {
		position: absolute;
		left: 292rpx;
		bottom: 40rpx;
		z-index: 3;
		width:106rpx;
		height:38rpx;
		line-height: 38rpx;
		border-radius:19px;
		text-align: center;
	}
	.mr4{
	  margin-right: 4rpx;
	}
	/* 商品分类名称 */
	.goods_cate{
	  padding: 0 20rpx;
	  height: 72rpx;
	  line-height: 72rpx;
	  font-size: 24rpx;
	  color: #999;
	}
	.goods_cate .goodsNumber{
	  display: inline-block;
	  text-align: left;
	  width: 50%;
	}
	.goods_cate .cateName{
	  display: inline-block;
	  text-align: right;
	  width: 50%;
	}
	/* 头部 E  */
	
	/* 商品信息 S*/
	.detail {
	  padding: 20rpx 30rpx;
	}
	.goods_title{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  padding: 40rpx 30rpx;
	}
	.goods_title .share_btn{
	  padding-left: 30rpx;
	  text-align: center;
	  white-space: nowrap;
	}
	.goods_price{
	  display: flex;
	  align-items: flex-start;
	  padding: 0 30rpx 40rpx;
	}
	.vertical_line{
	  height: 76rpx;
	}
	.flex_text{
	  display: flex;
	  align-items: baseline;
	}
	.price_vertical_line{
	  width: 1rpx;
	  height: 86rpx;
	  border-left: 1rpx solid #e6e6e6;
	}
	/* 底部悬浮栏 S */
	.detail_nav {
	  display: flex;
	  align-items: center;
	  box-shadow:0 -1rpx 0 0 #e6e6e6;
	}
	.detail_nav .min_item{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 136rpx;
	  height: 100%;
	  line-height:26rpx;
	  font-size: 22rpx;
	}
	.min_item .mb14{
	  margin-bottom: 14rpx;
	}
	.sold_out {
		display: flex;
		justify-content: center;
		height: 248rpx;
		padding-top: 60rpx;
	}
	.quantity_out {
		color:#DEDEDE;
		background:#fff;
		flex: 1;
		height: 100%;
		font-size: 26rpx;
		border-top:1rpx solid rgba(222,222,222,1);
		border-bottom:1rpx solid rgba(222,222,222,1);
	}
	/* 底部悬浮栏 E */
	.scrollTop {
		position: fixed;
		bottom: 120rpx;
		right: 30rpx;
		width: 70rpx;
		height: 70rpx;
		z-index: 50;
	}
</style>
