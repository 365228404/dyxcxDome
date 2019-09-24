<template><!-- 小B店铺 -->
	<view id="store_page">
		<loading v-if="isLoading"></loading>
		<auth v-if="!gld.isAuth" @authSuccess="authSuccess"></auth>
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
				<view v-for="(item, index) in groupGoodsList" :key="index" class='goodsItem bgf' @click='goodsDetail(item)'>
					<view class='goodsItem_imgBox'>
						<image class='goodsItem_img' mode='aspectFill' :src="item.filesPath | fiterImgUrl" lazy-load></image>
						<view class='sold_out_goods' v-if="item.isSoldOut"></view>
						<view class="sold_out_btn btn_darkgrey fz11" v-if="item.isSoldOut">已售罄</view>
					</view>
					<view class='goods_bottom'>
						<view class='goods_name'>{{item.name}}</view>
						<view class='goods_footer'>
							<view class='goods_price'>
								<view class='c_FD7D6F mr10'>
									<text class='fz16 b'>￥{{item.supplyPrice | toFixedNum}}</text>
								</view>
								<view class='t_line fz12 c_grey3'>￥{{item.topPrice | toFixedNum}}</view>
							</view>
						</view>
						<view class='sales_box bg_FFF5CA'>
							<view class="flexbox">
								<view>
									<image class="icon_money ml10" src='../../static/image/store/icon_store_money.png'></image>
								</view>
								<view>
									<button class="ml10 mr10 fz12 c_AD8C4E">带货赚￥{{item.makePrice | toFixedNum}}</button>
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
					暂无更多商品~
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
			...mapState(['gld', 'server', 'config', 'upd'])
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
				goodsGroupId: 18569,
				floorstatus: false,
				
				pageSize: 10,
				storeGoodsList: [],
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
			// this.getGroupGoodsList(true);
			this.ProductManagerList(true);
		},
		// 页面上拉触底
		onReachBottom() {
			if (this.hasMoreData) {
				if (!this.isLoad) {
					this.isLoad = true;
					// this.getGroupGoodsList();
					this.ProductManagerList();
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
			...mapMutations(['changeUpd']),
			getData() {
				// this.getGroupGoodsList();
				this.ProductManagerList();
			},
			// 店铺商品列表
			ProductManagerList(onPullDown) {
				let that = this;
				let pageNumber = onPullDown? 1 : ((this.storeGoodsList.length/this.pageSize)+1);
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
							item.topPrice = item.specs[0].topPrice;
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
			// 优选商品列表
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
				this.changeUpd({
					goodsItem: JSON.parse(JSON.stringify(item))
				})
				uni.navigateTo({
					url: '../goodsDetail/goodsDetail'
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
