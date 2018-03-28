Vue.component("add-cart", {
	template : '<span class="cart-wrap "  :class="prodNum > 0 ? \'cart-active\' : \'\'">'+
					'<span v-if="prodNum > 0">'+
						'<i class="minus c-i"  @click="editSkuNum(1)"></i>'+
						'<span class="num" @click="inputSkuNum">{{prodNum}}</span>'+
						'<i class="add c-i"  @click="editSkuNum(2)"></i>'+
					'</span>'+
					'<span class="notAdd" v-else  @click="editSkuNum(2)"></span>'+
				'</span>',
	data : function() {
		return {
			prodNum : 0,
			cacheNum : 0,
			keyboard: false
		}
	},
	props : {
		row: {
			type: Object,
			default: null
		},
		num: {
			type: Number,
			default: 0
		},
		type: {
			type: String,
			default: null
		},
		parabold: {
			type: Object,
			default: null
		}
	},
	created : function() {
	},
	mounted : function() {
		this.prodNum = this.num, that = this;
	},
	methods : {
		editSkuNum: function(state) {
			if(mcm.isLogin(true, '../login/login.html')){
				var num = this.prodNum;
				this.cacheNum = num;
				if(state == 1 && num >= 1) {
					--num; 
					this.saveCartNum(num);
				} else if(state == 2) {
					++ num;
					var target = event.target;
					this.saveCartNum(num, function() {
						window.$ref_parabold && window.$ref_parabold.drop(target)
					});
				}
				
			}
		},
		saveCartNum: function(num, callback) {
			var that = this;
			this.type === 'cart' ? api.cart.upadteNumAPI({
				data: {cartId: this.row.cartId, num: num},
				success: function(result) {
					callback && callback(event)
					that.prodNum = num;
					that.row.productQuantity = num;
					that.$emit("changeprodnum",  that.row, num);
				}
			}) : api.common.addCartAPI({
				data: {sellProductId: this.row.sellProductId, num: num},
				success: function(result) {
					callback && callback(event)
					that.prodNum = num;
					that.$emit("changeprodnum",  that.row, result);
				}
			});
		},
		inputSkuNum: function() {
			var thatwx = plus.webview.currentWebview();
			var pageId = thatwx.id, that = this;
			var wx = plus.webview.getWebviewById("numberKey");
			if(wx) {
				mui.fire(wx, 'openNumberKey', {
					pageId: pageId
				});
				setTimeout(function() {
					wx.show('slide-in-bottom');
				}, 100);
			} else {
				var url = ""
				if(pageId === 'HBuilder') {
					url = "view/common/number-key.html"
				} else {
					url = "../common/number-key.html"
				}
				mui.openWindow({
					url: url,
					id: "numberKey",
					styles: {
						"render": "always",
						"popGesture": "hide",
						background: "transparent"
					},
					show: {
						 aniShow: 'slide-in-bottom',
						 duration: 300
					},
					extras: {
						pageId: pageId
					}
				});
			}
			function updateNum(event) {
				var num = event.detail.num;
				that.saveCartNum(num)
			}
			document.addEventListener('keyUpdateNum', updateNum);
			//修改数量操作过快时，容易导致重复修改，故去清除原事件
			document.addEventListener('clearEvent', function() {
				document.removeEventListener('keyUpdateNum', updateNum);
			})
		}
	}
})