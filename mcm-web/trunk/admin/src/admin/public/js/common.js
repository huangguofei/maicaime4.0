/**
 * author pzh 
 * day    2018-3-6
 * 分公司公共JS脚本
 */
import commAjax from '@/common/js/ajax.js'
import config from './config.js'
window.aCommon = null
aCommon = ((window) => {
	var $ = function () {}

	$.ajax = (opts, type) => {
		let userInfo = cJs.getCookie(config.USERINFO)
		try {
			userInfo = JSON.parse(userInfo)
			opts.header['token'] = userInfo.token
		} catch (e) {}
		opts ? (() => {
			opts.system = config.SYSTEM
			opts.login = () => {
				console.log('总部未登录')
			}
			commAjax(opts, type)
		})() : null
	}
	$.config = config
	return $
})(window)