/**
 * author pzh
 * 公共脚本
 **/
var mcm = (function(document, undefined) {
	var $ = function() {}

	if('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			(typeof FastClick === "function") && FastClick.attach(document.body);
		}, false);
	}
	$.config = {
		BARDUAK: '80a735a360df5de29781aea0dc7294d8',
		USER_TOKEN: 'USER_MOTORMAN_TOKEN',
//		API_PATH: 'https://t-external-api.maicaim.net/external/',
		//API_PATH: 'http://192.168.3.222:8087/external/',
		API_PATH: 'https://external-api.maicaim.com/',
		DOMAIN: 'https://external-api.maicaim.com/',
		LOCATIONINFO: 'LOCATION_INFO',
		BARCODE: 'http://profile.maicaim.com/driver/pickup?orderId=',
		VERSION: '4.0.0',
		VERSIONCODE: 2
	}
	mui.plusReady(function() {
		//禁止横屏
		plus.screen.lockOrientation("portrait-primary");
	})
	function adaptiveRem() {
		var docEl = document.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var width = docEl.getBoundingClientRect().width;
				if(width > 640) { // 最大宽度
					width = 640;
				}
				var rem = width / 6.4;
				docEl.style.fontSize = rem + 'px';

			};
		recalc();
		window.addEventListener(resizeEvt, recalc, false);
		document.addEventListener('DOMContentLoaded', recalc, false);
	}
	adaptiveRem();
	/*创建和存储 cookie*/
	$.setCookie = function(name, value, hour) {
		var hour = hour ? hour : 24 * 30;
		var exp = new Date(); //获得当前时间
		exp.setTime(exp.getTime() + hour * 60 * 60 * 1000); //换成毫秒
		//document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
		plus.navigator.setCookie("http://www.maicaim.com/", name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/");
	};
	/*读cookie*/
	$.getCookie = function(name) {
		var cookie = plus.navigator.getCookie("http://www.maicaim.com/");
		var arr = cookie && cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]);
		return null;
	};
	/*删除所有cookie*/
	$.removeCookie = function() {
		plus.navigator.removeAllCookie();
	}
	/*单个跳转页面*/
	$.singleJumpPage = function(id, url, title, params) {
		var webview = plus.webview.getWebviewById(id);
		if(!webview) {
			webview = mui.openWindow({
				url: url,
				id: id,
				styles: {
					"render": "always",
					"popGesture": "hide",
					"titleNView": {
						'backgroundColor': '#FCFCFC',
						'titleText': title,
						'titleColor': '#0A0B0C',
						autoBackButton: true
					},
				},
				extras: params ? params : {}
			});
			webview.addEventListener('close', function() {
				webview = null;
			}, false);
		} else {
			webview.show("slide-in-right", 300);
		}
	}
	/*单个跳转页面重写*/
	$.singleJumpPageNew = function(opts) {
		if(opts) {
			var webview = plus.webview.getWebviewById(opts.id);
			if(!webview) {
				webview = mui.openWindow({
					url: opts.url,
					id: opts.id,
					styles: {
						"render": "always",
						"popGesture": "hide",
						"titleNView": {
							'backgroundColor': '#FCFCFC',
							'titleText': opts.title,
							'titleColor': '#0A0B0C',
							autoBackButton: opts.autoBackButton ? true : false
						},
					},
					extras: opts.params ? opts.params : {}
				});
				webview.addEventListener('close', function() {
					webview = null;
				}, false);
			} else {
				webview.show("slide-in-right", 300);
			}
		}
	}
	/*退出APP应用*/
	$.closeAPP = function() {
		mui.back = function() {
			var btn = ["确定", "取消"];
			mui.confirm('确认退出应用？', '买菜么司机端', btn, function(e) {
				if(e.index == 0) {
					/*mui.currentWebview.close();*/
					plus.runtime.quit();
				}
			});
		}
	}
	/*清除webview*/
	$.closeWebView = function(ids) {
		if(typeof ids === "object") {
			mui.each(ids, function(key, val) {
				val && plus.webview.getWebviewById(val) && plus.webview.getWebviewById(val).close("none");
			});
		} else {
			ids && plus.webview.getWebviewById(id) && plus.webview.getWebviewById(ids).close("none");
		}
	}
	/*设置系统状态栏背景颜色*/
	$.setStatusBack = function(color) {
		color && 　plus.navigator.setStatusBarBackground(color);
	}
	/*检测是否已登录*/
	$.isLogin = function(isJump, url) {
		var token = $.getCookie($.config.USER_TOKEN);
		if(token) {
			return true;
		} {
			if(isJump) {
				mui.openWindow({
					url: url ? url : "view/login/login.html",
					id: "login",
					styles: {
						"render": "always",
						"popGesture": "hide"
					},
					show: {
						 duration: 600
					}
				});
			}
			return false;
		}
	}

	/*清除webview*/
	$.closeWebView = function(ids) {
		if(typeof ids === "object") {
			mui.each(ids, function(key, val) {
				val && plus.webview.getWebviewById(val) && plus.webview.getWebviewById(val).close("none");
			});
		} else {
			ids && plus.webview.getWebviewById(id) && plus.webview.getWebviewById(ids).close("none");
		}
	}
	//获取url参数
	$.GetRequest = function() {
		var url = location.search; //获取url中含"?"符后的字串
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	$.ajax = function(opts) {
		var url = "",
			wt = null;
		if(opts.url) {
			url = $.config.API_PATH + opts.url;
		}
		var header = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		};
		var token = mcm.getCookie($.config.USER_TOKEN);
		if(token) {
			header["token"] = token;
		}
		if(!opts.loading) {
		}
		mui.ajax(url, {
			data: (opts.data ? opts.data : null),
			dataType: 'json',
			type: opts.type ? opts.type : 'post',
			async: opts.async ? opts.async : false,
			timeout: opts.time ? opts.time : 10000,
			headers: header,
			success: function(data) {
				var httpCode = data.resultCode;
				if(httpCode == 200) {
					opts.success(data.data);
				} else if(httpCode == 203) {
					mui.openWindow({
						url: "../login/login.html",
						id: "loginIndex"
					});
				} else if(httpCode == -1) {
					plus.nativeUI.toast(data.msg);
					opts.error ? opts.error(data) : '';
				} else {
					plus.nativeUI.toast(data.msg);
					opts.error ? opts.error(data) : '';
				}
			},
			error: function(xhr, type, errorThrown) {
				//				wt && wt.close();
				if(xhr.statusText === "OK") {
					plus.nativeUI.toast(xhr.response)
				} else {
					plus.nativeUI.toast("服务器异常，请稍候再试")
				}
			}
		});
	}
	/*验证码*/
	$.sendCode = function(vm, params, type) {
		const timeNum = 60;
		vm.numTime = timeNum;
		var codeAPI = "";
		if(type === "login") {
			codeAPI = "sendLoginCodeAPI";
		} else if(type === "reg") {
			codeAPI = "sendRegCodeAPI";
		} else {
			codeAPI = "sendForgetCodeAPI";
		}
		api.common[codeAPI]({
			data: params,
			success: function(result) {
				var timer = setInterval(function() {
					if(vm.numTime > 0) {
						vm.numTime--;
						vm.codeStr = vm.numTime + "s后重新获取";
					} else {
						clearInterval(timer);
						vm.numTime = 0;
						vm.codeStr = "重新获取";
					}
				}, 1000);
			}
		});
	}

	/*上传图片*/
	$.uploadImage = function(uploadType, success) {
		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: [{
					title: "拍照"
				},
				{
					title: "从相册中选择"
				}
			]
		}, function(e) {
			switch(e.index) {
				case 1:
					appendByCamera();
					break;
				case 2:
					appendByGallery();
					break;
			}
		});

		function appendByCamera() {
			plus.camera.getCamera().captureImage(function(e) {
				plus.io.resolveLocalFileSystemURL(e, function(entry) {
					var path = entry.toLocalURL();
					upload(path);
				}, function(e) {
					mui.toast("读取拍照文件错误：" + e.message);
				});
			});
		}

		function appendByGallery() {
			plus.gallery.pick(function(path) {
				upload(path);
			});
		}

		function upload(path) {
			var server = $.config.API_PATH + "d/img/upload";
			var wt = plus.nativeUI.showWaiting();
			var task = plus.uploader.createUpload(server, {
					method: "POST"
				},
				function(t, status) {
					if(status == 200) {
						var result = JSON.parse(t.responseText);
						if(result.resultCode === 200) {
							mui.toast("上传成功");
							success && success(result.data);
						}
						wt.close();
					} else {
						mui.toast("上传失败：" + status);
						wt.close();
					}
				}
			);
			var token = mcm.getCookie($.config.USER_TOKEN);
			if(token) {
				task.setRequestHeader("token", token);
			}
			task.addData("uploadType", uploadType + "");
			task.addFile(path, {
				key: "imgFile"
			});
			task.start();
		}
	}

	/*提示语*/
	$.message = {
		mobileNull: "手机号码不能为空",
		mobileError: "手机号码格式不正确",
		codeNull: "验证码不能为空",
		pwdNull: "密码不能为空",
		oldPwdNull: "旧密码不能为空",
		newPwdNull: "新密码不能为空",
		pwdDifferent: "两次输入的密码不一致",
		pwdMinLen: "密码长度不能低于6位",
		pwdMaxLen: "密码长度不能高于12位",
		regSuccess: "注册成功,请登录",
		updatePwdSuccess: "修改成功,请登录",
		forgetSuccess: "找回密码成功,请登录",
		loginSuccess: "登录成功",
		shopNameNull: "店铺名字不能为空",
		principalNull: "负责人不能为空",
		addrNull: "地址不能为空",
		shopImageNull: "请上传店铺门头照",
		businessLicenseImageNull: "请上传营业执照",
		identityCardFrontImageNull: "请上传身份证正面",
		identityCardReverseImageNull: "请上传身份证反面",
		deliverNameNull: "收货人不能为空",
		expectedReceiptTimeNull: "收货时间不能为空",
		baseInfoSuccess: "店铺信息提交成功\n工作人员会及时审核",
		headImgNull:"请上传头像!",
		nickNameNull:"昵称不能为空",
		realNameNull:"真实姓名不能为空",
		auditInfoSuccess:"提交审核成功,请耐心等待",
		imageNull:"请上传图片",
		driverNameNull:"司机姓名不能为空",
		idCardNull:"身份证号不能为空",
		carNumNull:"车牌号不能为空",
		carTypeNull:"车类型不能为空",
		drivingLicenceErr:'驾驶证信息不完整',
		carInfoErr:'车辆信息不完整',
		linkmanErr:'紧急联系人信息不完整',
		
	}
	return $;
})(document);

/*验证表单*/
(function(mcm) {
	mcm.validation = {};
	var $ = mcm.validation;
	$.checkMobile = function(str) {
		var re = /^1\d{10}$/;
		if(!re.test(str)) {
			return false;
		} else {
			return true;
		}
	}
	$.checkPrice = function (price) {
		var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if(reg.test(price)) {
			return true;
		} else {
			return false;
		}
	}
})(mcm);
/*后台接口文件入口*/
var api = (function(window) {
	var $ = {};

	function responseHttp() {
		this.apiAjax = function(type, url, opts, orurl) {
			orurl ? "" : (url = "d/" + url);
			var options = {};
			options = opts;
			options.type = type;
			options.url = url;
			options && mcm.ajax(options);
		};

	}
	$.re = new responseHttp();

	$.common = {
		//注册验证码
		sendRegCodeAPI: function(opts) {
			$.re.apiAjax("POST", "guest/sendRegAuthCode", opts);
		},
		//登录验证码
		sendLoginCodeAPI: function(opts) {
			$.re.apiAjax("POST", "guest/sendLoginAuthCode", opts);
		},
		//忘记密码验证码
		sendForgetCodeAPI: function(opts) {
			$.re.apiAjax("POST", "guest/sendForgetAuthCode", opts);
		},
		//加入购物车
		addCartAPI: function(opts) {
			$.re.apiAjax("POST", "shoppingCart/addToShoppingCart", opts);
		},
		//版本
		checkUpdateAPI: function(opts) {
			$.re.apiAjax("GET", "common/appVersion/checkUpdate", opts, true);
		}
	};
	return $;
})(document);