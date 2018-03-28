/**
 * author hgf
 * 弹窗组件
 **/
Vue.component("dialog-page", {
	template: "<div class=\"dialog\" v-show=\"datas.isShow\">" +
		"<div class=\"dialog_bg\"></div>" +
		"<div class=\"dialog_main\">" +
		"<img :src=\"datas.logoSrc\"/>" +
		//					"<slot></slot>"+
		"<h2>{{datas.title}}</h2>" +
		"<p>{{datas.info}}</p>" +
		"<button type=\"button\" class=\"dialog_btn\" @click=\"datas.yBtn.callback\">{{datas.yBtn.str?datas.yBtn.str:'是'}}</button>" +
		"<a href=\"javascript:;\" class=\"dialog_nobtn\" @click=\"datas.nBtn.callback\">{{datas.nBtn.str?datas.nBtn.str:'否'}}</a>" +
		"<a href=\"javascript:;\" class=\"dialog_off\" @click=\"datas.isShow=false\"><img src=\"../../img/shopcar_details_close1.png\"/></a>" +
		"</div>" +
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
/*参数格式*/
/*dialogData: {
	isShow: true,//是否显示弹窗
	title: '完善店铺信息',//弹窗标题
	info: "为方便购买食材，您大概需要花费 3～5分钟完善店铺信息，",//弹窗提示语
	logoSrc: '../../../img/login/home_info_remind.png',//弹窗头部图片地址
	yBtn: {
		str: "好的，去完善",//弹窗确认按钮文字，默认为：是
		callback: this.dialogY//弹窗确认事件
	},
	nBtn: {
		str: "不，稍后完善",//弹窗取消按钮文字，默认为：否
		callback: this.dialogN//弹窗取消事件
	}
}*/