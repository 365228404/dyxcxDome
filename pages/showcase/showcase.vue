<template><!-- 小B橱窗页面 -->
	<view id="showecase_page">
		<loading v-if="isLoading"></loading>
		<auth v-if="!gld.isAuth&&gld.organizationId" @authSuccess="authSuccess"></auth>
		<view class="pt30">
			<!-- 店铺头部 S -->
			<view class="showcase_header" v-if="gld.dYuserInfo">
				<view class="showcase_image" v-if="gld.dYuserInfo.avatarUrl">
					<image class="maxBox" :src="gld.dYuserInfo.avatarUrl" mode="aspectFill"></image>
				</view>
				<view class="showcase_describe">
					<view class="fz20 c_333 b600" v-if="gld.dYuserInfo.nickName">{{gld.dYuserInfo.nickName}}的橱窗</view>
				</view>
				<view class="btn_shoot btn_douyin">拍抖音</view>
			</view>
			<!-- 店铺头部 E -->
			<view class="pt40">
				<view class='b500 pl30 fz16 c_333'>热销宝贝</view>
				<view class="list_box">
					<view v-for="(item, index) in groupGoodsList" :key="item.goodsSpecId" class='goodsItem bgf' @click='goodsDetail(item, index)'>
						<view class='goodsItem_imgBox'>
							<image class='goodsItem_img' mode='aspectFill' :src="item.goodsDefaultImage | getImgUrlBySize('s')" lazy-load></image>
							<view class='sold_out_goods'></view>
							<view class="sold_out_btn btn_darkgrey fz11">已售罄</view>
						</view>
						<view class='goods_bottom'>
							<view class='goods_name'>{{item.goodsName}}</view>
							<view class='goods_footer_page'>
								<view class='goods_price'>
									<view class='c_FD7D6F mr10'>
										<text class='fz16 b'>￥{{item.dailyPrice}}</text>
									</view>
									<view class='t_line fz12 c_grey3'>￥{{item.originalPrice}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class='nodata' v-if="groupGoodsList.length==0" style='width:750rpx;line-height:300rpx;'>暂无商品~</view>
					<button class='loadmore' v-if="isLoad&&hasMoreData&&groupGoodsList.length>0" loading='true'>
						正在努力加载更多~
					</button>
					<view class='loadmore' v-if="!isLoad&&!hasMoreData&&groupGoodsList.length>0">
						已经到底了~
					</view>
				</view>
			</view>
		</view>
		<!-- 返回顶部 -->
		<view class='scrollTop' v-if="floorstatus">
			<image  mode='aspectFill' class="img70 mb10"  @click='pageScrollToTop' src='../../static/image/default/icon_up.png'></image>
			<button>
				<image  mode='aspectFill' class="img70" src='../../static/image/goods/icon_shoot_detail.png'></image>
			</button>
		</view>
		<view class="share btn_shoot btn_share" v-if="!floorstatus">
			<image mode='aspectFill' class="img28 mr10 vab" src='../../static/image/goods/icon_shoot.png'></image>拍抖音
		</view>
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
		<!-- <switchTabBar :tabNum="num" @cutTab="tabItemDidClick"></switchTabBar> -->
	</view>
</template>

<script>
	import switchTabBar from '../../components/switchTabBar';
	import {mapState, mapMutations} from 'vuex';
	import {setPurGoodsItem} from '../../utils/goodsTools';
	export default {
		components:{
			switchTabBar
		},
		computed:{
			...mapState(['gld', 'server', 'config'])
		},
		data() {
			return {
				num: 1,
				isLoading: true,
				toastHidden: false,
				showToastTxt: '',
				groupGoodsList: [],
				isLoad: false,
				hasMoreData: false,
				length: 10,
				goodsGroupId: 18039,
				floorstatus: false, // 返回顶部
			}
		},
		onLoad(options) {
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
		// 页面下拉刷新
		onPullDownRefresh() {
			this.getGroupGoodsList(true);
		},
		// 页面上拉触底
		onReachBottom() {
			if (this.hasMoreData) {
				if (!this.isLoad) {
					this.isLoad = true;
					this.getGroupGoodsList();
				}
			}
		},
		// 右上角分享
		onShareAppMessage() {

		},
		// 页面滚动事件
		onPageScroll(e) {
			if (e.scrollTop > 330 && !this.floorstatus) {
				this.floorstatus = true;
			} else if (e.scrollTop <= 330 && this.floorstatus) {
				this.floorstatus = false;
			}
		},
		methods: {
			getData(options) {
				if (options.fromUserId) {
					that.fromUserId = options.fromUserId;
				}
				this.getGroupGoodsList();
			},
			authSuccess() {
				this.getData(this.options);
			},
			getGroupGoodsList(onPullDown) {
				let that = this;
				let startIndex = onPullDown ? 0 : that.groupGoodsList.length;
				that.util.sendPostWX(that.config.getNewOranizationStoreGoodsList, {
					goodsGroupId: that.goodsGroupId,
					length: that.length,
					startIndex: startIndex,
					gcategory: 1,
					organizationId:that.gld.organizationId
				}, function(res) {
					uni.stopPullDownRefresh();
					let groupGoodsList = res.resultData.goodsList || [];
					if (groupGoodsList.length < that.length) { //如果返回的数据小于分页长度表示没有更多数据了
						that.hasMoreData = false;
					} else {
						that.hasMoreData = true;
					}
					for (let i = 0; i < groupGoodsList.length; i++) {
						let item = groupGoodsList[i];
						item = setPurGoodsItem(item);
					};
					if (onPullDown) {
						that.groupGoodsList = groupGoodsList;
					} else {
						that.groupGoodsList = that.groupGoodsList.concat(groupGoodsList);
					};
					that.isLoading = false;
					that.isLoad = false;
				}, function() {
					uni.stopPullDownRefresh();
				});
			},
			// 返回顶部
			pageScrollToTop() {
				if (uni.createSelectorQuery()) {
					uni.createSelectorQuery().select('#showecase_page').boundingClientRect(function(rect) {
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
			// 点击自定义tab
			tabItemDidClick(index) {
				if (index == 1) {
					return;
				}
				if (index == 0) {
					uni.redirectTo({
						url: '../store/store'
					});
				} else if (index == 2) {
					uni.redirectTo({
						url: '../mine/mine'
					});
				}
			}
		}
	}
</script>

<style>
	/* 店铺头部 S */
	page{
		background: #fff;
	}
	.showcase_header {
		display: flex;
		align-items: center;
		padding: 40rpx 30rpx;
		border-radius: 40rpx;
		margin: 0 30rpx;
		box-shadow:0px 4px 24px 0px rgba(0,0,0,0.1);
	}
	.showcase_image {
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
		border-radius: 50%;
	}
	.showcase_describe {
		padding: 0 30rpx;
		flex: 1;
	}
	.goodsItem .goods_footer_page {
	  margin-top: 16rpx;
	  display: flex;
	  align-items: center;
	}
	.goods_footer_page .goods_price {
	  flex: 1;
	  display: flex;
	  align-items: center;
	}
	/* 店铺头部 E */
	.share {
		position: fixed;
		bottom: 30rpx;
		right: 30rpx;
		z-index: 50;
	}
	.scrollTop {
		position: fixed;
		bottom: 110rpx;
		right: 30rpx;
		width: 70rpx;
		height: 70rpx;
		z-index: 50;
	}
</style>
