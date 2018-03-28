/**
 * author hgf
 * 订单列表组件
 **/
Vue.component("order-list", {
	template: "<div class=\"item-list\"><div class=\"o-item\" v-for=\"(v,k) in orderData\">" +
		"<div class=\"item-head\" @click=\"goOrderDetails(v.sellOrderId)\">" +
		"<img src=\"../../img/shopcar_storeLogo.png\" class=\"pull-left\" />" +
		"<p class=\"o-shopname pull-left\">{{v.shop && v.shop.shopName}}</p>" +
		"<span class=\"o-state pull-right\">{{v.orderStatusText}}</span>" +
		"</div>" +
		"<div class=\"item-main padding\" @click=\"goOrderDetails(v.sellOrderId)\">" +
		"<ul>" +
		"<li v-for=\"(j,i) in v.products\">" +
		"<a href=\"javascript:;\"><img :src=\"j.productImage\" /><span class=\"goods-count\">{{j.productQuantity}}</span></a>" +
		"</li>" +
		"</ul>" +
		"<p class=\"o-count\">共{{v.products.length}}种食材，{{v.orderStatusId ==20?'需付款':v.orderStatusId ==35?'小计':'实际金额'}}：<span class=\"o-price\">¥{{v.totalAmount | PRICE}}</span></p>" +
		"</div>" +
		"<div class=\"item-fol padding\">" +
		"<a href=\"javascript:;\" v-show=\"v.orderStatusId==20\" class=\"cancel_btn\" @click=\"cancelOrder(v.sellOrderId)\">取消订单</a>" +
		"<a href=\"javascript:;\" v-show=\"v.orderStatusId==20\" @click=\"pay(v)\" class=\"pay_btn active\">去支付</a>" +
		"<a href=\"javascript:;\" v-show=\"v.orderStatusId!=20\" class=\"view_btn\" @click=\"goOrderDetails(v.sellOrderId)\">查看详情</a>" +
		"</div></div>" +
		"</div>",
	data: function() {
		return {

		}
	},
	props: ['orderData'],
	created: function() {},
	methods: {
		cancelOrder: function(id) {
			this.$emit("cancel", id);
		},
		goOrderDetails: function(id) {
			mcm.singleJumpPage("user-orderDetails", "../order/order-details.html", "订单详情", {
				orderId: id
			});
		},
		pay: function(data) {
			this.$emit('pay', data);
		}
	},
	filters: {
		PRICE: function(v) {
			if(v == "" || v == 0)
				return "0.00";
			v = Math.abs(v);
			if(v < 0.01) {
				return 0.01;
			}
			return(v * 100 / 100).toFixed(2);
		}
	}
})