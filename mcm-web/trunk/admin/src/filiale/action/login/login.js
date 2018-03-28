/**
 * author pzh 
 * day    2018-3-6
 * 登录模块业务JS脚本
 */
import { loginAPI } from '@f/api/login'
export default function loginAction (vm) {
	return {
		loginInfo: (data) => {
			loginAPI.loginAPI(data, (result) => {
				var userInfo = {
					token: result.token,
					realName: result.realName,
					companyName: result.companyName
				}
				cJs.setCookie(fCommon.config.USERINFO, JSON.stringify(userInfo))
				var userRights = result.userRights
				localStorage.setItem(fCommon.config.USERRIGHTS, JSON.stringify(userRights)) 
				vm.$router.push({
					name: 'filiale.index'
				})
			})
		},
		logout: (data) => {
			loginAPI.logoutAPI((result) => {
				cJs.delCookie(fCommon.config.USERINFO)
				localStorage.removeItem(fCommon.config.USERRIGHTS)
				vm.$router.push({
					name: 'filiale.login'
				})
			})
		}
	}
}