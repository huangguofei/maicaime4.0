/**
 * author pzh
 * date 2018-2-20 16:50
 * 公共脚本
 */
export default {
	/**
	 *创建和存储 cookie
	 */
	setCookie (name, value, Days) {
		Days = Days ? Days : 60 
		var exp = new Date()
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
		document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
	},
	/**
	 *读cookie
	 */
	getCookie (name) {
		var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
		if(arr != null) return unescape(arr[2])
		return null
	},
	/**
	 *清除cookie
	 */
	delCookie: (name, path) => { 
	    var exp = new Date()
	    exp.setTime(exp.getTime() - 1)
	    var cval = cJs.getCookie(name)
	    path = path ? path : ''
	    var paths = ';path/' + path
	    if(cval !== null) {
    		document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + paths
	    }
	},
	/**
	 *api接口处理参数
	 */
	apiDataReturnParams (type, url, params) {
		var apiData = {
			method: type ? type : 'get',
			url: url
		}
		if(typeof params[0] === 'function') {
			apiData.success = params[0]
			if(params[1]) {
				apiData.error = params[1]
			}
		} else {
			apiData.params = params[0]
			apiData.success = params[1]
			if(params[2]) {
				apiData.error = params[2]
			}
		}
		return apiData
	},
	/**
	 *图片类型和大小
	 */
	upLoadImgSize (file) {
		var isJPG = false
  		if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
  			isJPG = true
  		}
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,PNG,GIT 格式!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
	},
	checkPrice (price) {
		var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if(reg.test(price)) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 *清理json空字段
	 *data {}
	 */
	clearNullField (data) {
		var json = {}
		if(typeof data === 'object') {
			for (var k in data) {
				k && data[k] && (json[k] = data[k])
			}
		}
		return json
	}
}