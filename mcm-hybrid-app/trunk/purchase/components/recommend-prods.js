/**
 * author pzh
 * 推荐商品组件
 **/
Vue.component("recommend-prods", {
	template : '<div class="recommend-prods">'+
					'<div class="item" v-for="p in recommprodlist">'+
						'<div class="item-con">'+
							'<div class="area">'+
								'<div class="p-img" @click="jumpDetail(p)">'+
									'<img :src="p.mainImage" alt="" />'+
								'</div>'+
								'<div class="info" @click="jumpDetail(p)">'+
									'<p class="p-name">{{p.productName}}</p>'+
									'<p class="sku-info" ><span>{{p.sellUnit}}</span><span>¥{{p.sellPrice.toFixed(2)}}</span></p>'+
								'</div>'+
								'<div class="event">'+
									'<span class="price" >¥{{(p.sellPrice/p.matrixingMultiple) < 0.01 ? 0.01 : (p.sellPrice/p.matrixingMultiple).toFixed(2)}}/{{p.settleUnit}}</span>'+
									'<add-cart :row="p" :num="p.productQuantity" class="cart" @changeprodnum="changeProdNum"></add-cart>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',
	data : function() {
		return {
		}
	},
	props: {
		recommprodlist: {
			type: Array,
			default: null
		},
		type: {
			type: String,
			default: null
		}
	},
	created : function() {
	},
	methods : {
		changeProdNum: function() {
			var current = plus.webview.currentWebview();
			if(current.id === 'shopDetail') {
				var ws = plus.webview.getWebviewById('detailFooter');
				ws && (function() {
					mui.fire(ws, 'anewLoadData')
				})()
			}
		},
		jumpDetail: function(item) {
			if(this.type === 'jump') {
				var sellProductId = item.parentId ? item.parentId : item.sellProductId;
				var webview = plus.webview.getWebviewById("shopDetail");
				if(!webview) {
					webview = mui.openWindow({
					    url:"./view/shop/detail.html",
					    id:"shopDetail",
					    styles:{
				    		"render": "always",
	            			"popGesture": "hide",
					    },
					    extras : {
					    	"sellProductId": sellProductId
					    }
					});
					webview.addEventListener('close',function(){
						webview=null;
					},false);
				} else {
					mui.fire(webview, "loadProdDetail", {
						"sellProductId": sellProductId
					})
					setTimeout(function() {
						webview.show("slide-in-right",300);
					}, 100)
				}
			}
		}
	}
})