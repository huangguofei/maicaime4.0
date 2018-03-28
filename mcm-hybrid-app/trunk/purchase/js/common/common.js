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
	mui.plusReady(function() {
		plus.navigator.setStatusBarStyle('dark');
		//禁止横屏
		plus.screen.lockOrientation("portrait-primary");
	})
	$.config = {
		BARDUAK: 'aFNd7tZyBy1MeoYCBXRqc6cpHWP6K7V0',
		USER_TOKEN: 'USER_TOKEN',
		//API_PATH: 'http://172.16.3.244:8080/mcm-external-api/',
		//API_PATH: 'http://192.168.3.222:8087/external/',
		API_PATH: 'https://t-external-api.maicaim.net/external/',
		//API_PATH: 'https://external-api.maicaim.com/',
		DOMAIN: 'https://external-api.maicaim.com/',
		LOCATIONINFO: 'LOCATION_INFO',
		LASTWEBVIEWID: 'LASTWEBVIEWID',
		VERSION: '4.0.0',
		VERSIONCODE: 2
	}

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
		plus.navigator.setCookie($.config.DOMAIN, name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/");
	};
	/*读cookie*/
	$.getCookie = function(name) {
		var cookie = plus.navigator.getCookie($.config.DOMAIN);
		var arr = cookie && cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]);
		return null;
	};
	/*删除所有cookie*/
	$.removeCookie = function() {
		plus.navigator.removeAllCookie();
	}
	/*获取地址参数*/
	$.getUrlParms = function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if(r!=null)
	   	return unescape(r[2]);
	   return null;
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
			mui.confirm('确认退出应用？', '买菜么', btn, function(e) {
				if(e.index == 0) {
					//mui.currentWebview.close();
					plus.runtime.quit();
				}
			});
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
				var login = plus.webview.getWebviewById('login');
				if(login) {
					login.show("slide-in-bottom");
				} else {
					mui.openWindow({
						url: url ? url : "view/login/login.html",
						id: "login",
						styles: {
							"render": "always",
							"popGesture": "hide"
						},
						show: {
							 aniShow: 'slide-in-bottom',
							 duration: 300
						}
					});
				}
			}
			return false;
		}
	}
	/*记录最后一次请求的webview的id*/
	$.recordWebViewId = function() {
		mui.plusReady(function() {
			var ws = plus.webview.currentWebview();
			var id = ws.id || null;
			plus.storage.setItem($.config.LASTWEBVIEWID, id);
		})
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
	/*预加载支付*/
	$.preloadPayPage = function(url) {
		mui.init({
		  preloadPages:[
		    {
				url: url ? url : '../common/payment-type.html',
				id: "paymentType",
				styles: {
					"render": "always",
					"popGesture": "hide",
					background: "transparent"
				},
				show: {
					aniShow: 'slide-in-bottom',
					duration: 500
				}
		    }
		  ]
		});
	}
	/*预加载数字键盘*/
	$.preloadKeyNumber = function(url) {
		mui.init({
		  preloadPages:[
		    {
				url: url ? url : "../common/number-key.html",
				id: "numberKey",
				styles: {
					"render": "always",
					"popGesture": "hide",
					background: "transparent"
				},
				show: {
					 aniShow: 'slide-in-bottom',
					 duration: 300
				},
		    }
		  ]
		});
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
		if(opts.loading) {
			var mes = otps.message ? otps.message : "提交中，请等待...";
			wt = plus.nativeUI.showWaiting(mes);
		}
		mui.ajax(url, {
			data: (opts.data ? opts.data : null),
			dataType: 'json',
			type: opts.type ? opts.type : 'post',
			async: opts.async ? opts.async : true,
			timeout: opts.time ? opts.time : 10000,
			headers: header,
			success: function(data) {
				wt && wt.close();
				if(!data) return false;
				var httpCode = data.resultCode;
				$.recordWebViewId();
				if(httpCode == 200) {
					opts.success(data.data);
				} else if(httpCode == 203) {
					$.removeCookie();
					$.isLogin();
				} else if(httpCode == -1) {
					if(data.msg === '非法请求') {
						$.removeCookie();
						$.isLogin();
					} else {
						plus.nativeUI.toast(data.msg);
						opts.error ? opts.error(data) : '';
					}
				} else {
					plus.nativeUI.toast(data.msg);
					opts.error ? opts.error(data) : '';
				}
			},
			error: function(xhr, type, errorThrown) {
				plus.nativeUI.closeWaiting();
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
			plus.zip.compressImage({  
                src: path,  
                dst: "_doc/shop/" + path,  
                quality: 50,  
                overwrite: true  
            }, function(e){
            	var server = $.config.API_PATH + "b/img/upload";
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
            }, function(err) {  
               mui.toast("图片压缩失败");  
            })
			
		}
	}

	/*提示语*/
	$.message = {
		mobileNull: "手机号码不能为空",
		mobileError: "手机号码格式不正确",
		codeNull: "验证码不能为空",
		pwdNull: "密码不能为空",
		pwdMinLen: "密码长度不能低于6位",
		pwdMaxLen: "密码长度不能高于12位",
		regSuccess: "注册成功,请登录",
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
		cartProdNull: "请选择下单商品",
		notOrders: "未找到订单信息"
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


/*公共API对接*/
(function(mcm) {
	var $  = mcm;
	/*获取已添到清单的商品*/
	$.getHaveAddOftenProd = function(callback) {
		api.common.haveAddOftenAPI({
			success: function(result) {
				callback && callback(result)
			}
		})
	}
	/*获取购物车数量和总价*/
	$.getCartNumAndTotal = function(callback) {
		api.common.getCartNumAndTotalAPI({
			success: function(result) {
				callback && callback(result)
			}
		})
	},
	/**
	 * 获取推荐商品
	 * opts.type  为prod只返回商品列表 为all或者null 返回分类和商品
	 */
	$.getRecommendProd = function(opts) {
		var recommendAPI = mcm.isLogin(false) ? "recommendAPI" : "guestRecommendAPI";
		api.index[recommendAPI]({
			data: opts.data,
			success: function(result) {
				if(!result) return false;
				var type = opts.type;
				var prodAssignNum = function(carts) {
					var prods = [];
					mui.each(result, function(i, item) {
						var sellProducts = item.items;
						mui.each(sellProducts, function(n, prod) {
							if(carts){
								var cart = carts[prod.sellProductId];
								if(cart){
									prod.productQuantity = cart.productQuantity;
								} else {
									prod.productQuantity = 0;
								}
							} else {
								prod.productQuantity = 0;
							}
							prods.push(prod);
						})
					});
					if(type === 'prod') {
						opts.callback(prods);
						result = null;
					} else {
						opts.callback(result);
					}
				}
				mcm.isLogin(false) ? api.common.getProdCartNumAPI({
					success: function(carts) {
						prodAssignNum(carts)
					}
				}) : prodAssignNum();
			}
		});
	}

})(mcm);


/*后台接口文件入口*/
var api = (function(window) {
	var $ = {};

	function responseHttp() {
		this.apiAjax = function(type, url, opts, orurl) {
			orurl ? "" : (url = "b/" + url);
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
		//获取购物车数量和价格
		getCartNumAndTotalAPI: function(opts) {
			$.re.apiAjax("GET", "shoppingCart/getShoppingCartTotal", opts);
		},
		//获取购物车各产品数量
		getProdCartNumAPI: function(opts) {
			$.re.apiAjax("GET", "shoppingCart/listProductQuantitys", opts);
		},
		//根据单个商品获取购物车数量
		getCartNumByProdId: function(opts) {
			$.re.apiAjax("POST", "shoppingCart/listProductQuantitysBySellProductId", opts);
		},
		//获取默认收货地址
		getDefaultAddrAPI: function(opts) {
			$.re.apiAjax("GET", "buyer/address/getDefaultAddress", opts);
		},
		//已开通公司列表
		commpanyAPI: function(opts) {
			$.re.apiAjax("GET", "company/list", opts);
		},
		guestCommpanyAPI: function(opts) {
			$.re.apiAjax("GET", "guest/company/list", opts);
		},
		//已添加过常用清单
		haveAddOftenAPI: function(opts) {
			$.re.apiAjax("GET", "collect/list/simple", opts);
		},
		//加入清单
		addOftenAPI: function(opts) {
			$.re.apiAjax("POST", "collect/save", opts);
		},
		//批量添加清单
		prodBatchAddOften: function(opts) {
			$.re.apiAjax("POST", "collect/multiSave", opts);
		},
		//删除清单-根据单个商品
		delOftenAPI: function(opts) {
			$.re.apiAjax("POST", "collect/delBySellProductId", opts);
		},
		//支付宝支付
		alipayAPI: function(opts) {
			$.re.apiAjax("GET", "alipay/getRechargeParameters", opts);
		},
		//微信支付
		wxpayAPI: function(opts) {
			$.re.apiAjax("GET", "weixinPay/getRechargeParameters", opts);
		},
		//余额支付
		balancePayAPI: function(opts) {
			$.re.apiAjax("POST", "pay/payByBalance", opts);
		},
		//帐户余额
		getBalanceAPI: function(opts) {
			$.re.apiAjax("GET", "userWallet/getBalance", opts);
		},
		//版本
		checkUpdateAPI: function(opts) {
			$.re.apiAjax("GET", "common/appVersion/checkUpdate", opts, true);
		},
		//检测商户的状态
		buyerStatusAPI: function(opts) {
			$.re.apiAjax("GET", "buyerInfo", opts);
		}
	};

	return $;
})(window);