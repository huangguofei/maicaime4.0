/**
 * author hgf
 * 出库模块接口
 */
 export const outputAPI = {
 	salesListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'order/list', v)),
 	salesDetailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'order/get', v)),
 	salesListExportAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'order/export', v)),
 	
 	salesNowListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'order/listProdStatDetailData', v)),
 	
 	outputListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'stockOut/list', v)),
 	outputDetailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'stockOut/get', v))
 	
 }
