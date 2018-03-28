/*
 * author pzh
 * 登录注册模块接口
 * date 2018-3-3
 * */
(function($) {
	const PR = "guest/";
	//登录
	$.login = {
		loginAPI: function(opts) {
			$.re.apiAjax("POST", PR + "login", opts);
		},
		loginCodeAPI: function(opts) {
			$.re.apiAjax("POST", PR + "loginByAuthCode", opts);
		}
	};
	//注册
	$.register = {
		registerAPI: function(opts) {
			$.re.apiAjax("POST", PR + "register", opts);
		}
	}
	
	//完善信息
	$.perfectInfo = {
		baseInfoAPI : function(opts) {
			$.re.apiAjax("POST", "updateBuyerBaseInfo", opts);
		}
	}
	//忘记密码
	$.forgetPsw = {
		forgetPswAPI : function(opts) {
			$.re.apiAjax("POST", "guest/updatePwdByAuthCode", opts);
		}
	}
})(api);