/**
 * author pzh
 * 推荐商品组件
 **/
Vue.component("category-nar", {
	template : '<div class="category-nar" id="categoryNar">'+
					'<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted category-nar-scroll" ><div class="mui-scroll">'+
							'<a href="javascript:void(0)"  class="item" '+
							'	v-for="(n, index) in categorys" '+
							'	:class="categoryActive === index ? \'active\' : \'\'"'+
							'	@click="switchCategory(index)"><span>{{n.categoryName}}</span></a>'+
						'</div></div>'+
				'</div>',
	data : function() {
		return {
			categoryActive: 0
		}
	},
	props: {
		categorys: {
			type: Array,
			default: null
		},
		selectCategoryId: {
			type: String,
			default: null
		}
	},
	created : function() {
	},
	mounted: function() {
		this.initCategoryScorll()
	},
	methods : {
		switchCategory: function(index) {
			if(this.categoryActive != index) {
				this.categoryActive = index;
				this.$emit("selectcategory", {
					active: index
				});
			}
		},
		defaultCategoryActive: function(index) {
			this.categoryActive = index
		},
		initCategoryScorll: function() {
			mui.plusReady(function() {
	 	 		var deceleration = mui.os.ios ? 0.003 : 0.0009;
 	 			mui('.mui-scroll-wrapper').scroll({
					deceleration: deceleration
				});
	 	 	});
		}
	}
})