/**
 * author pzh
 * 支付方式组件
 **/
Vue.component("payment-type", {
	template : '<div class="fixed-pay" v-if="payshow">'+
				'<div class="pay-content">'+
					'<div class="header">'+
						'付款方式<span class="close" @click="close"></span>'+
					'</div>'+
					'<div class="pay-con">'+
						'<div class="item balance">'+
							'<i class="pay-icon">'+
								'<img src="../../img/shopcar_details_pay_yue.png" alt="" />'+
							'</i>'+
							'<div class="info">'+
								'<p class="title">余额支付</p>'+
								'<p class="val">可用余额：¥0.00</p>'+
							'</div>'+
							'<i class="check" :class="{active:active == 1}" @click="selectPay(1)"></i>'+
						'</div>'+
						'<div class="item alipay">'+
							'<i class="pay-icon">'+
								'<img src="../../img/shopcar_details_pay_alipay.png" alt="" />'+
							'</i>'+
							'<div class="info">'+
								'<p class="title">支付宝支付</p>'+
							'</div>'+
							'<i class="check"  :class="{active:active == 2}" @click="selectPay(2)"></i>'+
						'</div>'+
						'<div class="item weixin">'+
							'<i class="pay-icon">'+
								'<img src="../../img/shopcar_details_pay_wecaht.png" alt="" />'+
							'</i>'+
							'<div class="info">'+
								'<p class="title">微信支付</p>'+
							'</div>'+
							'<i class="check"  :class="{active:active == 3}"  @click="selectPay(3)"></i>'+
						'</div>'+
						'<button class="btn btn-pay" @click="confimPay">确定支付</button>'+
					'</div>'+
				'</div>'+
			'</div>',
	data : function() {
		return {
			payshow: false,
			mask : null,
			active: 1
		}
	},
	created : function() {
	},
	methods : {
		close: function() {
			this.payshow = false;
			this.mask.close();
		},
		show: function() {
			var that = this;
			that.payshow = true;
			that.mask = mui.createMask(function() {
				that.payshow = false;
			});
			setTimeout(function() {
				that.mask.show();
			}, 10);
		},
		selectPay: function(index) {
			this.active = index;
		},
		confimPay: function() {
			mui.toast("正在维护中!");
		}
	}
})