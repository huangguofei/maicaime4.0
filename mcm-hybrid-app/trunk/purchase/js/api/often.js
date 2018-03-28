/*
 * author pzh
 * 常用清单模块接口
 * date 2018-3-3
 * */
(function($) {
	const PR = "collect/";
	$.often = {
		delAPI: function(opts) {
			$.re.apiAjax("POST", PR + "delByCollectId", opts);
		},
		listAPI: function(opts) {
			$.re.apiAjax("GET", PR + "list", opts);
		},
		addAPI: function(opts) {
			$.re.apiAjax("POST", PR + "save", opts);
		}
	}
})(api);