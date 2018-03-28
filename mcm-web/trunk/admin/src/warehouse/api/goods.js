/**
 * author pzh 
 * day    2018-3-6
 * 商品模块接口
 */
 /**
  *供应商
  */
 export const supplierAPI = {
 	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/list', v)),
 	detailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/get', v))
 }
 /**
  *销售商品
  */ 
 export const salesAPI = {
 	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'sellProd/list', v)),
 	detailsAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'sellProd/get', v))
 }