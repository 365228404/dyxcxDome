<template><!-- 小B橱窗页面 -->
	<view id="showecase_page">
		<loading v-if="isLoading"></loading>
		<auth v-if="!gld.isAuth" @authSuccess="authSuccess"></auth>
		<view class="pt30">
			<!-- 店铺头部 S -->
			<view class="showcase_header" v-if="gld.dYuserInfo">
				<view class="showcase_image" v-if="gld.dYuserInfo.avatarUrl">
					<image class="maxBox" :src="gld.dYuserInfo.avatarUrl" mode="aspectFill"></image>
				</view>
				<view class="showcase_describe">
					<view class="fz20 c_333 b600" v-if="gld.dYuserInfo.nickName">{{gld.dYuserInfo.nickName}}的橱窗</view>
				</view>
				<button class="btn_shoot btn_douyin" open-type="share" data-channel="video">拍抖音</button>
			</view>
			<!-- 店铺头部 E -->
			<view class="pt40">
				<view class='b500 pl30 fz16 c_333' v-if="groupGoodsList.length">热销宝贝</view>
				<view class="list_box">
					<view v-for="(item, index) in groupGoodsList" :key="index" class='goodsItem bgf' @click='goodsDetail(item)'>
						<view class='goodsItem_imgBox'>
							<image class='goodsItem_img' mode='aspectFill' :src="item.filesPath | fiterImgUrl" lazy-load></image>
							<view class='sold_out_goods' v-if="item.isSoldOut || item.isSellOut"></view>
							<view class="sold_out_btn btn_darkgrey fz11" v-if="item.isSoldOut || item.isSellOut">{{item.isSellOut?'已售罄':'已下架'}}</view>
						</view>
						<view class='goods_bottom'>
							<view class='goods_name'>{{item.name}}</view>
							<view class='goods_footer_page'>
								<view class='goods_price'>
									<view class='c_FD7D6F mr10'>
										<text class='fz16 b'>￥{{item.supplyPrice | toFixedNum}}</text>
									</view>
									<view class='t_line fz12 c_grey3'>￥{{item.brandPrice | toFixedNum}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class='nodata' v-if="!groupGoodsList.length&&!isLoading" style='width:750rpx;line-height:300rpx;'>暂无商品~</view>
					<button class='loadmore' v-if="isLoad&&hasMoreData&&groupGoodsList.length>0" loading='true'>
						正在努力加载更多~
					</button>
					<view class='loadmore' v-if="!isLoad&&!hasMoreData&&groupGoodsList.length>0">
						暂无更多商品~
					</view>
				</view>
			</view>
		</view>
		<!-- 返回顶部 -->
		<view class='scrollTop' v-if="floorstatus">
			<image  mode='aspectFill' class="img70 mb10"  @click='pageScrollToTop' src='../../static/image/default/icon_up.png'></image>
			<button open-type="share">
				<image  mode='aspectFill' class="img70" src='../../static/image/default/icons_share.png'></image>
			</button>
		</view>
		<button class="share btn_shoot btn_share" v-if="!floorstatus" open-type="share">
			<image mode='aspectFill' class="img28 mr10 vab" src='../../static/image/goods/icon_shoot.png'></image>分享
		</button>
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
				floorstatus: false, // 返回顶部
				fromUserId: '',
				pageSize: 10,
			}
		},
		onLoad(options) {
			this.util.getUserInfo((userInfo)=>{
				if (!this.gld.isAuth) return;
				this.getData(options);
			})
		},
		onShow() {
			
		},
		// 页面下拉刷新
		onPullDownRefresh() {
			this.ProductManagerList(true);
		},
		// 页面上拉触底
		onReachBottom() {
			if (this.hasMoreData) {
				if (!this.isLoad) {
					this.isLoad = true;
					this.ProductManagerList();
				}
			}
		},
		// 右上角分享
		onShareAppMessage(shareOption) {
			let that = this;
			let path = '/pages/showcase/showcase';
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
			getData(options) {
				this.ProductManagerList();
			},
			authSuccess() {
				this.getData(this.options);
			},
			// 店铺商品列表
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
							item.isSellOut = item.specs.every(item=>item.stock==0); // 是否售罄
							// item.isSellOut = true; // 是否售罄
							item.isSoldOut = false; //是否下架
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
			goodsDetail(item) {
				this.changeUpd({
					goodsItem: JSON.parse(JSON.stringify(item))
				})
				uni.navigateTo({
					url: '../InPurchasing/goodsDetail'
				})
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
