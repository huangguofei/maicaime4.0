Vue.component("upgrade-package", {
	template : '<div class="upgrade-package" v-if="show">'+
				'<div class="content">'+
					'<div class="close"><img src="../../img/shengji_close@3x.png" alt="" @click="show=false" v-if="!info.forceUpdate" /></div>'+
					'<img src="../../img/upgrade-icon.png" class="icon" alt="" />'+
					'<div class="info">'+
						'<h4 class="h-head">升级到新版本<span class="v">v{{info.versionName}}</span></h4>'+
						'<div class="desc" v-html="info.description">'+
						'</div>'+
						'<div class="event">'+
							'<button class="btn-upgrade" @click="upgradePackage">立即升级</button>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',
	data : function() {
		return {
			show: false,
			info: {}
		}
	},
	created : function() {
		var that = this;
		mui.plusReady(function() {
			var app = null;
			if(mui.os.android) {
				app = 'ANDROID'
			} else if(mui.os.ios) {
				app= 'IOS'
			} else {
				return false;
			}
			api.common.checkUpdateAPI({
				data: {
					appVersionPlatform: app,
					appVersionType: 'DRIVER'
				},
				success: function(result) {
					if(result && result.versionCode > mcm.config.VERSIONCODE) {
						that.info = result;
						setTimeout(function() {
							that.show = true;
						}, 500)
					} else {
						that.show = false;
					}
				}
			})
		})
		
	},
	mounted : function() {
	},
	methods : {
		upgradePackage: function() {
			var that = this;
			var url = this.info.downloadUrl;
			if(url) {
				if(mui.os.android) {
					var wgtWaiting = plus.nativeUI.showWaiting("开始下载")
					var dtask = plus.downloader.createDownload( url, {}, function ( d, status ) {
						plus.nativeUI.closeWaiting();
					    if(status == 200 ) { 
					    	that.show = false;
					        var path = d.filename;
					        wgtWaiting.setTitle("开始安装");
					        that.install(path);
					    } else {
					        mui.alert(status); 
					    }  
					    plus.downloader.clear(dtask);
					});
					dtask.addEventListener("statechanged", function (download, status) {
				        switch (download.state) {
				            case 2:
				                wgtWaiting.setTitle("已连接到服务器");
				                break;
				            case 3:
				                var percent = download.downloadedSize / download.totalSize * 100;
				                wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
				                break;
				            case 4:
				                wgtWaiting.setTitle("下载完成");
				                break;
				        }
				    });
					dtask.start(); 
				} else if(mui.os.ios) {
					plus.runtime.openURL(url);
				} else {
					mui.toast('未知设备！')
					return false;
				}
			} else {
				mui.toast('应用升级失败！')
				that.show = false;
			}
		},
		install: function(path) {
			 plus.runtime.install(path, {}, function (wgtinfo) {
		        plus.nativeUI.close();
		        mui.alert("升级完成，须重启应用！", function () {
		            plus.runtime.restart();
		        });
		    }, function (error) {
		        plus.nativeUI.close();
		        mui.alert("应用升级失败！\n" + error.message);
		    });
		}
	}
})