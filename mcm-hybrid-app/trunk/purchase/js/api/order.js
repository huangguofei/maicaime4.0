/*
 * author hgf
 * 订单模块接口
 * date 2018-3-6
 * */
(function($) {
	const PR = "order/";
	//订单列表
	$.orderList = {
		orderListAPI: function(opts) {
			$.re.apiAjax("GET", PR + "list", opts);
		}
	};
	//订单详情
	$.orderDetails = {
		orderDetailsAPI: function(opts) {
			$.re.apiAjax("GET", PR + "detail", opts);
		}
	}
	//取消订单
	$.cancelOrder = {
		cancelOrderAPI: function(opts) {
			$.re.apiAjax("POST", PR + "cancelOrder", opts);
		}
	}
})(api);