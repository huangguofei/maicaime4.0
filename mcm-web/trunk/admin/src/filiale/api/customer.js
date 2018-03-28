/**
 * author hgf
 * day    2018-3-7
 * 商户中心模块接口
 */
/**
 *商户
 */
export const purchaserAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'buyer/list', v)),
	detailsAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'buyer/get', v)),
	activeAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'buyer/active', v)),
	auditAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'buyer/audit', v)),
	disabledAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'buyer/updateStatus', v))
	
}
/**
 *供应商
 */
export const supplierAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'supplier/list', v)),
	detailsAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'supplier/get', v)),
	auditAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'supplier/audit', v)),
	activeAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'supplier/updateStatus', v)),
	setClassAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'supplier/distributionCategory', v)),
	setGoodsAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'supplier/distributionSkuProd', v)),
	supplierClassAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'supplier/supplierCategory', v)),
	supplierGoodsAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'supplier/supplierSkuProdList', v))
}
/**
 *司机
 */
export const driverAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'driver/list', v)),
	detailsAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'driver/get', v)),
	activeAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'driver/active', v)),
	auditAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'driver/audit', v)),
	disabledAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'driver/updateStatus', v))
}
/**
 *中心仓
 */
export const warehouseAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'warehouse/list', v)),
	detailsAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'warehouse/get', v))
}
/**
 *黑名单
 */
/**
 *export const supplierAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/list', v)),
	addAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProd/save', v)),
	editAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProd/update', v)),
	detailAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/', v))
}
*/
/**
 *客户群体
 */
export const clientGroupAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'businessSetting/customerProfile/list', v))
}