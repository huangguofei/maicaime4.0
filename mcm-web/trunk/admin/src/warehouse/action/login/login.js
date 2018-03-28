/**
 * author pzh 
 * day    2018-3-6
 * 登录模块业务JS脚本
 */
import { loginAPI } from '@w/api/login'
export default function loginAction (vm) {
	return {
		loginInfo: (data) => {
			loginAPI.loginAPI(data, (result) => {
				var userInfo = {
					token: result.token,
					realName: result.realName,
					companyName: result.warehouseName
				}
				cJs.setCookie(wCommon.config.USERINFO, JSON.stringify(userInfo))
				var userRights = result.userRights
				localStorage.setItem(wCommon.config.USERRIGHTS, JSON.stringify(userRights)) 
				vm.$router.push({
					name: 'warehouse.index'
				})
			})
		},
		logout: () => {
			loginAPI.logoutAPI((result) => {
				cJs.delCookie(wCommon.config.USERINFO);
				vm.$router.push({
					name: 'warehouse.login'
				})
			})
		}
	}
}