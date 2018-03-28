/**
 * author hgf
 * 取消订单弹窗组件
 **/
Vue.component("cancel-page", {
	template: "<div class=\"cancel-page\" v-show=\"datas.isShow\">" +
		"<div class=\"bg\" @click=\"datas.isShow=false\"></div>" +
		"<div class=\"page-main padding\">" +
		"<div class=\"head\">取消订单" +
		"<img src=\"../../img/shopcar_details_pay_close.png\" @click=\"datas.isShow=false\"/>" +
		"</div>" +
		"<p class=\"remark\">温馨提醒：订单一旦取消，无法恢复</p>" +
		"<p class=\"title\">取消原因：</p>" +
		"<div class=\"item\" v-for=\"(v,i) in cancelList\" @click=\"active=i\">" +
		"<img src=\"../../img/shopcar_chosen.png\" v-if=\"active==i\" /><img v-else src=\"../../img/shopcar_unchoose.png\" /> {{v}}" +
		"</div>" +
		"<button type=\"button\" @click=\"subEvent\" class=\"sub_btn\">提交</button>" +
		"</div>" +
		"</div>",
	data: function() {
		return {
			cancelList:['我不想买了','操作有误','重复下单','预计不能按时送达','其他个人原因'],
			active:0	
		}
	},
	props: ['datas'],
	created: function() {},
	methods: {
		subEvent:function(){
			this.$emit("cancelorder",this.cancelList[this.active]);
		}
	},
	watch: {
		'datas.isShow': function(v, ov) {
			if(ov) {
				document.getElementById("vueBox").style.overflowY = "auto";
				document.getElementById("vueBox").style.height = "auto";
			} else {
				document.getElementById("vueBox").style.overflowY = "hidden";
				document.getElementById("vueBox").style.height = "100%";
				document.getElementById("vueBox").style.boxSizing = "border-box";

			}
		}
	}
})