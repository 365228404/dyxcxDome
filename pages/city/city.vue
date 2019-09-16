<template><!-- 选择地区 -->
	<view>
		<loading v-if="isLoading"></loading>
		<view>
			<view class="wg-city">
			  <view class="wg-city-box" v-if="areaList.length">
			    <!--循环显示城市-->
			    <view @click.stop="btnClick(item.id, item.name)" v-for="(item, index) in areaList" :class="['row-title', index==0?'first':'']" :key="item.id">{{item.name}}
			    </view>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		computed:{
			...mapState(['config'])
		},
		data() {
			return {
				isLoading: true,
				oneLoading: false,
				areaList: [],
				areaName: '',
			}
		},
		onLoad(options) {
			this.AreaManager(0, (areaList)=>{
				this.areaList = areaList;
			})
		},
		onShow() {
			
		},
		methods: {
			...mapMutations(['changeUpd']),
			btnClick(id, name) {
				if (this.areaName) {
					this.areaName += '-' + name;
				} else {
					this.areaName += name;
				}
				this.AreaManager(id, (areaList)=>{
					if (areaList.length > 0) {
						this.areaList = areaList;
					} else {
						this.changeUpd({
							areaId: id,
							areaName: this.areaName,
						})
						uni.navigateBack();
					}
				})
			},
			// 根据id获取省份地区城市列表
			AreaManager(areaId, callback) {
				let that = this;
				this.util.sendPostShowTost({
					url: this.config.AreaManager,
					data: {
						pid: areaId
					},
					successFn(res) {
						if (callback) {
							that.isLoading = false;
							callback(res.data);
						}
					}
				})
			}
		}
	}
</script>

<style>
	.wg-city {
	  width: 100%;
	  padding-top: 15rpx;
	  margin-bottom: 15rpx;
	  font-size: 28rpx;
	}
	.wg-city-box {
	  padding-left: 20rpx;
	  background-color: #fff;
	  border-top: 1rpx solid #e5e5e5;
	  border-bottom: 1rpx solid #e5e5e5;
	}
	.wg-city-box .row-title {
	  height: 128rpx;
	  overflow: hidden;
	  border-top: 1rpx solid #e5e5e5;
	  line-height: 128rpx;
	}
	
	.row-title.first{
	  border-top: none;
	}
</style>
