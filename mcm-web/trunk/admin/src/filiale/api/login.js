/**
 * author pzh 
 * day    2018-3-6
 * 登录模块接口
 */
 export const loginAPI = {
 	loginAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'guest/login', v)),
 	logoutAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'user/logout', v))
 }
