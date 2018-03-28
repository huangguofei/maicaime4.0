/**
 * author pzh 
 * day    2018-3-9
 * 进货模块接口
 */
export const purchaseAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'purchaseOrder/list', v)),
	detailAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'purchaseOrder/get', v)),
	saveAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'purchaseOrder/save', v)),
	supplierProdAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'purchaseOrder/getPurchaseSkuProductInfo', v)),
	salesProdAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'purchaseOrder/listPurchaseSellOrderProductInfo', v)),
	supplierAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'purchaseOrder/listPurchaseSkuProductSupplierInfo', v))
}