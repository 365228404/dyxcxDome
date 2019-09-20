<template><!-- 余额提现 -->
	<view>
		<loading v-if="isLoading"></loading>
		
		<view class="pd2030">
			<view>
				<view class="pd_box bgf bdr16 flex_sc">
					<view class="c_333 fz14 b500">+去绑定支付宝账号</view>
					<view>
						<image class="img20" src="../../static/image/order/icon_arrow_right_grey.png"></image>
					</view>
				</view>
				<view class="pd_box bgf bdr16 flex_sc mt10">
					<view>
						<view class="c_333 fz14 b500">支付宝账号</view>
						<view class="mt10 fz14 c_grey3">15814979387</view>
					</view>
					<view class="flexbox">
						<view class="c_333 fz13 mr10">提现账号</view>
						<image class="img20" src="../../static/image/order/icon_arrow_right_grey.png"></image>
					</view>
				</view>
			</view>
			<view class="pd2030 bgf bdr16 mt20">
				<view class="c_333 fz14">提现金额</view>
				<view class="pt40 pb40 flexbox">
					<view class="fz36 c_333 b500 mr10">￥</view>
					<view class='flex1 mr10'>
						<input type="text" :value="money" @input="getMoney" :placeholder="placeName" placeholder-class="placeholder" :class="['h72','c_333','b500',money?'fz36':'']"></input>
					</view>
					<view class="c_333 fz13">全部</view>
				</view>
				<view class="h1 bg_DEDEDE"></view>
				<view class="mt20 mb20 flex_sc">
					<view class="c_333 fz12">可提现金额 998.88元</view>
					<view>
						<image class="img28" src="../../static/image/order/icon_instructions_gray.png"></image>
					</view>
				</view>
			</view>
			
			<view class="btn_main btn_main_theme mt40 fz14">确认提现</view>
			<view class="btn_main btn_darkgrey mt40 fz14" @click="showCenterDialog=!showCenterDialog, pwdFocus=true">确认提现</view>
		</view>
		
		<!-- 提现密码 S -->
		<view :class="[showCenterDialog ? 'js_dialog' : '']">
		  <view class="dialog_mask" />
		  <view class="dialog_container">
		    <view class="dialog_content" catchtap='emptyEvent'>
		      <image class='dialog_close' src="../../static/image/order/icon_close_black.png" @click="showCenterDialog=!showCenterDialog"></image>
		      <view class="dialog_title">请输入提现密码</view>
		      <view class='fz14'>
		        <view class="pwd_style_box">
		          <input class="pwd_input"  type='number' password maxlength="6" :focus="pwdFocus" :value="passWord" @input="onChangeInput"/>
		          <view class="pwd_style">
		            <block v-for="(item, index) in [0,1,2,3,4,5]" :key="index">
		              <view class="pwd_block flex_c">
		                <view v-if="passWordArr[item]" class="pwd_dot"></view>
		              </view>
		            </block>
		          </view>
		        </view>
		        <view class='c_link mt40' bindtap='forgetPwd'>忘记密码</view>
		      </view>
		    </view>
		  </view>
		</view>
		<!-- 提现密码 E -->
		
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
				money: '',
				placeName: '输入提现金额',
				showCenterDialog: false,
				passWord: '',
				passWordArr: [],
				pwdFocus: false,
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
			getMoney(e) {
				this.money = e.detail.value;
				setTimeout(()=>{
					if (!this.money) {
						this.placeName = '输入提现金额';
					} else {
						this.placeName = '';
					}
				},0)
			},
			emptyEvent(){},
			onChangeInput(e) {
			    let that = this;
			    if (e.detail.value.length > 6) {
			      return;
			    }
					let passWordArr = this.passWordArr;
			    if (e.detail.value.length > that.passWord.length) {
			      passWordArr.push(true);
			    } else if (e.detail.value.length < that.passWord.length) {
			      passWordArr.pop();
			    }
					this.passWord = e.detail.value;
					this.passWordArr = passWordArr;
			    // if (e.detail.value.length == 6) {
			    //   setTimeout(function () {
			    //     that.hideCenterDialog();
			    //     that.yhtPlusWithdrawGoBankAccount(e.detail.value);
			    //   }, 100);
			    // }
			  },
		}
	}
</script>

<style>
	.h72 {
		height: 72rpx;
	}
	.placeholder {
		color: #989898;
		font-size: 26rpx;
	}
	.pwd_style_box{
	  width:100%;
	  position: relative;
	}
	.pwd_style {
	  height: 88rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  border: 1rpx solid #ccc;
	  border-right: 0;
	  margin-top: 40rpx;
	}
	.pwd_input {
	  border: 0;
	  color: transparent;
	  font-size: 24rpx;
	  width: 100%;
	  height: 88rpx;
	  line-height: 88rpx;
	  opacity: 0;
	  overflow: hidden;
	  position: absolute;
	  left: 750rpx;
	  top: 0;
	  z-index: 1;
	  text-align: left;
	}
	.pwd_block {
	  flex: 1;
	  height: 100%;
	  background: #f5f5f5;
	  border-right: 1rpx solid #ccc;
	  overflow: hidden;
	}
	.pwd_dot {
	  width: 20rpx;
	  height: 20rpx;
	  background: black;
	  border-radius: 10rpx;
	}
	
	.withdrawal_num{
	  font-size: 40rpx;
	  line-height: 30rpx;
	  margin-top: 20rpx;
	  margin-bottom: 30rpx;
	}
</style>
