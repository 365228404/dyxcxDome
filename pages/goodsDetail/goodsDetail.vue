<template><!-- 小B（品牌会场商品详情） -->
	<view class="pb100">
		<loading v-if="isLoading"></loading>
		
		<view>
			<!-- banner S -->
			<view class="rel pl30 pr30 bgf">
				<swiper>
					<block v-for="(item, index) in imageList" :key="item.imageId" :index="index">
						<swiper-item>
							<image :src="item.imageUrl | getImgUrlBySize('m')" mode='aspectFill'></image>
							<view class="swiper_number">{{index+1}}/{{imageList.length}}</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- banner E -->
			<view class='fz0 bgf'>
				<!-- 价格 -->
				<view class='goods_title'>
					<view class="flex1 fz14 lh36"> {{organizationGoods.goodsName}}</view>
				</view>
				<view class="goods_price">
					<view class="mr20">
						<view class='flex_text themeC'>
							<view class='fz13'>￥</view>
							<view class='fz20 b'>{{purchaseGoods.currPrice}}</view>
						</view>
						<view class="mt20 fz13 tc">销售价</view>
					</view>
					<view class="price_vertical_line"></view>
					<view class="ml20 mr10">
						<view class='flex_text themeC'>
							<view class='fz13'>￥</view>
							<view class='fz20 b'>{{purchaseGoods.marketPrices}}</view>
						</view>
						<view class="mt20 fz13 tc">供货价</view>
					</view>
					<view class="dib c_grey3 fz12 mr10 vb mt10">
						<text class="t_line">￥{{purchaseGoods.marketPrices}}</text>
					</view>
				</view>
			</view>
			<view class='h20'></view>
		</view>
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	import {setPurGoodsItem} from '../../utils/goodsTools';
	import {getDidClickSpec, dealGoodsSpec, keepTap} from '../../utils/shoppingTools';
	import {getImgUrlBySize} from '../../utils/imageTool';
	export default {
		computed:{
			...mapState(['gld', 'server', 'config', 'imgServer'])
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
				imageList: [],
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
				purchaseGoods: {},
				isPurchasing: true,
				// 购物相关 E
				customPremiumIndex: 0,
				customOaPremiumIndex: 0,
				// 分享类型(1：分享图片 2：分享链接)
				shareType: 1,
				isNewUserDialog: false,
				fromUserId: '',
				brandEnter: false, // 小B从品牌会场进入的商品详情
			}
		},
		onLoad(options) {
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
				this.getData(options);
			})
		},
		onShow() {
			
		},
		// 右上角分享
		onShareAppMessage() {

		},
		methods: {
			getData(options) {
				if (options.fromUserId) {
					that.fromUserId = options.fromUserId;
				}
				this.getGoodsDetailByGoosdId();
			},
			// 获取商品详情
			getGoodsDetailByGoosdId() {
				let that = this;
				this.util.sendPostWX(this.config.getGoodsDetailByGoodsSpecId, {
					inviteUserId: '',
					goodsSpecId: that.goodsSpecId,
					goodsGroupId: that.goodsGroupId,
					organizationId: that.gld.organizationId
				}, function (res) {
					uni.stopPullDownRefresh();
					let organization = res.resultData.organization || {};
					if (organization.organizationState != 1){//店主被禁用
						that.organizationState = organization.organizationState;
						return;
					}
					// 购物须知
					let shoppingNotice = res.resultData.shoppingNotice;
					let showShopGuide = false;
					if(shoppingNotice) {
						if (shoppingNotice.indexOf('yhtplus.yunhuotong.net') > -1 || shoppingNotice.indexOf('yhtplus.yunhuotong.net') > -1) {
							that.shoppingNotice = shoppingNotice;
						} else {
							that.shoppingNotice = shoppingNotice.replace(/\/yhtplus\//g, that.server);
						};
						showShopGuide = true;
					}
					let goodsGroup = res.resultData.goodsGroup;
					let organizationGoods = res.resultData.organizationGoods;
					let isShowStoreGoodsGroup = res.resultData.isShowStoreGoodsGroup;
					console.log('组织organization', organization);
					goodsGroup.tagList = [];
					if (goodsGroup.tag) {
						goodsGroup.tagList = goodsGroup.tag.split(',');
					}
					let currentTime = new Date().getTime()
					if (goodsGroup.saleEndTime < currentTime || organizationGoods.shelfState == 1) {//已结束
						that.endActivity = true;
					} else {
						if (organization.isShowStoreGoodsGroup == 2 && organization.isShowSystemSecommendation == 2) {
							//会场设置开启
							if (isShowStoreGoodsGroup != 1) {
								console.log('会场已经关闭');
								that.endActivity = true;
								goodsGroup.saleEndTime = currentTime;
							}
						}
						if (goodsGroup.saleStartTime > currentTime) {//会场未开始
							that.noSale = true;
						}
					};
					let weixinShoppingCartList = res.resultData.weixinShoppingCartList || [];
					// 当前售价
					organizationGoods.dailyPrice = organizationGoods.dailyPrice || 0;
					// 市场价
					organizationGoods.marketPrice = organizationGoods.marketPrice || 0;
					organizationGoods = setPurGoodsItem(organizationGoods, that.gld.organizationId);
					organizationGoods.currPrice = "￥" + that.util.formatAmount(organizationGoods.dailyPrice)
					if (organizationGoods.marketPrice) {
						organizationGoods.originalPrice = "￥" + that.util.formatAmount(organizationGoods.marketPrice)
					}
					// 获取总库存
					let goodsTotalStock = 0;
					let organizationSpecList = res.resultData.goodsSpecList;
					for (let i in organizationSpecList) {
						let goodsItem = organizationSpecList[i];
						if (goodsItem.totalStock) {
							goodsTotalStock += goodsItem.totalStock;
						}
					}
					if (goodsTotalStock <= 0) {
						goodsTotalStock = 0;
					}
					let title = organizationGoods.goodsName || '商品详情'
					uni.setNavigationBarTitle({
						title: title,
					});
					
					that.organizationState = organization.organizationState;
					that.goodsGroup = goodsGroup;
					that.sourceType = goodsGroup.sourceType;
					that.imageList = res.resultData.imageList;
					that.organizationGoods = organizationGoods;
					that.goodsTotalStock = goodsTotalStock;
					that.netStatus = 1;
					that.goodsMarkList = res.resultData.goodsMarkList;
					that.weixinShoppingCartList = weixinShoppingCartList;
					that.cashBackEnable = res.resultData.cashBackEnable;
					that.showShopGuide = showShopGuide;
					
					that.isLoading = false;
					// 不要同时渲染
					setTimeout(function () {
						dealGoodsSpec(that, res, false);
					}, 300);
				}, function () { //请求失败
					console.log('请求错误')
					that.netStatus =  2;
					that.isLoading = false;
				});
			},
			// 点击规格
			specDidClick(index, specType) {
				let that = this;
				getDidClickSpec(that, index, specType);
			},
			getSpecObj(specItem) { //创建一个新的规格对象
				let newSpecItem = {};
				
				newSpecItem.supplyPrice = specItem.dailyPrice;
				// newSpecItem.organizationSpecId = specItem.organizationSpecId;
				newSpecItem.goodsSpecId = specItem.goodsSpecId;
				newSpecItem.brandId = specItem.brandId;
				newSpecItem.shelfState = specItem.shelfState;
				newSpecItem.stockEarlyWarning = specItem.stockEarlyWarning;
				newSpecItem.goodsId = specItem.goodsId;
				newSpecItem.totalStock = specItem.totalStock;
				newSpecItem.specOne = specItem.specOne;
				newSpecItem.specTwo = specItem.specTwo;
				newSpecItem.dailyPrice = specItem.dailyPrice;
				newSpecItem.marketPrice = specItem.marketPrice;
					
				newSpecItem.isSelected = specItem.isSelected;
				newSpecItem.specOneList = specItem.specOneList;
				newSpecItem.specTwoList = specItem.specTwoList;
				return newSpecItem
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
			keepTap(e, shoppingType) {
				console.log(e, shoppingType);
				let that = this;
				if (!that.purchaseGoods.goodsSpecId || that.purchaseGoods.supplyPrice < 0) {
					
					that.util.showToast(that, '请勾选商品类型');
					return;
				}
				console.log('选择了规格111111');
				that.purchaseGoods.goodsGroupId = that.goodsGroupId;
				// 查询商品库存
				that.checkGoodsStock(that.purchaseGoods, function (resultGoods) {
					console.log('查询库存', resultGoods)
					if (resultGoods.hasStock && resultGoods.totalStock >= that.quantity) {
						if (shoppingType == 2) { //立即购买
							that.util.addPurchaseWouldGoodsReCord(that.goodsGroupId, that.purchaseGoods, 5, that.gld.fromOId);
						}
						if (that.brandEnter) {
							keepTap(that, shoppingType, 2, false, 2);
						} else {
							keepTap(that, shoppingType, 1, that.fromUserId, 4);
						}
					} else {
						that.util.showToast(that, '所选商品规格库存不足~', '', 2000);
						that.getGoodsDetailByGoosdId();
					}
				})
			},
			checkGoodsStock(goods, callBack) {
				let canSubmit = true;
				goods = goods || {};
				console.log('goods===', goods)
				if (!goods.goodsSpecId) {
					if (callBack) {
						callBack(goods);
					}
					return;
				}
				let param = {
					goodsSpecId: goods.goodsSpecId,
					goodsGroupId: goods.goodsGroupId,
					organizationId: this.gld.fromOId
				};
				this.util.sendPost(this.config.getGoodsDetailByGoodsSpecId, param, (res)=>{
					let organizationSpecList = res.resultData.goodsSpecList || [];
					for (let i in organizationSpecList) {
						let goodsItem = organizationSpecList[i];
						if (goods.goodsSpecId == goodsItem.goodsSpecId) {
							goods.totalStock = goodsItem.totalStock;
							if (goods.totalStock > 0) {
								goods.hasStock = true;
							} else {
								goods.hasStock = false;
							}
							break;
						}
					}
					if (callBack) {
						callBack(goods)
					}
				})
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
	/* 底部悬浮栏 E */
</style>
