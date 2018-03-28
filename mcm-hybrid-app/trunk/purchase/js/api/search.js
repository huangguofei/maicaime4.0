/*
 * author pzh
 * 搜索模块接口
 * date 2018-3-3
 * */
(function($) {
	$.search = {
		guestKeywordAPI: function(opts) {
			$.re.apiAjax("GET", "guest/keyword/sellProduct", opts);
		},
		keywordAPI: function(opts) {
			$.re.apiAjax("GET", "keyword/sellProduct", opts);
		},
		guestSearchAPI: function(opts) {
			$.re.apiAjax("POST", "guest/search/sellProduct", opts);
		},
		searchAPI: function(opts) {
			$.re.apiAjax("POST", "search/sellProduct", opts);
		},
		guestSuggestAPI: function(opts) {
			$.re.apiAjax("GET", "guest/suggest/sellProduct", opts);
		},
		suggestAPI: function(opts) {
			$.re.apiAjax("GET", "suggest/sellProduct", opts);
		}
	}
	
})(api);