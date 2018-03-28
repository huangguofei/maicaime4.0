/**
 * author hgf
 * 订单地图显示组件
 **/
Vue.component("order-map", {
	template: "<div class=\"map\">" +
		"<div class=\"map-box\" id=\"map\"></div>" +
		"<transition name=\"fade\">" +
		"<div class=\"order-list\">" +
		"<a href=\"javascript:;\" class=\"hide-icon\" @click=\"zoom\"><img src=\"../../img/order-icon.png\" /></a>" +
		"<div class=\"map-list padding\">" +
		"<div class=\"map-head\">" +
		"<img src=\"../../img/mine_headimage.png\" class=\"pull-left\" />" +
		"<div class=\"order-info pull-left\">" +
		"<h3>志飞家超市<span class=\"distance\">12.80km</span></h3>" +
		"<p class=\"order-address\">地址：湖南省株洲里面拐个弯就到了</p>" +
		"</div>" +
		"<a href=\"javascript:;\" class=\"map-gps pull-right\"><img src=\"../../img/list_Navigation.png\" /></a>" +
		"</div>" +
		"<div class=\"map-footer\">" +
		"<a href=\"javascript:;\" class=\"view-btn\">查看详情</a>" +
		"<a href=\"javascript:;\" class=\"sure-btn btn-default\">确认送达</a>" +
		"</div>" +
		"</div>" +
		"</div>" +
		"</transition>" +
		"</div>" +
		"</div>",
	data: function() {
		return {
			isPage: true
		}
	},
	props: ['datas'],
	created: function() {
		this.loadJScript();
	},
	methods: {
		zoom: function() {
			var dom = document.getElementsByClassName('order-list')[0];
			var hei = dom.offsetHeight;
			if(this.isPage) {
				dom.style.bottom = "-" + (hei - 24) + "px";
			} else {
				dom.style.bottom = 0;
			}
			this.isPage = !this.isPage;
		},
		loadJScript: function() {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "http://api.map.baidu.com/api?v=2.0&ak=tBjsnSuzhKrdsAL1oqEQ1hIG&callback=init";
			document.body.appendChild(script);
		}
	}
});

function init() {
	var map = new BMap.Map("map"); // 创建Map实例
	map.centerAndZoom("深圳", 12);
	map.enableScrollWheelZoom(); //启用滚轮放大缩小
	// 添加定位控件
	var geolocationControl = new BMap.GeolocationControl();
	geolocationControl.addEventListener("locationSuccess", function(e) {
		// 定位成功事件
		var address = '';
		address += e.addressComponent.province;
		address += e.addressComponent.city;
		address += e.addressComponent.district;
		address += e.addressComponent.street;
		address += e.addressComponent.streetNumber;
		var nowAddress = {
			str: address,
			log: e.point.lng,
			lat: e.point.lat
		}
		vm.addressData = [nowAddress];
		localSearch(e.point.lng, e.point.lat)
	});
	geolocationControl.addEventListener("locationError", function(e) {
		// 定位失败事件
		alert(e.message);
	});
	map.addControl(geolocationControl);
}