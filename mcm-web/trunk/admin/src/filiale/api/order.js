/**
 * author pzh 
 * day    2018-3-9
 * 订单中心模块接口
 */
export const salesOrderAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'order/list', v)),
	detailAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'order/get', v))
}