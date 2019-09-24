<template><!-- 新增或者编辑地址 （记得把@input改成v-model） -->
	<view class="pd2030">
		<!-- <view>
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
			    <view class='wg_input'>{{area? area: areaPlaceholder}}</view>
			  </view>
			  <view class='wg_form_item wg_form_item_textarea'>
			    <view class='wg_form_item_label'>详细地址</view>
			    <view class='wg_textarea'>
			      <textarea @input="addrBindinput" class='maxBox' :value="address" placeholder="街道地址" placeholder-class="wg_placeholder"></textarea>
			    </view>
			  </view>
			  <view class='wg_form_item bb0' v-if="!(isShopCart||hideDefault)">
			    <view class='wg_form_item_label'>设置默认地址</view>
			    <view class='wg_input tr'>
			      <switch :checked="isDefault?true:false" @change="switchSet" />
			    </view>
			  </view>
			  <view class='wg_form_item mt20 bb0' v-if="!(isAdd||addrLength<=1||isShopCart)">
			    <view class='wg_form_item_label themeC' @click='showDeleteDialog'>删除地址</view>
			  </view>
			</view>
		</view> -->
		
		<view class="bgf bdr16 c_333 fz13">
			<view class="addr_box">
				<view class="pdl26">收货人</view>
				<view class='wg_input ml40'>
					<input type="text" @input="consigneeBindinput" :value="name" placeholder="请输入收货人姓名" placeholder-class="wg_placeholder"></input>
				</view>
			</view>
			<view class="h1 bg_DEDEDE ml20 mr20"></view>
			<view class="addr_box">
				<view>手机号码</view>
				<view class='wg_input ml40'>
					<input type="number" @input="mobileBindinput" :value="phone" maxlength="11" placeholder="请输入收货人手机号" placeholder-class="wg_placeholder"></input>
				</view>
			</view>
			<view class="h1 bg_DEDEDE ml20 mr20"></view>
			<view class="addr_box" @click="onCity">
				<view>所在地区</view>
				<view class='wg_input ml40'>
					{{area? area: areaPlaceholder}}
				</view>
				<view>
					<image class="img20" src="../../static/image/order/icon_arrow_right_grey.png"></image>
				</view>
			</view>
			<view class="h1 bg_DEDEDE ml20 mr20"></view>
			<view class="addr_box">
				<view>详细地址</view>
				<view class='wg_input ml40'>
					<input type="text" @input="addrBindinput" :value="address" placeholder="请输入详细有效地址" placeholder-class="wg_placeholder"></input>
				</view>
			</view>
			<view class="h1 bg_DEDEDE ml20 mr20" v-if="!(isShopCart||hideDefault)"></view>
			<view class="pd20 pt40 flex_sc" v-if="!(isShopCart||hideDefault)">
				<view>设为默认地址</view>
				<view @click="switchSet">
					<image class="img60" :src="isDefault? '../../static/image/order/icon_select_blue.png' : '../../static/image/order/icon_select_gray.png'"></image>
				</view>
			</view>
		</view>
		
		<view class="btn_main btn_main_theme mt40 fz14" @click="keepTap">保存收货信息</view>
		<view class="btn_main btn_darkgrey mt20 fz14" v-if="!(isAdd||addrLength<=1||isShopCart)" @click='showDeleteDialog'>删除收货信息</view>
		<!-- <view class='page_footer bg_grey5'>
		  <view class='page_footer_btn bg_theme' @click.stop="keepTap">保存</view>
		</view> -->
		<!-- 删除弹框  -->
		<view :class="[isDeleteDialog ? 'js_dialog' : '' ]">
		  <view class="dialog_mask" />
		  <view class="dialog_container" @click.stop='hideDeleteDialog'>
		    <view class="dialog_content" @click.stop='emptyEvent'>
		      <view class="dialog_title">提示</view>
		      <view class='fz14 c_grey2'>确认删除这个收货地址？</view>
		      <view class='dialog_footer'>
		        <button class='dialog_btn bg_theme' @click.stop='ClientAddressRemove'>确定</button>
		        <button class='cancal_btn' @click.stop='hideDeleteDialog'>取消</button>
		      </view>
		    </view>
		  </view>
		</view>
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
			...mapState(['gld', 'config', 'upd'])
		},
		data() {
			return {
				toastHidden: false,
				showToastTxt: '',
				areaPlaceholder: '请选择地区',
				id: '',
				name: '',
				phone: '',
				area: '', // 地区
				address: '', // 收货地址
				isDefault: 0,
				addrLength: 0,
				hideDefault: true,
				areaId: '',
				isAdd: false,
				isDeleteDialog: false,
				isShopCart: false,
				// addressObj: {}, //地址列表传过来的地址对象数据
			}
		},
		onLoad(options) {
			console.log(this.gld.id);
			if (options.addrLength) {
				this.addrLength = options.addrLength;
			}
			if (options.isAdd) {//添加地址
				uni.setNavigationBarTitle({
					title: '添加地址',
				})
				this.isAdd = options.isAdd;
				this.isDefault = 0;
				this.hideDefault = false;
			} else {
				uni.setNavigationBarTitle({
					title: '编辑地址',
				});
				let addressObj = this.upd.addressObj;
				this.changeUpd({
					addressObj: ''
				});
				this.id = addressObj.id;
				this.name = addressObj.name;
				this.phone = addressObj.phone;
				this.area = addressObj.area;
				this.address = addressObj.address;
				this.isDefault = addressObj.isDefault;
				if (options.isShopCart) {
					this.isShopCart = options.isShopCart;
				}
				if (addressObj.isDefault) {
					this.hideDefault = true;
				} else {
					this.hideDefault = false;
				}
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
				this.isDefault = !this.isDefault;
				this.isDefault = this.isDefault? 1 : 0;
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
				let that = this;
				let param = {};
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
				if (!this.area) {
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
				param.isDefault = this.isDefault;
				if(this.addrLength == 0){//如果没有地址，设置为默认
					param.isDefault = 1
				}
				let url = '';
				if (this.isAdd) {
					url = this.config.ClientAddressAdd;
				} else {
					param.id = this.id;
					url = this.config.ClientAddressEdit;
				}
				this.util.sendPostShowTost({
					url,
					method: 'POST',
					data: JSON.stringify(param),
					successFn(res) {
						that.changeUpd({
							weiXinAddress: param,
							needRefresh: true
						})
						// uni.navigateBack();
					}
				})
			},
			// 弹起删除弹框
			showDeleteDialog() {
				if (this.addrLength == 1) {
					this.util.showToast(this, '至少保留一个地址');
					return
				}
				this.isDeleteDialog = true;
			},
			// 收起弹框
			hideDeleteDialog() {
				this.isDeleteDialog = false;
			},
			// 删除收货地址
			ClientAddressRemove() {
				let that = this;
				this.isDeleteDialog = false;
				let param = {
					ids: this.id
				}
				this.util.sendPostShowTost({
					url: this.config.ClientAddressRemove,
					method: 'POST',
					data: param,
					successFn(res) {
						console.log(res);
						that.util.showToast(that, '删除成功', ()=>{
							that.changeUpd({
								needRefresh: true
							});
							uni.navigateBack();
						})
					}
				})
			}
		}
	}
</script>

<style>
	.addr_box {
		padding: 40rpx 20rpx;
		display: flex;
		align-items: center;
	}
	.pdl26 {
		padding-left: 26rpx;
	}
	.wg_form_item_label {
	  width: 170rpx;
	  margin-right: 20rpx;
	}
</style>
