<template><!-- 小B店铺 -->
	<view id="store_page">
		<loading v-if="isLoading"></loading>
		<auth v-if="!gld.isAuth&&gld.type" @authSuccess="authSuccess"></auth>
		<view class="pt30">
			<!-- 店铺头部 S -->
			<view class="store_header" v-if="gld.dYuserInfo">
				<view class="store_image" v-if="gld.dYuserInfo.avatarUrl">
					<image class="maxBox" :src="gld.dYuserInfo.avatarUrl" mode="aspectFill"></image>
				</view>
				<view class="store_describe">
					<view class="store_title fz20 b cf" v-if="gld.dYuserInfo.nickName">{{gld.dYuserInfo.nickName}}的店铺</view>
				</view>
			</view>
			<!-- 店铺头部 E -->
			<!-- 列表 S -->
			<view class="list_box">
				<view v-for="(item, index) in groupGoodsList" :key="item.goodsSpecId" class='goodsItem bgf' @click='goodsDetail(item, index)'>
					<view class='goodsItem_imgBox'>
						<image class='goodsItem_img' mode='aspectFill' :src="item.goodsDefaultImage | getImgUrlBySize('s')" lazy-load></image>
						<view class='sold_out_goods' v-if="item.totalStock==0"></view>
						<view class="sold_out_btn btn_darkgrey fz11" v-if="item.totalStock==0">已售罄</view>
					</view>
					<view class='goods_bottom'>
						<view class='goods_name'>{{item.goodsName}}</view>
						<view class='goods_footer'>
							<view class='goods_price'>
								<view class='c_FD7D6F mr10'>
									<text class='fz16 b'>￥{{item.supplyPrice | toFixedNum}}</text>
								</view>
								<view class='t_line fz12 c_grey3'>￥{{item.highestPrice | toFixedNum}}</view>
							</view>
						</view>
						<view class='sales_box bg_FFF5CA'>
							<view class="flexbox">
								<view>
									<image class="icon_money ml10" src='../../static/image/store/icon_store_money.png'></image>
								</view>
								<view>
									<button class="ml10 mr10 fz12 c_AD8C4E">带货赚￥{{(item.lowestPrice-item.supplyPrice) | toFixedNum}}</button>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class='nodata' v-if="groupGoodsList.length==0&&!isLoading" style='width:750rpx;line-height:300rpx;'>暂无商品~</view>
				<button class='loadmore' v-if="isLoad&&hasMoreData&&groupGoodsList.length>0" loading='true'>
					正在努力加载更多~
				</button>
				<view class='loadmore' v-if="!isLoad&&!hasMoreData&&groupGoodsList.length>0">
					已经到底了~
				</view>
			</view>
			<!-- 列表 E -->
		</view>
		<!-- 返回顶部 -->
		<image class='scrollTop' mode='aspectFill' v-if="floorstatus" @click='pageScrollToTop' src='../../static/image/default/icon_up.png'></image>
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	import {setPurGoodsItem} from '../../utils/goodsTools';
	export default {
		computed:{
			...mapState(['gld', 'server', 'config'])
		},
		data() {
			return {
				num: 0,
				isLoading: true,
				toastHidden: false,
				showToastTxt: '',
				groupGoodsList: [],
				isLoad: false,
				hasMoreData: false,
				length: 10,
				goodsGroupId: 18485,
				floorstatus: false,
			}
		},
		onLoad(options) {
			this.util.getUserInfo(()=>{
				if (!this.gld.isAuth) return;
				this.getData();
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
		onShareAppMessage(shareOption) {
			
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
			getData() {
				this.getGroupGoodsList();
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
					if (onPullDown) {
						that.groupGoodsList = groupGoodsList;
					} else {
						that.groupGoodsList = that.groupGoodsList.concat(groupGoodsList);
					};
					that.isLoading = false;
					that.isSwitchLoading = false;
					that.isLoad = false;
					//开启弹幕倒计时
					// that.startOnlineInterval();
				}, function() {
					uni.stopPullDownRefresh();
				});
			},
			goodsDetail(item) {
				uni.navigateTo({
					url: '../goodsDetail/goodsDetail?goodsGroupId=' + this.goodsGroupId + '&goodsSpecId=' + item.goodsSpecId
				})
			},
			pageScrollToTop() {
				if (uni.createSelectorQuery()) {
					uni.createSelectorQuery().select('#store_page').boundingClientRect(function(rect) {
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
			authSuccess() {
				this.getData(this.options);
			},
			emptyEvent() {}
		}
	}
</script>

<style>
	/* 店铺头部 S */
	.store_header {
		display: flex;
		align-items: center;
		padding: 40rpx 30rpx;
		background: #FFD662;
		border-radius: 40rpx;
		margin: 0 30rpx;
	}
	.store_image {
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
		border-radius: 50%;
	}
	.store_describe {
		padding: 0 30rpx;
		flex: 1;
	}
	.store_title {
		font-family: PingFangSC;
	}
	/* 店铺头部 E */
</style>
