/**
 * author hgf
 * 页面头部返回上一页组件
 **/
Vue.component("back-page", {
	template: "<div class=\"back-page padding\">" +
		"<a class=\"pull-left\" href=\"javascript:;\" @click=\"back\"><img src=\"../../../img/login/arrow_normals.png\" /></a>" +
		"<h1>{{datas.title}}</h1>" +
		"<slot></slot>" +
		"</div>",
	data: function() {
		return {

		}
	},
	props: ['datas'],
	created: function() {
	},
	methods: {
		back: function() {
			mui.back();
		}
	}
})
/*参数格式*/
/*Data: {
	title: '完善店铺信息',//标题
}*/