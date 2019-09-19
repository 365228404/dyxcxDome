<template><!-- 我的订单 -->
	<view>
		<!-- 头部 S -->
		<view class='orderTopBar'>
		  <view class='searchBar'>
		    <image class='search_img' src='../../static/image/default/icon_search.png'></image>
		    <input class='search_input' :placeholder="placeholder" placeholder-class="wg_placeholder" v-model="keyWord"></input>
		    <button class='search_btn' @click='getOrderList(true)'>搜索</button>
		  </view>
		  <scroll-view class='stateBar' scroll-x="true">
		    <block v-for="(item, index) in orderState" :key="item.state">
		      <view :class="['stateItem', item.isSelected?'c_grey1':'c_grey3']" @click='itemDidClick(index)'>{{item.stateDes}}
		        <view class='bottomLine' v-if='item.isSelected'>
							<view class='bottomLine_item bg_FFD662'></view>
						</view>
		      </view>
		    </block>
		  </scroll-view>
		</view>
		<!-- 头部 E -->
		
		<!-- 列表 S -->
		<view class='listBox'>
			<noData v-if="!orderList.length&&!isLoading" :txt="txt"></noData>
			<loading v-if="isLoading"></loading>
		  <view class='list_itemBox' v-for="(item, index) in orderList" :key="item.orderId">
		    <view class='item_top'>
		      <image class='user_icon bg_grey5' :src="item.portraitUrl | getImgUrlBySize('s')" mode='aspectFill'></image>
		      <view class='flex1'>
		        <view class='flexbox mb10'>
		          <view class='max14em fz13 ovHE c_333'>{{item.weixinUserName}}</view>
		          <view v-if="item.orderType == 1" class="tag_small tag_small_buy ml10">自购</view>
		        </view>
		        <view class='fz11 c_666'>{{item.orderSn}}</view>
		      </view>
		      <view class='fz13 c_FD7D6F'>{{item.stateDes}}</view>
		    </view>
		    <!-- 每个商品 S -->
		    <view class='order_goods_item' v-for="(goodsItem, goodsIndex) in item.orderGoodsList" :key="goodsIndex">
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
		    <view class='item_bottom c_grey2'>
		      <view class='mt20 c_333 b fz13' v-if="gld.organizationId&&item.isCTermina==2">邮费为 <text class='themeC'>￥{{item.expressFee}}</text>，可入账金额为 <text class='themeC'>￥{{item.intoAccountAmount}}</text></view>
		      <view class='mt20 c_FD7D6F fz13' v-if="gld.organizationId&&item.isCTermina==2">
		        <text>共{{item.goodsCount}}件商品，订单金额 </text>
		        <text>￥{{item.totalAmout}}</text>
		      </view>
		      <view class='mt20 c_grey1 b fz14' v-else>
		        共<text class='themeC'>{{item.goodsCount}}</text>件商品，订单金额 <text class='themeC'>￥{{item.totalAmout}}</text>
		      </view>
		      <view class='mt20' v-if="item.makePrice>0&&item.currState==6">
		        <text>需补款，补款金额 </text>
		        <text>￥{{item.makePrice}}</text>
		      </view>
		      <!-- <view class='mt20' v-if="{{item.orderRefundAmount==item.totalAmout}}">
		        <text>退全款，退款金额：</text>
		        <text class='themeC fz14'>￥{{item.orderRefundAmount}}</text>
		      </view> -->
		      <!-- <view class='mt20' v-if="{{item.refundedPrice>0}}">已退还金额￥{{item.refundedPrice}}</view> -->
		      <!-- <view class='mt20'>下单时间：{{item.addTimeStr}}</view> -->
		      <view class='mt20' v-if="item.isCashBackStatus==2">返现成功
		        <text class='themeC'>￥{{item.choppingCashBackStr}}</text>元</view>
		
		      <view class='mt20' v-if="item.isCashBackStatus==5">砍单待返现
		        <text class='themeC'>￥{{item.choppingCashBackStr}}</text>元</view>
		
		      <view class='mt20' v-if="item.isCashBackStatus==1&&item.isEnd">已砍待返现
		        <text class='themeC'>￥{{item.choppingCashBackStr}}</text>元</view>
		
		      <view class='mt20' v-if="item.isCashBackStatus==1&&!item.isEnd&&item.currState!=4&&!item.countDown">已砍待返现
		        <text class='themeC'>￥{{item.choppingCashBackStr}}</text>元</view>
		
		      <view class='mt20' v-if="item.isCashBackStatus==1&&!item.isEnd&&item.currState!=4&&item.countDown">已砍待返现
		        <text class='themeC'>￥{{item.choppingCashBackStr}}</text>元(砍价剩余时间
		        <text class='themeC'>{{item.countDown}}</text>)</view>
		      <!-- <view class='mt20 c_grey3' v-if="{{item.expressInfo.expressSn}}">物流单号：{{item.expressInfo.expressSn}}</view> -->
		    </view>
		    <!-- 操作按钮 -->
		    <view class='operate_bar'>
		      <view class='countdown themeC flex1 mt40' v-if="item.currState==1">{{item.countDown?'剩余'+item.countDown:''}}</view>
		
		      <view class='flex1' v-if="item.currState!=1&&item.currState!=4"></view>
		      <view class='flex_c mt40' v-if="item.currState==4">
		        <!-- 喜欢 -->
		        <view v-if="item.weixinUserId==gld.userId" :class="['btn_default', item.isEvaluate==1?'':'btn_white']" @click.stop="addOrderEvaluate(index)">{{item.isEvaluate==1?'已喜欢':'喜欢'}}</view>
		        <!-- <view class='operate_btn' v-if="{{item.weixinUserId==userId}}" @click.stop='addOrderEvaluate' data-index="{{index}}">
		          <image class="img32 mr10 {{item.isEvaluate==1&&item.isOrderEvaluate?'evaluate_like':''}}" src="{{item.isEvaluate==1?'/image/like_red.png':'/image/like_black.png'}}"></image>
		          <text>{{item.isEvaluate==1?'已喜欢':'喜欢'}}</text>
		        </view> -->
		        <!-- 推荐 -->
		        <view class='mr20' v-if="gld.organizationId&&item.weixinUserId==gld.userId"></view>
		        <!-- <view class='operate_line' v-if="{{organizationId&&item.weixinUserId==userId}}"></view> -->
		        <!-- <view class='operate_btn' v-if="{{organizationId}}" @click.stop='recommendModalStatus' data-index="{{index}}">
		          <image class="img32 mr10" src="{{item.isEvaluation==1?'/image/order/recommend.png':'/image/order/isrecommend.png'}}"></image>
		          <text>{{item.isEvaluation==1?'已推荐':'推荐'}}</text>
		        </view> -->
		        <view v-if="gld.organizationId" :class="['btn_default', item.isEvaluation==1?'':'btn_white']" @click.stop="recommendModalStatus(index)">{{item.isEvaluation==1?'已推荐':'推荐'}}</view>
		      </view>
		
		      <view v-if="item.showActivity" class='btn_default mr20 mt40' @click.stop='cutDownSingle(index, item.orderId)'>砍单返现</view>
		
		      <view  class='btn_default btn_white mr20 mt40' @click.stop='cancelOrder(index)'>取消订单</view>
		
		      <view  class='btn_default btn_main_theme mt40' @click.stop='immediatePayment(index)'>立即支付</view>
		
		      <!-- thirdPartyLogistics 唯品仓的物流信息 ，查看物流带自定义参数expresstype -->
		      <view v-if="item.currState>=3&&item.expressInfo.expressSn&&!item.thirdPartyLogistics.logisticsInfo" class='btn_default btn_white mt40' @click.stop='checkLogistics(index, 1)'>查看物流</view>
		      <view v-if="item.currState>=3&&item.expressInfo.expressSn&&item.thirdPartyLogistics.logisticsInfo" class='btn_default btn_white mt40' @click.stop='checkLogistics(index, 2)'>查看物流</view>
		      <view v-if="item.currState==3&&item.weixinUserId==gld.userId" class='btn_default ml15 mt40' @click.stop='showDeliverDialog(index)'>确认收货</view>
		    </view>
		  </view>
		  <button class='loadmore' v-if="hasMoreData&&orderList.length>0" loading='true'>
		    正在努力加载更多~
		  </button>
		  <view class='loadmore' v-if="!hasMoreData&&orderList.length>0">
		    已经全部加载完毕~
		  </view>
		</view>
		<!-- 列表 E -->
		
		<!-- 弹框 S -->
		<view :class="isDeliverDialog ? 'js_dialog' : ''">
		  <view class="dialog_mask" />
		  <view class="dialog_container" @click.stop='hideDeliverDialog'>
		    <view class="dialog_content" @click.stop='emptyEvent'>
		      <view class="dialog_title">确认收货</view>
		      <view class='fz14 c_grey2 lh36'>亲，请确认商品无质量问题再确认收货，如确认收货则代表本订单无售后需要处理哦~</view>
		      <view class='dialog_footer'>
		        <button class='dialog_btn bg_theme' @click='confirmGoods'>确认收货</button>
		      </view>
		    </view>
		  </view>
		</view>
		<!-- 弹框 E -->
		<!-- 评价 S -->
		<view :class="showEvaluateModal ? 'js_dialog' : '' ">
		  <view class="dialog_mask" />
		  <view class="dialog_container" @click.stop="setEvaluateModalStatus(0)">
		    <view class="evaluate_box" @click.stop='emptyEvent'>
		      <view class="close_icon" @click="setEvaluateModalStatus(0)">
		        <image class='img16 ml10' src="../../static/image/default/close_red.png"></image>
		      </view>
		      <view class='evaluate_info' v-if="orderItem.orderId">
		        <view>
		          <image class='evaluate_img' :src="orderItem.brandImage | getImgUrlBySize('s')"></image>
		        </view>
		        <view class='flex1'>
		          <view class='fz14 b mb10'>喜欢这个品牌的商品吗？</view>
		          <view class='fz13 c_grey2'>喜欢就点个小心心呗~！</view>
		        </view>
		        <button class='evaluate_btn bg_theme bd_themeC' @click.stop='addOrderEvaluate(orderItemIndex, 1)'>
		          <image :class="['img32', 'mr15', orderItem.isEvaluate==1?'evaluate_like':'']" :src="orderItem.isEvaluate==1?'../../static/image/default/like_white_bg.png':'../../static/image/default/like_white.png'"></image>
		          <text>喜欢</text>
		        </button>
		      </view>
		    </view>
		  </view>
		</view>
		<!-- 评价 E -->
		<!-- 推荐 S -->
		<view :class="showRecommendModal ? 'js_dialog' : ''">
		  <view class="dialog_mask" />
		  <view class="dialog_container">
		    <view class="drawer_modal" @click.stop='emptyEvent'>
		      <image class='drawer_close' src="../../static/image/default/icon_pop_close.png" @click.stop="recommendModalStatus(0)"></image>
		      <view class='drawer_title'>推荐</view>
		      <view class="recommend_title">
		        <view class='mr30'>
		          <image class='recommend_title_img' :src="orderItem.brandImage|getImgUrlBySize('s')" mode='aspectFill'></image>
		        </view>
		        <view class='flex1'>
		          <view class="recommend_text_nowrap">{{orderItem.brand}}</view>
		          <view class='fz13 c_grey3'>喜欢这个品牌的商品吗？</view>
		        </view>
		      </view>
		      <scroll-view scroll-y class="recommend_container">
		        <view class="recommend_tag">
		          <view class="recommend_tag_title c_grey3">请选择推荐标签</view>
		          <view class="recommend_tag_content">
		            <block v-for="(item, index) in groupTagList" :key="index">
		              <view :class="['btn_default', index!=0?'ml20':'', item.isSelected?'btn_red':'btn_grey']" @click.stop="selectedTag">{{item.tagName}}</view>
		            </block>
		          </view>
		        </view>
		      </scroll-view>
		      <view class='drawer_ft'>
		        <view class='drawer_btn bg_theme cf' @click.stop="submitRecommend" data-status="0">提交推荐</view>
		      </view>
		    </view>
		  </view>
		</view>
		<!-- 推荐 E -->
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	import RSAUtils from '../../utils/ras';
	import {getOriginalImg} from '../../utils/imageTool';
	import {setRefundItem, getBrandName} from '../../utils/goodsTools';
	export default {
		computed:{
			...mapState(['gld', 'server', 'config'])
		},
		data() {
			return {
				isLoading: true,
				hasMoreData: false,
				isLoad: false,
				showToastTxt: '',
				toastHidden: false,
				txt: '暂无数据~',
				keyWord: '',
				orderState: [{
					state: 0,
					stateDes: "全部",
					isSelected: true
				}, {
					state: 1,
					stateDes: "待付款",
					isSelected: false
				}, {
					state: 6,
					stateDes: "待发货",
					isSelected: false
				}, {
					state: 7,
					stateDes: "待收货",
					isSelected: false
				},{
					state: 3,
					stateDes: "已完成",
					isSelected: false
				}, {
					state: 4,
					stateDes: "已关闭",
					isSelected: false
				}],
				orderList: [],
				//选中的状态索引
				currIndex: 0,
				// 分页长度
				length: 10,
				placeholder: '商品名称/订单号',
				//显示评价
				orderItem: {},
				showEvaluateModal: false,
				groupTagList: [],
				//好物圈信息
				isOpenGoodCircle: 0,
				product: {},
				isDeliverDialog: false,
			}
		},
		onLoad(options) {
			this.util.getUserInfo(userInfo=>{
				if (this.gld.organizationId) {
					this.placeholder = '商品名称/下单人/订单号';
				}
				if (options.index > 0) {
					this.setCurrIndex(options.index);
				} else {
					this.getOrderList(true);
				}
			})
		},
		// 页面下拉刷新
		onPullDownRefresh() {
			this.getOrderList(true);
		},
		// 页面上拉触底
		onReachBottom() {
			if (this.hasMoreData) {
				if (!this.isLoad) {
					this.isLoad = true;
					this.getOrderList();
				}
			}
		},
		// 右上角分享
		onShareAppMessage() {

		},
		// 页面滚动事件
		onPageScroll() {

		},
		methods: {
			 // 点击状态索引
			itemDidClick(index) {
				if (index == this.currIndex) {
					return;
				}
				this.setCurrIndex(index);
			},
			setCurrIndex(index) {
				this.$set(this.orderState[index], 'isSelected', true);
				this.$set(this.orderState[this.currIndex], 'isSelected', false);
				this.currIndex = index;
				this.getOrderList(true);
			},
			// 获取订单列表
			getOrderList(onPullDown) {
				let param = {
					orderCurrState: this.orderState[this.currIndex].state,
					sortField: 0,
					length: this.length,
					keyWord: this.keyWord
				};
				param.startIndex = onPullDown ? 0 : this.orderList.length;
				if (onPullDown) {
					this.isLoading = true;
				};
				this.util.sendPostWX(this.config.getOrderListByState, param, (res)=>{
					uni.stopPullDownRefresh();
					let orderList = res.resultData.orderList;
					if (orderList.length < this.length) {
						this.hasMoreData = false;
					} else {
						this.hasMoreData = true;
					};
					for (let i = 0; i < orderList.length; i++) {
						let item = this.setOrderItem(orderList[i]);
					};
					// console.log('入账金额', intoAccountAmount)
					if (onPullDown) {
						this.orderList = orderList;
					} else {
						this.orderList = this.orderList.concat(orderList);
					}
					this.orderList.forEach(item => {
						if(item.brandName) {
							item.brand = getBrandName(item.brandName);
						}
					})
					console.log('this.orderList', this.orderList);
					this.isLoading = false;
					this.isLoad = false;
					//倒计时
					// this.singleCountdown();
				}, function() { //失败
					wx.stopPullDownRefresh();
				});
			},
			setOrderItem(item) {
				item = item || {};
				let nowTimeStamp = new Date().getTime();
				// 剩余支付时间
				let paymentTime = nowTimeStamp - item.addTime;
				item.paymentTime = paymentTime;
				// let orderGoods = item.orderGoodsList[0] || {};
				item.stateDes = "";
				//支付状态
				if (item.receiveState == 1) {
					item.payState = "待支付";
				} else if (item.receiveState == 2) { //支付中
					item.payState = "实付款";
				} else if (item.receiveState == 3) {
					item.payState = "实付款：";
					if (item.activity == 3 && item.weixinUserId == this.gld.userId && item.choppingCashBackEnable == 1 && item.orderState != 9) {
						item.showActivity = true;
					}
				} else if (item.receiveState == 5) { //京东订单
					item.payState = "退款：";
				}
		
				//订单状态 orderState 1到7表示表示待审核，8表示已完成，9表示审核不通过（交易关闭）
				if (item.orderState < 8) {
					//待审核
					if (item.receiveState == 1) {
						item.stateDes = "待付款";
						item.currState = 1;
					} else if (item.receiveState == 3 || item.receiveState == 4) {
						item.stateDes = "正在抢购下单";
						if (item.sourceType == 6 || item.isDelayedOrder == 1) {//海外购的订单待审核状态-显示为默认审核通过
							item.stateDes = "待发货";
						}
						item.currState = 2;
					} else if (item.receiveState == 2) {
						item.stateDes = "正在抢购下单";
					} else {
						item.stateDes = "其他";
					};
				} else if (item.orderState == 8) {
					//审核通过已付款
					if (item.deliverState == 1 || item.deliverState == 2) {
						item.stateDes = "待发货";
						item.currState = 2;
						if (item.receiveState == 6) { //审核通过且没发货
							item.stateDes = "需补款";
							item.currState = 6;
						}
					} else if (item.deliverState == 3) {
						item.stateDes = "待收货";
						item.currState = 3;
					} else if (item.deliverState == 4) {
						item.stateDes = "已完成";
						item.currState = 4;
					} else {
						item.stateDes = "其他";
					};
				} else {
					//审核不通过
					if (item.receiveState == 1) { //未付款取消
						item.stateDes = "已取消";
						item.currState = 5;
					} else if (item.receiveState == 5) { //京东订单
						item.stateDes = "交易关闭";
						item.currState = 5;
					} else if (item.receiveState == 3 || item.receiveState == 4) { //已付款
						if (!item.sourceName) { //没有下单设备证明没有在平台下单
							item.stateDes = "抢购失败, 已退款";
							item.currState = 5;
						} else {
							item.stateDes = "交易关闭";
							item.currState = 5;
						};
					} else {
						item.stateDes = "交易关闭";
						item.currState = 5;
					};
				};
				// currState 1.订单发起，2.进行中，3.发完货，4.已完成，5.交易关闭，6.要补钱;
				item.choppingCashBackStr = this.util.formatAmount(item.choppingCashBackAmount) || 0;
				if (item.orderState != 9) {
					if (!item.choppingCashBackStatus && item.receiveState == 3 && item.activity == 3 && item.choppingCashBackAmount > 0 && item.currState != 4 && item.choppingCashBackEnable == 1) { //待砍单返现
						item.isCashBackStatus = 1
					} else if (!item.choppingCashBackStatus && item.receiveState == 3 && item.activity == 3 && item.currState == 4 && item.choppingCashBackEnable == 1) { //砍单返现成功(客户已经确认收货，但是还没到账)
						item.isCashBackStatus = 5
					} else if (item.choppingCashBackStatus == 1 && item.receiveState == 3 && item.activity == 3 && item.choppingCashBackAmount > 0 && item.choppingCashBackEnable == 1) { //砍单返现成功(微信零钱已到账)
						item.isCashBackStatus = 2
					} else if (item.choppingCashBackStatus == 2 && item.receiveState == 3 && item.activity == 3 && item.choppingCashBackAmount > 0 && item.choppingCashBackEnable == 1) { //砍单返现失败(退款失败)
						item.isCashBackStatus = 3
					}
				} else { //砍单返现失败（审核不通过）
					item.isCashBackStatus = 4
				}
				// item.orderGoods = orderGoods;
				// item.goodsName = orderGoods.goodsName
				// item.specOne = orderGoods.specOne;
				// item.specTwo = orderGoods.specTwo;
				item.addTimeStr = this.util.formatTime(item.addTime, 'Y-M-D h:m');
				item.expressList = item.expressList || [];
				item.expressInfo = item.expressList[0] || {};
				item.thirdPartyLogistics = item.thirdPartyLogistics || {};
				if (item.specOne && item.specTwo) {
					item.specName = item.specOne + ' | ' + item.specTwo;
				} else if (!item.specOne && item.specTwo) {
					item.specName = item.specTwo;
		
				} else if (item.specOne && !item.specTwo) {
					item.specName = item.specOne;
				}
				// item.currPrice = this.util.formatAmount(item.orderGoods.price);
				item.totalAmout = item.realAmount.toFixed(2);
				item.orderRefundAmount = this.util.formatAmount(item.orderRefundAmount);
				item.makePrice = this.util.formatAmount(item.realAmount - item.paidAmount);
				// item.specOne = orderGoods.specOne;
				// item.specTwo = orderGoods.specTwo;
				item.orderSnDesc = '(' + '订单号：' + item.orderSn + ')';
				let orderGoodsList = item.orderGoodsList;
				for (let i = 0; i < orderGoodsList.length; i++) {
					let goodsItem = orderGoodsList[i];
					// goodsItem.goodsPrice = this.util.formatAmount(goodsItem.price);
					goodsItem.goodsPrice = goodsItem.price.toFixed(2);
					if (goodsItem.specOne && goodsItem.specTwo) {
						goodsItem.specName = goodsItem.specOne + ' | ' + goodsItem.specTwo;
					} else if (!goodsItem.specOne && goodsItem.specTwo) {
						goodsItem.specName = goodsItem.specTwo;
		
					} else if (goodsItem.specOne && !goodsItem.specTwo) {
						goodsItem.specName = goodsItem.specOne;
					}
					// 只有云货优选且开启好物圈才接入好物圈
					if (this.gld.groupId == 2 && this.isOpenGoodCircle == 1 && item.currState == 4) {
						// this.setProduct(goodsItem,item);
					}
					goodsItem.currPrice = this.util.formatAmount(goodsItem.price);
					setRefundItem(goodsItem)
				};
				//评价动画效果
				item.isOrderEvaluate = 0;
				return item;
			},
		}
	}
</script>

<style>
	page{
	  background: #f7f7f7;
	}
	/* 分类索引S */
	.orderTopBar{
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  z-index: 100;
	  background: #fff;
	}
	.searchBar{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  padding: 30rpx 30rpx 0;
	  position: relative;
	}
	.search_img{
	  width: 28rpx;
	  height: 28rpx;
	  position: absolute;
	  left: 60rpx;
	  top: 51rpx;
	  z-index: 2;
	}
	.search_input{
	  width: 510rpx;
	  height: 70rpx;
	  line-height: 70rpx;
	  background: #F7F7F7;
	  border-radius: 70rpx;
	  padding-left: 80rpx;
	  font-size: 28rpx;
	}
	.search_btn{
	  width: 80rpx;
	  height: 70rpx;
	  text-align: center;
	  line-height: 70rpx;
	  font-size: 28rpx;
	}
	
	.stateBar {
	  height: 72rpx;
	  line-height: 72rpx;
	  margin-top: 10rpx;
	  /* border-bottom: 1rpx solid #e6e6e6; */
	}
	
	.stateItem {
	  position: relative;
	  display: inline-block;
	  min-width: 66rpx;
	  padding: 0 22rpx;
	  font-size: 28rpx;
	  text-align: center;
	}
	
	.bottomLine {
	  position: absolute;
	  left: 0;
	  bottom: 0;
		right: 0;
	}
	.bottomLine_item {
		margin: 0 auto;
		width: 52rpx;
		height: 4rpx;
		border-radius: 2rpx;
		z-index: 1;
	}
	/* 分类索引E */
	
	/* 列表 S */
	.listBox {
	  width: 100%;
	  margin-top: 201rpx;
	}
	
	.list_itemBox{
	  background: #fff;
	  padding: 40rpx 30rpx;
	  margin: 0rpx 30rpx 20rpx 30rpx;
		border-radius:16rpx;
	}
	
	.list_itemBox .item_top{
	  display: flex;
	  align-items: center;
	  margin-bottom: 30rpx;
	}
	.list_itemBox .user_icon{
	  width: 60rpx;
	  height: 60rpx;
	  border-radius: 50%;
	  margin-right: 20rpx;
	}
	.max14em{
	  max-width: 14em;
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
	.goods_num{
	  flex: 1;
	  text-align: right;
	  font-size: 24rpx;
	}
	
	.item_bottom{
	  text-align: right;
	  font-size: 26rpx;
	  padding-top: 28rpx;
	}
	
	.operate_bar{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  font-size: 26rpx;
	}
	
	.operate_btn{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 80rpx;
	  text-align: center;
	  background-color:#fff;
	  font-size:24rpx;
	}
	.operate_line{
	  width: 1rpx;
	  height: 30rpx;
	  background: #e6e6e6;
	  margin: 0 30rpx;
	}
	/* 列表 E */
	
	/* 评价弹窗 S */
	.evaluate_box {
	  width: 100%;
	  height: auto;
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  z-index: 500;
	  background: transparent;
	}
	.evaluate_box .close_icon {
	  position: absolute;
	  width: 80rpx;
	  height: 80rpx;
	  line-height: 40rpx;
	  left: 30rpx;
	  top: 0rpx;
	  z-index: 10;
	}
	.evaluate_info{
	  display: flex;
	  align-items: center;
	  width: 630rpx;
	  margin: 0 auto 60rpx;
	  height: 90rpx;
	  background:rgba(255,214,214,0.8);
	  border-radius: 16rpx;
	  padding: 30rpx;
	}
	.evaluate_img{
	  width: 80rpx;
	  height: 80rpx;
	  border-radius:4rpx;
	  margin-right: 10rpx;
	}
	.evaluate_btn{
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  width:128rpx;
	  height:48rpx;
	  border-width: 1rpx;
	  border-style: solid;
	  border-radius:24rpx;
	  font-size: 24rpx;
	  color: #fff;
	  line-height: 48rpx;
	}
	.evaluate_like{
	  animation: evaluateLike 0.6s ease;
	  -moz-animation: evaluateLike 0.6s ease;/* Firefox */
	  -webkit-animation: evaluateLike 0.6s ease;/* Safari 和 Chrome */
	  -o-animation: evaluateLike 0.6s ease;/* Opera */
	}
	@keyframes evaluateLike {
	  /* 0% {
	    width: 48rpx;
	    height: 48rpx;
	  }
	  50% {
	    width: 16rpx;
	    height: 16rpx;
	  }
	  100% {
	    width: 32rpx;
	    height:32rpx;
	  } */
	  0% {
	    -webkit-transform:scale(0.25);
	    transform:scale(0.25);
	  }
	  100% {
	    -webkit-transform:scale(1);
	    transform:scale(1);
	  }
	
	}
	/* 评价弹窗 E */
	/* 推荐弹框 S */
	.recommend_title{
	  display: flex;
	  align-items: center;
	  padding: 30rpx 0;
	  margin: 0 30rpx;
	  border-bottom: 1rpx solid #e6e6e6;
	}
	.recommend_text_nowrap {
	  width: 19em;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  margin-bottom: 14rpx;
	}
	.recommend_title_img{
	  display: block;
	  width: 108rpx;
	  height: 108rpx;
	  border-radius: 50%;
	}
	.recommend_container{
	  height: calc(100% - 428rpx);
	}
	.recommend_tag{
	  padding: 30rpx 30rpx 0 30rpx;
	}
	.recommend_tag_title{
	  font-size: 26rpx;
	  margin-bottom: 20rpx;
	}
	.recommend_tag_content{
	  display: flex;
	  flex-wrap: wrap;
	}
	/* 推荐弹框 E */

</style>
