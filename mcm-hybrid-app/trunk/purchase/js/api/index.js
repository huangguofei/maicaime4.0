/*
 * author pzh
 * 首页模块接口
 * date 2018-3-3
 * */
(function($) {
	const PR = "guest/";
	$.index = {
		guestCategoryAPI: function(opts) {
			$.re.apiAjax("GET", PR + "category", opts);
		},
		guestAdvAPI: function(opts) {
			$.re.apiAjax("GET", PR + "advertising", opts);
		},
		guestRecommendAPI: function(opts) {
			$.re.apiAjax("GET", PR + "recommend", opts);
		},
		categoryAPI: function(opts) {
			$.re.apiAjax("GET", "category", opts);
		},
		advAPI: function(opts) {
			$.re.apiAjax("GET", "advertising", opts);
		},
		recommendAPI: function(opts) {
			$.re.apiAjax("GET", "recommend", opts);
		},
		companyOpenAPI: function(opts) {
			$.re.apiAjax("GET", "company/checkOpen", opts);
		},
		guestCompanyOpenAPI: function(opts) {
			$.re.apiAjax("GET", "guest/company/checkOpen", opts);
		}
	}
})(api);