/*
 * author hgf
 * 登录注册模块接口
 * date 2018-3-8
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
	//忘记密码
	$.forgetPsw = {
		forgetPswAPI: function(opts) {
			$.re.apiAjax("POST", PR + "updatePwdByAuthCode", opts);
		}
	} //修改密码
	$.updatePsw = {
		updatePswAPI: function(opts) {
			$.re.apiAjax("POST", PR + "updatePassword", opts);
		}
	}
	//完善信息
	$.perfectInfo = {
		baseInfoAPI: function(opts) {
			$.re.apiAjax("POST", "updateBuyerBaseInfo", opts);
		}
	} //完善信息
	
	//发送验证码
	$.sendCode = {
		//发送登录验证码
		lsendCodeAPI: function(opts) {
			$.re.apiAjax("POST", PR + "sendLoginAuthCode", opts);
		},//发送注册验证码
		rsendCodeAPI: function(opts) {
			$.re.apiAjax("POST", PR + "sendRegAuthCode", opts);
		},//发送忘记验证码
		sendForgetPswCodeAPI: function(opts) {
			$.re.apiAjax("POST", PR + "sendForgetAuthCode", opts);
		}
	} 
	//已开通城市
	$.companyList = {
		companyListAPI: function(opts) {
			$.re.apiAjax("GET", "guest/company/list", opts);
		}
	}
})(api);