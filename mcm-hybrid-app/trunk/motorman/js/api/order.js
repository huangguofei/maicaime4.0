/*
 * author hgf
 * 订单模块接口
 * date 2018-3-13
 * */
(function($) {
	const PR = "deliveryOrder/";
	//订单
	$.order = { //订单列表
		orderListAPI: function(opts) {
			$.re.apiAjax("GET", PR + "list", opts);
		}, //订单详情
		orderDetailsAPI: function(opts) {
			$.re.apiAjax("GET", PR + "get", opts);
		},//确认收货
		orderConfirmArrive:function (opts) {
			$.re.apiAjax("POST", PR + "confirmTheDelivery", opts);
		},
		pickupAPI: function(opts) {
			$.re.apiAjax("POST", PR + "pickup", opts);
		},
		pickupToCompleteAPI: function(opts) {
			$.re.apiAjax("POST", PR + "pickupToComplete", opts);
		}
	};

})(api);