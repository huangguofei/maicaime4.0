/**
 * author hgf
 * 库存模块接口
 */
 export const inventoryAPI = {
 	inventoryListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'inventory/list', v)),
 	goodsInventoryAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'inventory/listStatisticData', v)),
 	
 	breakageListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'breakage/list', v)),
 	breakageDetailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'breakage/get', v)),
 	saveBreakageAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'breakage/save', v))
 	
 }
