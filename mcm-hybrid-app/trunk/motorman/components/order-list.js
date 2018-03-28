/**
 * author hgf
 * 订单列表组件
 **/
Vue.component("order-list", {
	template: "<div class=\"order-list\"><div class=\"item padding\" v-for=\"(v, k) in datas\" :key=\"k\">" +
		"<div class=\"item-head go-details\" :oid=\"v.deliveryOrderId\" @click='barcodeGoods(v)'>" +
		"<!--<img :src=\"../../img/mine_headimage.png\" class=\"pull-left\" />-->" +
		"<div class=\"shop-info\">" +
		"<h2>{{v.receiverName}}</h2>" +
		"<p class=\"ellipsis\">地址：{{v.receiverAddr}}</p>" +
		"</div>" +
		"<span class=\"distance\">{{v.distance/1000}}km</span>" +
		"</div>" +
		"<div class=\"item-main\">" +
		"<div class=\"o-info pull-left go-details\" :oid=\"v.deliveryOrderId\">" +
		"<p><i></i>食材品类：{{v.productCount}}</p>" +
		"<p><i></i>送达时间：{{v.deliveryEndTime?v.deliveryEndTime+'之前':'尽快送达'}}</p>" +
		"</div>" +
		"<a href=\"javascript:;\" @click='call(v.receiverMobile)' class=\"call pull-right\"><img src=\"../../img/list_tele.png\" /></a>" +
		"<a href=\"javascript:;\" class=\"gps pull-right\"  @click='navigationMap(v)' v-show=\"v.statusId==40\"><img src=\"../../img/list_Navigation.png\" /></a>" +
		"</div>" +
		"<div class=\"item-footer\">" +
		"<button type=\"button\" class=\"sub_btn btn-default confirm-btn\" @click='confirmDelivery(v, k)' v-show=\"v.statusId==40\">确认送达{{(v.deliveryWayId==300 && v.receivableAmount > 0)?(' 需收款：¥'+(v.receivableAmount * 1).toFixed(2)):''}}</button>" +
		"<button type=\"button\" class=\"sub_btn btn-default\" v-show=\"v.statusId==30\" @click='barcodeGoods(v)'>进详情扫码取货</button>" +
		"</div>" +
		"</div></div>",
	data: function() {
		return {
			position: {}
		}
	},
	props: ['datas'],
	created: function() {
		var that = this;
		mui.plusReady(function() {
			plus.geolocation.getCurrentPosition(function(a) {
				var coords = a.coords;
				that.position = {
					latitude: coords.latitude,
					longitude: coords.longitude
				}
			}, function(e) {
				//				alert('Geolocation error: ' + e.message);
			});
		})
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
	},
	methods: {
		barcodeGoods: function(item) {
			mcm.singleJumpPage("details", "../order/order-details.html", "订单详情", {
				orderId: item.deliveryOrderId
			});
		},
		navigationMap: function(item) {
			var src = new plus.maps.Point(this.position.longitude, this.position.latitude);
			var dst = new plus.maps.Point(item.longitude, item.latitude);
			plus.maps.openSysMap(dst, item.receiverAddr, src);
		},
		call: function(phone) {
			var btnArray = ['拨打', '取消'];
			mui.confirm('是否拨打' + phone + '?', '提示', btnArray, function(e) {
				if(e.index == 0) {
					plus.device.dial(phone, false);
				}
			});
		},
		confirmDelivery: function(item, k) {
			var that = this;

			function submitDelivery(data) {
				api.order.orderConfirmArrive({
					data: data,
					success: function(result) {
						mui.toast("确认送达成功");
						that.datas.splice(k, 1)
					}
				})
			}
			if(item.deliveryWayId == 300) {
				mui.prompt("请输入收款金额", "收款金额", "确认收货", ["确认收货", "取消"], function(e) {
					if(e.index == 0) {
						var val = e.value;
						if(mcm.validation.checkPrice(val)) {
							submitDelivery({
								deliveryOrderId: item.deliveryOrderId,
								amount: val
							});
						} else {
							mui.toast('输入的金额格式不对')
						}
					}
				}, 'div');
			} else {
				submitDelivery({
					deliveryOrderId: item.deliveryOrderId
				})
			}

		}
	}
})