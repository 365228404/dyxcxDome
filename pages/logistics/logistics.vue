<template><!-- 小B 查看物流 -->
	<view>
		<loading v-if="isLoading"></loading>
		
		<view>
			<view class="bgf stateBar flexbox">
				<block v-for="(item, index) in logisticsData" :key="index">
					<view :class="['rel', 'tc','flex1', item.isSelected?'c_grey1':'c_grey3']" @click='itemDidClick(index)'>{{item.stateDes}}
						<view class='bottomLine' v-if='item.isSelected'>
							<view class='bottomLine_item bg_FFD662'></view>
						</view>
					</view>
				</block>
			</view>
			<view class="pd2030">
				<view class="pd30 bgf bdr16 flex_sc">
					<view class="c_333 fz13">
						<view class="flex mb10">
							<view>物流公司：</view>
							<view>韵达快递</view>
						</view>
						<view class="flex">
							<view>物流单号：</view>
							<view>HG7835703534</view>
						</view>
					</view>
					<view>
						<view class="copy c_666">复制</view>
					</view>
				</view>
				
				<view class="mt20 pd30 bgf bdr16 c_FD7D6F fz12">
					<view v-for="(item, index) in signRecord" :key='index'>
						<view>{{item.state}}</view>
						<view class="mt10">{{item.signPeople}}</view>
						<view class="mt10 c_grey3">{{item.signTime}}</view>
						<view class="mt30 mb30 h1 bg_DEDEDE"></view>
					</view>
				</view>
			</view>
		</view>
		
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		computed:{
			...mapState(['gld', 'server', 'config'])
		},
		data() {
			return {
				isLoading: false,
				toastHidden: false,
				showToastTxt: '',
				logisticsData: [{
					stateDes: "包裹一",
					isSelected: true
				}, {
					stateDes: "包裹二",
					isSelected: false
				}, {
					stateDes: "包裹三",
					isSelected: false
				},{
					stateDes: "包裹四",
					isSelected: false
				}],
				signRecord: [
					{
						state: '快件已签收',
						signPeople: '签收人: 售后 感谢使用圆通速递，期待再次为您服务',
						signTime: '2019-08-01 08:00'
					},
					{
						state: '快件已签收',
						signPeople: '签收人: 售后 感谢使用圆通速递，期待再次为您服务',
						signTime: '2019-08-01 08:00'
					},
					{
						state: '快件已签收',
						signPeople: '签收人: 售后 感谢使用圆通速递，期待再次为您服务',
						signTime: '2019-08-01 08:00'
					},
					{
						state: '快件已签收',
						signPeople: '签收人: 售后 感谢使用圆通速递，期待再次为您服务',
						signTime: '2019-08-01 08:00'
					},
				]
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
	.stateBar {
	  height: 88rpx;
	  line-height: 88rpx;
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
	.copy {
		padding: 8rpx 20rpx;
		border-radius:4rpx;
		border:1rpx solid rgba(152,152,152,1);
		font-size: 22rpx;
	}
</style>
