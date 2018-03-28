/**
 * author hgf
 * day    2018-3-7
 * 商户中心模块接口
 */
/**
 *商户
 */
export const purchaserAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'buyer/list', v)),
	detailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'buyer/get', v))
}
/**
 *供应商
 */
export const supplierAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'supplier/list', v)),
	supplierGoodsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'supplier/skuProdBySupplier', v))
}
/**
 *司机
 */
export const driverAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'driver/list', v)),
	detailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'driver/get', v))
}