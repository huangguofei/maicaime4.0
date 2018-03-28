/**
 * author hgf
 * 空页面组件
 **/
Vue.component("empty-page", {
	template: "<div class=\"empty-page\" v-show=\"datas.isShow\">" +
		"<img :src=\"datas.src\" class=\"null-icon\">"+
		"<P>{{datas.info}}</p>"+
		"<a href=\"javascript:;\" class=\"go_btn\" v-if=\"datas.btn\" @click=\"datas.btn.callback\">{{datas.btn.str}}</a>"+
		"</div>",
	data: function() {
		return {

		}
	},
	props: ['datas'],
	created: function() {
	},
	methods: {
		
	}
})
