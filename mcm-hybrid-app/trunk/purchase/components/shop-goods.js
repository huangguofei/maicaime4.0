Vue.component("shop-goods", {
	template : '<div class="shop-goods">'+
				'<div class="prod-area" id="prodArea">'+
					'<div class="left sub-category" id="subCategory">'+
			 			'<div class="mui-scroll-wrapper sub-category-scroll">'+
							'<div class="mui-scroll">'+
								'<ul>'+
									'<li class="item" '+
										'v-for="(s, index) in subcategory" '+ 
										':class="index === subActive ? \'active\' : \'\'" '+
										'@click="subCategoryActive(s.productCategoryId, index)"> '+
										'<span>{{s.categoryName}}</span>'+
									'</li>'+
								'</ul>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="right prod-list">'+
						'<div class="r-con">'+
							'<div class="condition" id="condition">'+
			 					'<div class="wrap">'+
			 						'<div class="c-l active"><span>综合排序<i class="icon"></i></span></div>'+
			 						'<div class="c-r" :class="{active:threeactive}" @click="filtrateCategory"><span>筛选<i class="icon"></i></span></div>'+
			 					'</div>'+
			 				'</div>'+
			 				'<div class="items" id="items">'+
									'<scroller :on-refresh="refresh" snappingHeight="30" :on-infinite="infinite" ref="scroller">'+
										'<div class="prod-item" v-for="p in prodlist" >'+
											'<div class="p-con">'+
												'<div class="wrap">'+
													'<i class="p-img" @click="jumpDetail(p)">'+
														'<img :src="p.mainImage" alt="" />'+
													'</i>'+
													'<div class="p-info">'+
														'<p class="name" @click="jumpDetail">{{p.productName}}</p>'+
														'<p class="sku" v-if="p.sellProductTypeId == 1"><span>{{p.settleUnit}} </span><span>¥{{p.sellPrice}}</span></p>'+
														'<span class="price" v-if="p.sellProductTypeId != 1">¥10/斤</span>'+
														'<span class="price" v-else>¥{{p.sellPrice}}/斤</span>'+
														'<span class="select-sku" v-if="p.sellProductTypeId != 1" @click="skuSelect(p)">'+
															'<span>{{p.show ? "收起" : "选规格"}}</span>'+
														'</span>'+
														'<add-cart v-else :row="p" :num="p.productQuantity" class="cart" @changeprodnum="changeProdNum"></add-cart>'+
														'<i class="add-often" @click="oftenEvent(p)"><i :class="{active:p.often}"></i></i>'+
													'</div>'+
												'</div>'+
											'</div>'+
											'<div class="sku-area" v-if="p.sellProductTypeId == 2 && p.show">'+
												'<div class="s-item" v-for="s in p.products">'+
													'<p class="sku"><span>{{s.specName}} </span><span>¥{{s.sellPrice}}</span></p>'+
													'<span class="price">¥{{s.sellPrice}}/斤</span>'+
													'<add-cart :row="s" :num="0" class="cart" ></add-cart>'+
												'</div>'+
											'</div>'+
										'</div>'+
										'</scroller>'+
									'</div>'+
								'</div>'+
					 		'</div>'+
						'</div>'+
					'</div>',
	data : function() {
		return {
			subActive: 0
		}
	},
	props: {
		subcategory: {
			type: Array,
			default: null
		},
		prodlist: {
			type: Array,
			default: null
		},
		quotepage: {
			type: String,
			default: null
		},
		threecategorys: {
			type: Array,
			default: []
		},
		threeactive: {
			type: Boolean,
			default: false
		}
	},
	created : function() {
		mui.plusReady(function() {
 	 		var deceleration = mui.os.ios ? 0.003:0.0009;
 	 		var scrolls = ['.sub-category-scroll', '.prod-scroll-wrapper'];
 	 		mui.each(scrolls,  function(k, val) {
 	 			mui(val).scroll({
					 scrollY: true, 
					 scrollX: false, 
					 startX: 0, 
					 startY: 0, 
					 indicators: true, 
					 deceleration:deceleration,
					 bounce: true 
				});
 	 		});
 	 		mui(".category-nar-scroll").scroll({
				 indicators: true, 
				 deceleration:deceleration,
				 bounce: true 
			}); 
 	 	});
	},
	mounted : function() {

	},
	methods : {
		subCategoryActive: function(productCategoryId, index) {
			this.subActive = index;
			this.threecategorys = this.subcategory[index].childrenList;
			this.$emit("selectsubcategory", {
				productCategoryId: productCategoryId,
				index: index
			})
		},
		skuSelect: function(item) {
			item.show = !item.show;
		},
		oftenEvent: function(item) {
			var data = {sellProductId: item.sellProductId}
			if(mcm.isLogin(true, '../login/login.html')) {
				item.often ? api.common.delOftenAPI({
					data: data, 
					success: function(result) {
						item.often = false;
					}
				}) : api.common.addOftenAPI({
					data: data,
					success: function(result) {
						item.often = true;
					}
				});
			}
		},
		jumpDetail: function(prod) {
			var webview = plus.webview.getWebviewById("shopDetail");
			if(!webview) {
				webview = mui.openWindow({
				    url:"detail.html",
				    id:"shopDetail",
				    styles:{
			    		"render": "always",
            			"popGesture": "hide",
				    },
				    extras : {
				    	"sellProductId": prod.sellProductId
				    }
				});
				webview.addEventListener('close',function(){
					webview=null;
				},false);
			} else {
				mui.fire(webview, "loadProdDetail", {
					"sellProductId": prod.sellProductId
				})
				setTimeout(function() {
					webview.show("slide-in-right",300);
				}, 100)
			}
		},
		refresh: function() {
			var that = this;
			setTimeout(function() {
			that.$refs.scroller.finishPullToRefresh();
			}, 1500);
		},
		infinite: function(done) {
			var that = this;
			setTimeout(function() {
				 //self.noData = "没有更多数据"
				that.$refs.scroller.finishInfinite(2);
				//done();
			}, 1500);
		},
		initSubCategoryActive: function(){
			this.subActive = 0;
		},
		changeProdNum: function(row, num) {
			if(this.quotepage === "category") {
				this.$emit("addcartsuccess")
			}
		},
		filtrateCategory: function() {
			var that = this;
			var ws  = plus.webview.getWebviewById("threeCategory");
			if(ws) {
				mui.fire(ws, 'setThreeCategoryData', {
					threeCategorys: that.threecategorys
				})
				ws.show('slide-in-right');
			} else {
				mui.openWindow({
					url: "../common/three-category.html",
					id: "threeCategory",
					styles: {
						background: "transparent"
					},
					extras: {
						threeCategorys: that.threecategorys
					}
				});
			}
		}
	}
})