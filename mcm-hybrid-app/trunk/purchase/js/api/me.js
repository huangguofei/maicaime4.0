/*
 * author hgf
 * 个人中心模块接口
 * date 2018-3-6
 * */
(function($) {
	const userInfoUrl = "userInfo";
	const userAccountUrl = "my";
	const userLogoutUrl = "logout";
	const userEditPswUrl = "updatePassword";
	const userCouponUrl = "userCoupon/list";
	const userCouponOutUrl = "userCoupon/invalidList";
	const userCouponUsableUrl = "userCoupon/availableList";
	const userMoneyUrl = "userWallet/getBalance";
	const userAddressUrl = "buyer/address/list";
	const userShopMessageListUrl = "buyerInfo";
	const userMessageListUrl = "message/list";
	const userMessageReadUrl = "message/read";

	//我的资料
	$.userInfo = {
		userInfoAPI: function(opts) {
			$.re.apiAjax("GET", userInfoUrl, opts);
		}
	};
	//我的账户信息
	$.userAccount = {
		userAccountAPI: function(opts) {
			$.re.apiAjax("GET", userAccountUrl, opts);
		}
	} //退出登录
	$.userLogout = {
		userLogoutAPI: function(opts) {
			$.re.apiAjax("POST", userLogoutUrl, opts);
		}
	} //修改密码
	$.userEditPsw = {
		userEditPswAPI: function(opts) {
			$.re.apiAjax("POST", userEditPswUrl, opts);
		}
	} //我的券
	$.userCoupon = {
		couponListAPI: function(opts) {
			$.re.apiAjax("get", userCouponUrl, opts);
		},
		couponOutListAPI: function(opts) {
			$.re.apiAjax("get", userCouponOutUrl, opts);
		},
		couponUsableListAPI: function(opts) {
			$.re.apiAjax("get", userCouponUsableUrl, opts);
		}
	}
	//我的余额
	$.userMoney = {
		userMoneyAPI: function(opts) {
			$.re.apiAjax("GET", userMoneyUrl, opts);
		}
	}
	//我的收货地址
	$.userAddress = {
		userAddressAPI: function(opts) {
			$.re.apiAjax("GET", userAddressUrl, opts);
		}
	}
	//客户管理
	$.userShopMessage = {
		userShopMessageListAPI: function(opts) {
			$.re.apiAjax("GET", userShopMessageListUrl, opts);
		}
	}
	//消息通知
	$.userMessage = {
		userMessageListAPI: function(opts) {
			$.re.apiAjax("GET", userMessageListUrl, opts);
		},
		userMessageReadAPI: function(opts) {
			$.re.apiAjax("POST", userMessageReadUrl, opts);
		}
	}
})(api);