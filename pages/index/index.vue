<template><!-- 第一个主页面 -->
	<view>
		<loading v-if="isLoading"></loading>
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	import loading from '../../components/loading';
	export default {
		components:{
			loading
		},
		data() {
			return {
				isLoading: true
			}
		},
		computed:{
			...mapState(['gld'])
		},
		onLoad(options) {
			this.util.getUserInfo(()=>{
				this.goPages();
			})
		},
		methods:{
			goPages() {
				if (this.gld.type) { // 如果是店主
					if (!this.gld.ifRegister) { // 如果未注册就去注册页面
						uni.redirectTo({
							url: '../validate/validate'
						})
					} else {
						uni.switchTab({
							url: '../store/store'
						})
					}
				} else { // 跳转到小C 个人中心
					uni.redirectTo({
						url: '../Cshowcase/Cshowcase'
					})
				}
			}
		}
	}
</script>
