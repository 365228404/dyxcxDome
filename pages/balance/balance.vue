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
					<view class="fz30 c_333 b500 mr10">￥</view>
					<view class='flex1 mr10'>
						<input type="text" :value="money" @input="getMoney" :placeholder="placeName" placeholder-class="placeholder" :class="['h60','c_333','b500',money?'fz30':'']"></input>
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
			<view class="btn_main btn_darkgrey mt40 fz14" @click="showDialogPassword" >确认提现</view>
		</view>
		
		<!-- 提现密码 S -->
		<view :class="[showCenterDialog ? 'js_dialog' : '']">
		  <view class="dialog_mask" />
		  <view class="dialog_container">
		    <view class="dialog_content_blance bdr16 bgf fz14 c_333" @click.stop='emptyEvent'>
		      <image class='dialog_close_blance pd30' src="../../static/image/order/icon_close_black.png" @click.stop="hiddenDialogPassword"></image>
		      <view class="b500">请输入提现密码</view>
					<view class="bg_DEDEDE h1 mt30"></view>
					<view class="tc mt20">提现</view>
					<view class="fz30 c_FD7D6F b500 tc mt30">¥2000.00</view>
					<view class="tc mt30">扣除 ¥4.00 手续费</view>
					<view class="pwd_style_blance flex mt30">
						<input class="pwd_input_blance"  type='number' password maxlength="6" :focus="pwdFocus" :value="passWord" @input="onChangeInput"/>
					  <block v-for="(item, index) in [0,1,2,3,4,5]" :key="index">
					    <view class="pwd_block_blance flex_c flex1">
					      <view v-if="passWord[item]" class="pwd_dot_blance"></view>
					    </view>
					  </block>
					</view>
					<view class="tc mt30">忘记密码？</view>
		     <!-- <view class='fz14'>
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
		      </view> -->
		    </view>
		  </view>
		</view>
		<!-- 提现密码 E -->
		
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
				this.passWord = e.detail.value + '';
			},
			showDialogPassword() {
				this.showCenterDialog = true;
				this.passWord = '';
				setTimeout(()=>{
					this.pwdFocus = true;
				},300)
			},
			hiddenDialogPassword() {
				this.passWord = '';
				this.showCenterDialog = false;
				this.pwdFocus = false;
			}
		}
	}
</script>

<style lang="scss">
	.h60 {
		height: 60rpx;
	}
	.placeholder {
		color: #989898;
		font-size: 26rpx;
	}
	.withdrawal_num{
	  font-size: 40rpx;
	  line-height: 30rpx;
	  margin-top: 20rpx;
	  margin-bottom: 30rpx;
	}
	.dialog_content_blance {
		width: 510rpx;
		box-sizing: border-box;
		padding: 38rpx 30rpx 30rpx;
		position: relative;
		.dialog_close_blance {
			position: absolute;
			right: 0rpx;
			top: 12rpx;
			z-index: 1;
			width: 20rpx;
			height: 20rpx;
		}
		.pwd_style_blance {
			position: relative;
			border-right: 1rpx solid #DEDEDE;
			.pwd_block_blance {
				border: 1rpx solid #DEDEDE;
				border-right: none;
				height: 76rpx;
				.pwd_dot_blance {
					width: 20rpx;
					height: 20rpx;
					background: black;
					border-radius: 10rpx;
				}
			}
			.pwd_input_blance {
				position: absolute;
				height: 100%;
				width: 100%;
				top: 0;
				left: 750rpx;
				z-index: 1;
				color: transparent;
				opacity: 0;
			}
		}
	}
</style>
