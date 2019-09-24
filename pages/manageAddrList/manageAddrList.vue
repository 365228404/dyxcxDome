<template><!-- 地址管理 -->
	<view>
		<loading v-if="isLoading"></loading>
		
		<view class="pd2030">
			<!-- <view>
			  <view class="addr_item" v-if="userAddrList.length" v-for="(item, index) in userAddrList" :key='index'>
			    <view class="addr_item_cont">
			      <image class='img44 mr30' v-if="listType==2&&item.select" :src="item.select?'../../static/image/default/icon_ok.png':'../../static/image/default/icon_no.png'"></image>
			      <view class='flex1' @click='chooseAddress(item)'>        
			        <view class="flexbox mb30">
			          <view class='addr_name'>{{item.name}}</view>
			          <text space='nbsp'> {{item.phone}} </text>
			          <view class='tag_small ml10' v-if="!item.isDefault">默认</view>
			        </view>
			        <view class="fz13 c_grey2">{{item.area}} {{item.address}}</view>
			      </view>
			      <view class='addr_edit c_grey3' @click='editAddress(item)'>编辑</view>
			    </view>
			  </view>
			  <view class='page_footer bg_grey5'>
			    <view class='page_footer_btn bg_theme' @click="addAddr">新建地址</view>
			  </view>
			</view> -->
			<view v-if="userAddrList.length">
				<block v-for="(item, index) in userAddrList" :key='index'>
					<view class="pd30 bdr16 bgf flex_c mt20">
						<view class="flex1">
							<view class="fz14">
								<view class="c_333 mb20 flexbox b500">
									<view>{{item.name}}</view>
									<view class="mr20 ml20">{{item.phone}}</view>
									<view v-if="item.isDefault == 1" class="tag_small tag_small_buy">默认</view>
								</view>
								<view class="c_666 nowrap1 lh30">
									{{item.area}}{{item.address}}
								</view>
							</view>
						</view>
						<view class="ml10" @click='editAddress(item)'>
							<image class="img36" src="../../static/image/order/icon_editor_gray.png"></image>
						</view>
					</view>
				</block>
			</view>
			<view class='nodata' v-if="!userAddrList.length">你还没有添加地址呢~</view>
			
			<view class="btn_main btn_main_theme mt40 fz14" @click="addAddr">新增收货地址</view>
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
			...mapState(['gld', 'server', 'config', 'upd'])
		},
		data() {
			return {
				isLoading: false,
				toastHidden: false,
				showToastTxt: '',
				userAddrList: [],
				listType: false, // 用于控制列表样式 1：表示地址管理样式 2：表示确认订单样式
				// needRefresh: false, //是否需要更新购物车
				id: '', // 每条地址对应的ID
			}
		},
		onLoad(options) {
			if (options.listType == 2) {
				this.listType = 2;
			} else {
				this.listType = 1;
			}
			if (options.id) {
				this.id = options.id;
			}
			this.ClientAddressGet();
		},
		onShow() {
			if (this.upd.needRefresh) {
				this.ClientAddressGet();
			}
		},
		methods: {
			...mapMutations(['changeUpd']),
			// 编辑地址
			editAddress(item) {
				let that = this;
				let addrLength = this.userAddrList.length;
				wx.navigateTo({
					url: '../manageAddr/manageAddr?addrLength=' + addrLength
				})
				that.changeUpd({
					addressObj: item
				})
			},
			// 新增地址
			addAddr() {
				let addrLength = this.userAddrList.length;
				wx.navigateTo({
					url: '../manageAddr/manageAddr?isAdd=true&addrLength=' + addrLength
				})
			},
			// 选择订单地址
			chooseAddress(item) {
				let that = this;
				if (that.listType == 1) {//地址管理
					return
				}
				this.changeUpd({ // 获取单条地址传回 确认订单或者购物车
					weiXinAddress: item
				})
				uni.navigateBack();
			},
			// 查询收货地址列表
			ClientAddressGet() {
				let that = this;
				this.util.sendPostShowTost({
					url: this.config.ClientAddressGet,
					data: {
						userid: this.gld.id || 'f6a2f5e85709471e8caa74066a12a70f'
					},
					successFn(res) {
						console.log(res);
						let userAddrList = res.data || [];
						let tmpList = [];
						for (let item of userAddrList) {
							if (that.listType == 2) { // 确认订单、购物车
								if (that.id) { // 有地址的情况 进来
									if (that.id == item.id) {
										item.select = true;
										tmpList.unshift(item);
									}else{
										tmpList.push(item);
									};
								} else {
									if (item.isDefault) {
										item.select = true;
										that.id = item.id;
										that.changeUpd({
											weiXinAddress: item
										})
									}
									tmpList.push(item);
								} 	
							} else {
								tmpList.push(item);
							}
						}
						let tmpListASort = [];
						tmpList.forEach(item=>{
							if (item.isDefault) {
								tmpListASort.unshift(item);
							} else {
								tmpListASort.push(item);
							}
						})
						that.userAddrList = tmpListASort;
					}
				})
			}
		}
	}
</script>

<style>
	page {
	  height: 100%;
	  position: relative;
	  background: #f7f7f7;
	}
	.addr_item{
	  padding: 30rpx 0;
	}
	.ml80{
	  margin-left: 80rpx;
	}
	.addr_edit{
	  height: 100rpx;
	  line-height: 100rpx;
	  padding-left: 30rpx;
	  font-size: 26rpx;
	  border-left: 1rpx dashed #e6e6e6;
	}
	/* 工具栏 S */
	.toolBox {
	  position: relative;
	  width: 100%;
	  height: 72rpx;
	  border-top: 1rpx solid #e6e6e6;
	}
	
	.defAddress {
	  display: flex;
	  align-items: center;
	  font-size: 24rpx;
	  color: #999;
	  height: 100%;
	}
	
	.toolBox .defAddress_image {
	  width: 36rpx;
	  height: 36rpx;
	  margin: 0 20rpx;
	}
	
	.bordBtn {
	  border: 1rpx solid #e6e6e6;
	  border-radius: 4rpx;
	  text-align: center;
	  width: 82rpx;
	  height: 44rpx;
	  line-height: 44rpx;
	  font-size: 24rpx;
	}
	
	.editBtn {
	  position: absolute;
	  top: 14rpx;
	  right: 142rpx;
	}
	
	.deleteBtn {
	  position: absolute;
	  top: 14rpx;
	  right: 36rpx;
	}
</style>
