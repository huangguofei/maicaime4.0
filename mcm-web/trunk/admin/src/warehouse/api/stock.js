/**
 * author pzh 
 * day    2018-3-12
 * 进货模块接口
 */
/**
*采购单
*/
export const purchaseAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'purchaseOrder/list', v)),
	detailAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'purchaseOrder/get', v))
}
/**
*入库单
*/
export const storageAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'stockIn/list', v)),
	detailAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'stockIn/get', v)),
	saveAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'stockIn/save', v)),
	skuProdAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'supplier/skuProdBySupplier', v))
}