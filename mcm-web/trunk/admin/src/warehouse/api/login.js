/**
 * author pzh 
 * day    2018-3-6
 * 登录模块接口
 */
 export const loginAPI = {
 	loginAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'guest/login', v)),
 	logoutAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'user/logout', v))
 }
