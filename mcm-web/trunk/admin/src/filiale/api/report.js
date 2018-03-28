/**
 * author hgf 
 * day    2018-3-27
 * 表报中心模块接口
 */

 /**
  *销售扣点
  */
export const deductionAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'report/salePoint/listSalesPonitDataOnDay', v)),
	detailAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'report/salePoint/listSalesPointDataBySupplierId', v))
}

/**
  *流水明细
  */
export const billAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'report/trade/list', v))
}