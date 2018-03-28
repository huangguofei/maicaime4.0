/**
 * author pzh 
 * day    2018-3-6
 * 分公司公共JS脚本
 */
import commAjax from '@/common/js/ajax.js'
import config from './config.js'
window.fCommon = null
fCommon = ((window) => {
	var $ = function () {}

	$.ajax = (opts, type) => {
		let userInfo = cJs.getCookie(config.USERINFO)
		try {
			userInfo = JSON.parse(userInfo)
			opts.header = {}
			opts.header['token'] = userInfo.token
		} catch (e) {}
		opts.url = config.PREFIXAPI + opts.url
		opts ? (() => {
			opts.system = config.SYSTEM
			opts.login = () => {
				window.location.href = '/filiale/login'
			}
			commAjax(opts, type)
		})() : null
	}
	$.config = config
	return $
})(window)