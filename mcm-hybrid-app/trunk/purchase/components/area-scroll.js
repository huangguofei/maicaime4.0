Vue.component("area-scroll", {
	template : '<div class="mui-scroll-wrapper mui-content">'+
					'<div class="mui-scroll"><slot></slot>'+
					'</div>'+
				'</div>',
	data : function() {
		return {
		}
	},
	created : function() {
		mui.plusReady(function() {
			var deceleration = mui.os.ios ? 0.003:0.0009;
			var scroller = mui(".mui-scroll-wrapper").scroll({
				 indicators: true, 
				 deceleration:deceleration,
				 bounce: true 
			});
			
		})
	},
	mounted : function() {
		/*mui.init({
			pullRefresh: {
				container: '#homeScroll',
				down: {
					style:'circle',
					callback: pulldownRefresh
				},
			}
		});
		function pulldownRefresh() {
			setTimeout(function() {
				mui('#homeScroll').pullRefresh().endPulldown();
				mui.toast("已刷新");
			}, 1500);
		}*/
	},
	methods : {
		
	}
})