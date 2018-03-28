/**
 * author pzh 
 * day    2018-3-9
 * 设置模块接口
 */
export const accountAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'setting/account/list', v)),
	saveAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/save', v)),
	enableAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/enable', v)),
	disableAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/disable', v)),
	updateRoleAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/updateRole', v))
}
/**
 *角色
 */
export const roleAPI = {
	roleListAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'setting/role/list', v))
}
/**
 *业务设置
 */
export const businessAPI = {
	defaultDeductionAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'businessSetting/salesPoint/list/default', v)),
	customDeductionAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'businessSetting/salesPoint/list/custom', v)),
	clientAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'businessSetting/customerProfile/list', v)),
	advertisingAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'businessSetting/buyerAdvertising', v)),
	advertisingEditAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'businessSetting/buyerAdvertising/update', v)),
	advertisingSaveAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'businessSetting/buyerAdvertising/save', v))
}

/**
 *个人设置
 */
export const userAPI = {
	userInfoAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'user/get', v)),
	userInfoEditAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'user/updateUserBaseInfo', v)),
	userInfoEditPswAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'updatePassword', v))
}

/**
 *公司设置
 */
export const companyAPI = {
	companyInfoAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'setting/company/company/get', v)),
	companySetAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'setting/company/company/update', v))
}