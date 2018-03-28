/*
 * author pzh
 * 商城模块接口
 * date 2018-3-3
 * */
(function($) {
	var PR = 'sellProd/', GUEST_PR = 'guest/' + PR;
	$.shop = {
		categoryAPI: function(opts) {
			$.re.apiAjax("GET", PR + "category/list", opts);
		},
		detailAPI: function(opts) {
			$.re.apiAjax("GET", PR + "get", opts);
		},
		prodListAPI: function(opts) {
			$.re.apiAjax("POST", PR + "list", opts);
		},
		guestCategoryAPI: function(opts) {
			$.re.apiAjax("GET", GUEST_PR + "category/list", opts);
		},
		guestDetailAPI: function(opts) {
			$.re.apiAjax("GET", GUEST_PR + "get", opts);
		},
		guestProdListAPI: function(opts) {
			$.re.apiAjax("POST", GUEST_PR + "list", opts);
		},
	}
})(api);
