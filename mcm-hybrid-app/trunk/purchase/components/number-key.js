Vue.component("number-key", {
	template : '<div class="number-input" id="numberInputKey">'+
					'<div class="back" @click="cancel"></div>'+
					'<div class="num-con">'+
						'<div class="show-num" v-if="!count">输入购买数量</div>'+
						'<div class="show-num count" v-else>{{count}}<span class="clear" @click="clear"></span></div>'+
						'<div class="keyboard" >'+
							'<div class="num-item" v-for="m in 3">'+
								'<span v-for="n in 3" class="num">'+
									'<span v-if="m == 1" @click="keyDownNum(n)">{{n}}</span>'+
									'<span v-else-if="m == 2" @click="keyDownNum(n + 3)">{{n + 3}}</span>'+
									'<span v-else @click="keyDownNum(n + 6)">{{n + 6}}</span>'+
								'</span>'+
							'</div>'+
							'<div class="num-item">'+
								'<span class="num canel"><span @click="cancel">取消</span></span>'+
								'<span class="num"><span @click="keyDownNum(0)">0</span></span>'+
								'<span class="num confim"><span @click="confim">确定</span></span>'+
							'</div>'+
						'</div>'+
					'</div>'+
			'</div>',
	data : function() {
		return {
			count: ''
		}
	},
	created : function() {
	},
	mounted : function() {
	},
	methods : {
		keyDownNum : function(num) {
			this.count += '' + num;
		},
		cancel: function() {
			var keyNum = document.getElementById("numberInputKey");
			keyNum.style.display = "none";
			this.count = '';
		},
		clear: function() {
			this.count = '';
		},
		confim: function() {
			if(this.count === '') return;
			window.keyUpdateNum(this.count)
		}
	}
})