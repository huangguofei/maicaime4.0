/**
 * author pzh 
 * day    2018-3-9
 * 设置模块接口
 */
export const accountAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'setting/account/list', v)),
	saveAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/save', v)),
	enableAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/enable', v)),
	disableAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/disable', v)),
	updateRoleAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'setting/account/updateRole', v))
}
/**
 *角色
 */
export const roleAPI = {
	roleListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'setting/role/list', v))
}
/**
 *个人设置
 */
export const userAPI = {
	userInfoAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'user/get', v)),
	userInfoEditAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'user/updateUserBaseInfo', v)),
	userInfoEditPswAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'updatePassword', v))
}

/**
 *仓库设置
 */
export const warehouseAPI = {
	warehouseInfoAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'setting/warehouse/get', v))
}