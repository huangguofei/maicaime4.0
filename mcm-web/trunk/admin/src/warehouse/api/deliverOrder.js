/**
 * author hgf 
 * day    2018-3-14
 * 配送单模块接口
 */
 /**
  *供应商
  */
 export const deliverOrderAPI = {
 	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'deliveryOrder/list', v)),
 	detailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'deliveryOrder/get', v)),
 	addDeliverOrderAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'deliveryOrder/save', v)),
 	getDeliverOrderAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'order/listSellOrderDeliveryInfo', v))
 }