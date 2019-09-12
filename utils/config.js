// 存放接口
let config = {
	// 微信登录
	loginByWechat: "weiXinUser/loginByWechat.action",
	// 获取用户信息
	getUserInfoByUserId: "weiXinUser/getUserInfoByUserId.action",
	// 获取店铺会场信息
	getNewOrganizationHomeInfo: "weiXinUser/getNewOrganizationHomeInfo.action",
	// 获取商品列表
	getNewOranizationStoreGoodsList: "weiXinGoods/getNewOranizationStoreGoodsList.action",
	// 查询小C弹窗信息
	getPopUpWindowsInfo: "weiXinUser/getPopUpWindowsInfo.action",
	// 获取分组详情（相当于原来的内购胡详情）
	getGoodsGroupByGoodsGroupId: "goodsGroup/getGoodsGroupByGoodsGroupId.action",
	// 获取内购会刷新在线用户和购买用户
	getUserListByGoodsGroupId: "purchaseWould/getUserListByGoodsGroupId.action",
	// 添加内购会记录
	addPurchaseWouldGoodsReCord: "purchaseWould/addPurchaseWouldGoodsReCord.action",
	// 根据商品规格ID获取商品详情
	getGoodsDetailByGoodsSpecId: "weiXinGoods/getGoodsDetailByGoodsSpecId.action",
	// 获取可领券
	findReceiveCouponList: "weiXinCoupon/findReceiveCouponList.action",
	// 获取默认地址
	getDefaultAddress: "weiXinUser/getDefaultAddress.action",
	// 添加内购会记录
	addPurchaseWouldGoodsReCord: "purchaseWould/addPurchaseWouldGoodsReCord.action",
	// 查询是否有免邮资格
	queryFreePostageStatus: "weiXinOrder/queryFreePostageStatus.action",
	// 购物车选择优惠券
	findCouponOnCart: "weiXinCoupon/findCouponOnCart.action",
	//更新用户表单
	updateUserForm: 'weiXinUser/updateUserForm.action',
	// 不发货地区校验
	checkOrderNoDeliverArea: "weiXinOrder/checkOrderNoDeliverArea.action",
	// 内购会新增订单
	addPurchaseOrder: "weiXinOrder/addPurchaseOrder.action",
	// 获取用于RSA加密的模和公钥指数
	getPublicKeyAndModel: "common/getPublicKeyAndModel.action",
	// 如果使用了余额抵扣，不管结果是成功还是失败都要通知后台
	yuntongPayWebNotifyUrl: "yuntongPay/yuntongPayWebNotifyUrl.action",
	// 使用余额抵扣时用这个接口发起订单
	sponsorYuntongPayReceiptScanCodeByOrderIdAppletNew: "yuntongPay/sponsorYuntongPayReceiptScanCodeByOrderIdAppletNew.action",
	// 获取图形验证码
	getValidateCode: "verifyCode/getValidateCode.action",
	// 发送短信验证码（微信公众号渠道）
	sendVerifyCodeByMP: "verifyCode/sendVerifyCodeByMP.action",
	// 绑定微信用户组织信息(二维码进入)-渠道用
	bindingUserOrganizationNew: "weiXinUser/bindingUserOrganizationNew.action",
	// 获取邀请码列表
	getExtractList: "weiXinUser/getExtractList.action",
	// 获取分组列表
	getNewGoodsGroupListByCondition: "goodsGroup/getNewGoodsGroupListByCondition.action",
	//获取店主成单
	checkOrganizationOrderCounts: "weiXinOrder/checkOrganizationOrderCounts.action",
	// 获取商品列表
	getNewOranizationStoreGoodsList: "weiXinGoods/getNewOranizationStoreGoodsList.action",
	// 添加购物车
	addNewShoppingCartGoods: "weiXinshoppingCart/addNewShoppingCartGoods.action",
	// 获取默认地址
	getDefaultAddress: "weiXinUser/getDefaultAddress.action",
	// 查询是否有免邮资格
	queryFreePostageStatus: "weiXinOrder/queryFreePostageStatus.action",
	// 购物车选择优惠券
	findCouponOnCart: "weiXinCoupon/findCouponOnCart.action",
	// 查询品牌是否有免邮资格
	queryFreePostageStatus: "weiXinOrder/queryFreePostageStatus.action",
	// 查询是否有免邮资格
	checkSecondOrderFreeExpressFee: "weiXinUser/checkSecondOrderFreeExpressFee.action",
	// 根据地区父ID获取子地区(0为所有顶级父地区)
	getAreaListByParentId: 'area/getAreaListByParentId.action',
	// 新增订单（立即购买）
	addOrder: "weiXinOrder/addOrder.action",
	// 获取收货地址列表
	getWeiXinAddressList: "weiXinUser/getWeiXinAddressList.action",
	// 新增收货地址
	saveWeiXinAddressList: "weiXinUser/saveWeiXinAddressList.action",
	saveWeiXinAddress: "weiXinUser/saveWeiXinAddress.action",
	// 修改收货地址
	updateWeiXinAddress: "weiXinUser/updateWeiXinAddress.action",
	// 删除地址
	deleteWeiXinAddressList: "weiXinUser/deleteWeiXinAddressList.action",
	// 获取购物车列表
	getNewShoppingCartGoodsList: "weiXinshoppingCart/getNewShoppingCartGoodsList.action",
	// 获取订单列表
	getOrderListByState: "weiXinOrder/getOrderListByState.action",
	// 店主注册一个月后是否还是普通店主
	estimateVipIncome: "weiXinUser/estimateVipIncome.action",
	// 获取用户收益信息
	getUserIncomeByUserId: "weiXinUser/getUserIncomeByUserId.action",
	// 获取余额流水记录列表
	getBalanceWatercourseList: "weiXinUser/getBalanceWatercourseListByCondition.action",
	// 根据提现金额获取手续费
	getServiceChargeByWithdrawAmount: "yuntongPay/getServiceChargeByWithdrawAmount.action",
	// 获取默认客服图片
	getCustomServiceImage: "weiXinUser/getCustomServiceImage.action",
	// 保存默认客服图片
	updateCustomServiceImage: "weiXinUser/updateCustomServiceImage.action",
	// 修改信息
	updateCustomStoreInfo: "weiXinUser/updateCustomStoreInfo.action",
	// 获取优选会场分享图片
	getGoodsGroupShareImageTwo: "goodsGroup/getGoodsGroupShareImageByGoodsGroupIdTwo.action",
	
	
	
	//后台良哥的接口
	
	//登录
	ClientLoginLogin: 'ClientLogin/login',
	//小B注册->图形验证码
	captchaCaptchaImage: '/captcha/captchaImage',
	// 获取收货地址
	ClientAddressGet: 'ClientAddress/get',
	//增加收货地址
	ClientAddressAdd: 'ClientAddress/add',
	//编辑收货地址
	ClientAddressEdit: 'ClientAddress/edit',
	//删除默认地址
	ClientAddressRemove: 'ClientAddress/remove'
}
export default config;
// export const login = 'login';
