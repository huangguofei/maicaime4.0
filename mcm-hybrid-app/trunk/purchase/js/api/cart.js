/*
 * author pzh
 * 购物车模块接口
 * date 2018-3-3
 * */
(function($) {
	const PR = "shoppingCart/"
	$.cart = {
		listAPI: function(opts) {
			$.re.apiAjax("GET", PR + "list", opts);
		},
		upadteNumAPI: function(opts) {
			$.re.apiAjax("POST", PR + "updateCartProductNum", opts);
		},
		clearAPI: function(opts) {
			$.re.apiAjax("POST", PR + "clearShoppingCart", opts);
		}
	}
	const OPR = "order/"
	$.orders = {
		submitOrderAPI: function(opts) {
			$.re.apiAjax("POST", OPR + "submitOrder", opts);
		},
		getOrderInfoAPI: function(opts) {
			$.re.apiAjax("POST", OPR + "getCheckSubmitOrderData", opts);
		}
	}
})(api);