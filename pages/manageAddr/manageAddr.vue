<template><!-- 新增或者编辑地址 （记得把@input改成v-model） -->
	<view>
		<loading v-if="isLoading"></loading>
		<view>
			<!-- 地址信息 S -->
			<view class="page_footer_pd">
			  <view class='wg_form_item'>
			    <view class='wg_form_item_label'>收件人</view>
			    <input type="text" @input="consigneeBindinput" :value="name" class='wg_input' placeholder="姓名" placeholder-class="wg_placeholder"></input>
			  </view>
			  <view class='wg_form_item'>
			    <view class='wg_form_item_label'>手机号</view>
			    <input type="number" @input="mobileBindinput" :value="phone" maxlength="11" class='wg_input' placeholder="手机或电话号码" placeholder-class="wg_placeholder"></input>
			  </view>
			  <view class='wg_form_item' @click="onCity">
			    <view class='wg_form_item_label'>地区</view>
			    <view class='wg_input'>{{area}}</view>
			  </view>
			  <view class='wg_form_item wg_form_item_textarea'>
			    <view class='wg_form_item_label'>详细地址</view>
			    <view class='wg_textarea'>
			      <textarea @input="addrBindinput" class='maxBox' :value="address" placeholder="街道地址" placeholder-class="wg_placeholder"></textarea>
			    </view>
			  </view>
			  <view class='wg_form_item bb0'>
			    <view class='wg_form_item_label'>设置默认地址</view>
			    <view class='wg_input tr'>
			      <switch :checked="isDefault?true:false" @change="switchSet" />
			    </view>
			  </view>
			  <view class='wg_form_item mt20 bb0'>
			    <view class='wg_form_item_label themeC' @click='ClientAddressRemove'>删除地址</view>
			  </view>
			</view>
			<!-- 地址信息 E -->
		</view>
		<view class='page_footer bg_grey5'>
		  <view class='page_footer_btn bg_theme' @click.stop="keepTap">保存</view>
		</view>
		<toast v-if="toastHidden" :showToastTxt="showToastTxt"></toast>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		computed:{
			...mapState(['gld', 'server', 'config', 'upd'])
		},
		data() {
			return {
				isLoading: false,
				toastHidden: false,
				showToastTxt: '',
				id: '',
				name: '',
				phone: '',
				area: '请选择地区', // 地区
				address: '', // 收货地址
				isDefault: '',
				addrLength: 0,
				hideDefault: true,
				areaId: '',
				isAdd: false,
				// addressObj: {}, //地址列表传过来的地址对象数据
			}
		},
		onLoad(options) {
			if (options.addrLength) {
				this.addrLength = options.addrLength;
			}
			if (options.isAdd) {//添加地址
				this.isAdd = options.isAdd;
				this.isDefault = 0;
				this.hideDefault = false;
				uni.setNavigationBarTitle({
					title: '添加地址',
				})
			} else {
				let addressObj = this.upd.addressObj;
				this.id = addressObj.id;
				this.name = addressObj.name;
				this.phone = addressObj.phone;
				this.area = addressObj.area;
				this.address = addressObj.address;
				this.changeUpd({
					addressObj: ''
				});
				uni.setNavigationBarTitle({
					title: '编辑地址',
				});
			}
		},
		onShow() {
			if (this.upd.areaId) {
				this.areaId = this.upd.areaId;
				this.area = this.upd.areaName;
				this.changeUpd({
					areaId: '',
					areaName: '',
				})
			}
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
			...mapMutations(['changeUpd']),
			// 收件人姓名
			consigneeBindinput(e) {
				this.name = e.detail.value;
			},
			// 号码
			mobileBindinput(e) {
				this.phone = e.detail.value;
			},
			// 地区
			onCity() {
				uni.navigateTo({
					url: '../city/city',
				});
			},
			// 详细地址
			addrBindinput(e) {
				this.address = e.detail.value;
			},
			// 设置默认地址开关
			switchSet(e) {
				let isDefault = e.detail.value ? 1 : 0;
				this.isDefault = isDefault;
			},
			verifyConsignee(name) {
				name = name || '';
				// 校验收货人姓名
				if (name.length < 2) {
					return false;
				}
				if ((name.indexOf('先生') != -1) || (name.indexOf('女士') != -1) || (name.indexOf('小姐') != -1) || !(/^[\u2E80-\uFE4F]+(·[\u2E80-\uFE4F]+)*$/.test(name))) {
					return false;
				}
				return true;
			},
			// 新增&编辑 保存地址
			keepTap() {
				let param = {};
				if(this.addrLength == 0){//如果没有地址，设置为默认
					param.isDefault = 1
				}
				if (!this.name || this.name.length < 2) {
					this.util.showToast(this, '请填写收货人姓名！',null,2000);
					return;
				}
				if (!this.verifyConsignee(this.name)) {
					this.util.showToast(this, '请填写真实姓名！', null, 2000);
					return;
				}
				if (!this.phone) {
					this.util.showToast(this, '手机号码不能为空', null, 2000);
					return;
				} else if (!/^1\d{10}$/.test(this.phone)) {
					this.util.showToast(this, '手机号码格式不正确', null, 2000);
					return;
				}
				if (!this.areaId) {
					this.util.showToast(this, '请选择地区', null, 2000);
					return;
				}
				if (!this.address) {
					this.util.showToast(this, '详细地址不能为空', null, 2000);
					return;
				}
				if (this.address.length < 4) {
					this.util.showToast(this, '详细地址过短，请填写正确的详细地址', null, 2000);
					return;
				}
				param.name = this.name;
				param.phone = this.phone;
				param.area = this.area;
				param.address = this.address;
				param.userId = this.gld.id;
				param.id = '557bda559d804a419fbcdcc7e37e1b1f';
				
				let url = '';
				if (!this.isAdd) {
					url = this.config.ClientAddressAdd;
				} else {
					url = this.config.ClientAddressEdit;
				}
				this.util.sendPostShowTost({
					url,
					method: 'POST',
					data: JSON.stringify(param),
					successFn(res) {
						
					}
				})
			},
			// 删除收货地址
			ClientAddressRemove() {
				this.util.sendPostShowTost({
					url: this.config.ClientAddressRemove,
					method: 'POST',
					data: {
						userId: this.gld.id,
						id: '557bda559d804a419fbcdcc7e37e1b1f'
					},
					successFn(res) {
						
					}
				})
			}
		}
	}
</script>

<style>
	.wg_form_item_label {
	  width: 170rpx;
	  margin-right: 20rpx;
	}
</style>
