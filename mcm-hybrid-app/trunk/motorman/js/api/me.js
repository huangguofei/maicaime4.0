/*
 * author hgf
 * 我的模块接口
 * date 2018-3-9
 * */
(function($) {
	const PR = "";
	const userMessageListUrl = "message/list";
	const userMessageReadUrl = "message/read";
	//个人资料
	$.userInfo = {
		driverInfoAPI: function(opts) {
			$.re.apiAjax("get", PR + "driverInfo", opts);
		},
		userDataAPI: function(opts) {
			$.re.apiAjax("get", PR + "my", opts);
		},
		userInfoAPI: function(opts) {
			$.re.apiAjax("get", PR + "userInfo", opts);
		}
	};
	$.uploadImg = {
		uploadHeadAPI: function(opts) {
			$.re.apiAjax("get", PR + "driverInfo", opts);
		}
	}
	//提交个人资料
	$.editUser = {
		editUserAPI: function(opts) {
			$.re.apiAjax("POST", PR + "updateUserInfo", opts);
		},
		editDriverAPI: function(opts) {
			$.re.apiAjax("POST", PR + "updateDriverBaseInfo", opts);
		}
	} //消息通知
	$.userMessage = {
		userMessageListAPI: function(opts) {
			$.re.apiAjax("GET", userMessageListUrl, opts);
		},
		userMessageReadAPI: function(opts) {
			$.re.apiAjax("POST", userMessageReadUrl, opts);
		}
	}
	$.logout = {
		logoutAPI: function(opts) {
			$.re.apiAjax("POST", "logout", opts);
		}
	}
})(api);