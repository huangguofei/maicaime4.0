/**
 * author pzh 
 * day    2018-3-6
 * 公共模块接口
 */
export const commonAPI = {
	/**
	 *供应商列表
	 */
 	supplierListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'supplier/list', v)),
 	/**
	 *今日销售单商品列表 暂时放这
	 */
 	salesOrderProdAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'order/listProdStatDetailData', v))
}