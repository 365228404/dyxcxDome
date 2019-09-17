<template>
	<!-- 小B店主注册页面 -->
	<view>
		<auth @authSuccess="authSuccess" v-if="!gld.isAuth"></auth>
		<loading v-if="isLoading"></loading>
		<view class='big_box'>
			<!-- 头部 S -->
			<view class='header'>
				<image mode='widthFix' class='maxBox' :src="'file/group_2/weixinBackground_2/1552359409054_169843.jpg' | getImgUrlBySize('', 1)"></image>
			</view>
			<!-- 头部 E -->
			<!-- 信息表 S -->
			<view class='info_box'>
				<view>
					<view class='info_line'></view>
					<view class='title'>手机号</view>
				</view>
				<view class='mt10'>
					<input class='input_info' type="number" maxlength="11" @input="bindMobile" :value="mobile" placeholder='请填写你的手机号码' placeholder-class="wg_placeholder"></input>
				</view>
			</view>
			<view class='info_box ovh'>
				<view>
					<view class='info_line'></view>
					<view class='title'>图形验证码</view>
				</view>
				<view class='mt10'>
					<input class='input_code dib' type="number" maxlength="8" @input="bindImgCode" :value="numberCode" placeholder='请填写图形验证码'
					 placeholder-class="wg_placeholder"></input>
					<image class='verification_code dib ml20' v-if="imgCodeShow" @click='getValidateCode' src="http://nas.eamon.top:18080/captcha/captchaImage?type=char"></image>
				</view>
			</view>
			<view class='info_box ovh'>
				<view>
					<view class='info_line'></view>
					<view class='title'>手机短信验证码</view>
				</view>
				<view class='mt10'>
					<input class='input_code bg_grey5 dib' type="number" maxlength="8" @input="bindCode" :value="verificationCode" placeholder='请填写短信验证码'
					 placeholder-class="wg_placeholder"></input>
					<view class='verification_code dib ml20' @click='getVerificationCode'>
						{{codeStatus}}
					</view>
				</view>
			</view>
			<view class='info_box'>
				<view>
					<view class='info_line'></view>
					<view class='title'>邀请码</view>
				</view>
				<view class='mt10'>
					<input class='input_info' type="number" maxlength="8" @input="bindInvitationCode" :value="invitationCode" placeholder='请填写邀请码'
					 placeholder-class="wg_placeholder"></input>
				</view>
			</view>
			<!-- 信息表 E -->
			<form reportSubmit='true' @submit="keepTap">
				<button class='submit_btn' formType="submit">立即申请</button>
			</form>
		</view>
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	export default {
		computed: {
			...mapState(['gld', 'config'])
		},
		data() {
			return {
				toastHidden: false,
				showToastTxt: '',
				// 姓名
				consignee: '',
				// 号码
				mobile: '',
				// 图形验证码
				numberCode: '',
				// 短信验证码
				verificationCode: '',
				// 邀请码
				invitationCode: '',
				codeStatus: "获取验证码",
				countDown: 60,
				// 图形验证码对象
				imgCodeShow: true,
				isLoading: false,
				isJoin: false,
				channel: '斗米兼职',
				timeStamp: new Date().getTime()
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
		methods: {
			...mapMutations({
				changeGld: 'changeGld'
			}),
			authSuccess() {
				this.getData(this.options);
			},
			getData() {
				// this.getValidateCode();
			},
			// 获取图形验证码
			getValidateCode() {
				this.imgCodeShow = false;
				setTimeout(()=>{
					this.imgCodeShow = true;
				},0)
				// this.util.sendPostShowTost({
				// 	url: this.config.captchaCaptchaImage,
				// 	data: {
				// 		type:'char',
				// 		s : Math.random()
				// 	},
				// 	successFn(res) {
				// 		console.log('图形验证码', res);
				// 	}
				// })
			},
			// 获取验证码
			getVerificationCode() {
				let that = this;
				setTimeout(function() {
					if (that.countDown < 60) {
						return;
					}
					if (!that.mobile) {
						that.util.showToast(that, "手机号码不能为空")
						return;
					} else if (!/^1\d{10}$/.test(that.mobile)) {
						that.util.showToast(that, "手机号码格式不正确")
						return;
					}
					if (!that.numberCode) {
						that.util.showToast(that, "请输入图形验证码")
						return;
					}
					that.util.sendPostShowTost({
						url: that.config.ClientLoginSend,
						method: 'POST',
						data: JSON.stringify({
							phone: that.mobile,
							code: that.numberCode
						}),
						successFn(res) {
							that.util.showToast(that, "验证码已发送");
							setTimeout(function() {
								that.countdown();
							}, 1000);
						},
						failFn(error) {
							//重新获取图形验证码
							if (error) {
								that.imgCodeShow = false;
								setTimeout(()=>{
									that.imgCodeShow = true;
								},0)
							}
						}
					})
				}, 300);
			},
			// 60秒倒计时
			countdown(endCountDown) {
				let that = this;
				if (that.countDown == 0 || endCountDown) {
					that.countDown = 60;
					that.codeStatus = "重新发送";
				} else {
					if (!endCountDown) {
						that.countDown--;
						that.codeStatus = that.countDown + "s";
						setTimeout(function() {
							that.countdown();
						}, 1000);
					}
				};
			},
			// 号码
			bindMobile(e) {
				this.mobile = e.detail.value;
			},
			// 验证码
			bindCode(e) {
				this.verificationCode = e.detail.value;
			},
			// 图形验证码
			bindImgCode(e) {
				this.numberCode = e.detail.value;
			},
			bindInvitationCode(e) {
				this.invitationCode = e.detail.value;
			},
			//升级会员
			keepTap(e) {
				let that = this;
				if (!this.mobile) {
					this.util.showToast(this, "手机号码不能为空");
					return false;
				}
				if (!/^1\d{10}$/.test(this.mobile)) {
					this.util.showToast(this, "手机号码格式不正确")
					return false;
				}
				if (!this.numberCode.length) {
					this.util.showToast(this, "请输入图形验证码");
					return false;
				}
				if (!this.verificationCode.length) {
					this.util.showToast(this, "请输入短信验证码~");
					return false;
				}
				// if (!addrObj.invitationCode.length) {
				// 	this.util.showToast(this, "请输入邀请码~");
				// 	return false;
				// }
				if (this.isJoin) {
					this.util.showToast(this, '请不要重复操作');
					return
				} else {
					this.isJoin = true;
				};
				// that.isJoin = false;
				// that.timeStamp = new Date().getTime();
				uni.login({
					success(res) {
						that.util.sendPostShowTost({
							url: that.config.ClientLoginRegister,
							method: 'POST',
							data: JSON.stringify({
								phone: that.mobile,
								ncode: that.verificationCode,
								code: res.code
							}),
							successFn(res) {
								this.isJoin = false;
							},
							failFn(error) {
								this.isJoin = false;
							}
						})
					}
				});
			}
		}
	}
</script>

<style>
	.submit_btn {
		position: fixed;
		z-index: 1;
		left: 30rpx;
		bottom: 30rpx;
		width: 690rpx;
		height: 100rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 100rpx;
		background-color: #EC3C33;
		color: #fff;
	}

	page {
		background: #FFFCF5;
	}

	.big_box {
		display: block;
		overflow: hidden;
		padding-bottom: 120rpx;
	}

	/* 提交信息 S */
	.info_box {
		padding: 10rpx 30rpx 0 30rpx;
		width: 100%;
	}

	.info_line {
		display: inline-block;
		background: #c73932;
		vertical-align: middle;
		width: 4rpx;
		height: 26rpx;
	}

	.input_info {
		padding-left: 30rpx;
		border-radius: 72rpx;
		border: 1rpx solid #e6e6e6;
		height: 72rpx;
		width: 660rpx;
		background-color: #fff;
	}

	.protocol_info {
		display: flex;
		align-items: center;
		padding: 45rpx 30rpx 0 30rpx;
		width: 100%;
	}

	.title {
		display: inline-block;
		width: 600rpx;
		margin-bottom: 15rpx;
		margin-left: 10rpx;
		font-size: 28rpx;
	}

	.input_code {
		display: inline-block;
		padding-left: 30rpx;
		border-radius: 72rpx;
		border: 1rpx #e0e0e0 solid;
		height: 72rpx;
		width: 432rpx;
		background-color: #fff;
		vertical-align: middle;
	}

	.invite_code {
		padding-left: 30rpx;
		border-radius: 72rpx;
		border: 1rpx #e0e0e0 solid;
		height: 72rpx;
		width: 360rpx;
		vertical-align: middle;
	}

	.verification_code {
		display: inline-block;
		border-radius: 72rpx;
		line-height: 72rpx;
		text-align: center;
		width: 208rpx;
		height: 72rpx;
		color: #fff;
		font-size: 28rpx;
		border: 1rpx #f0f0f0 solid;
		background-color: #EC3C33;
		vertical-align: middle;
	}
</style>
