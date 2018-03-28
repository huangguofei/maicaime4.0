/**
 * author pzh 
 * day    2018-3-6
 * 商品中心模块接口
 */
 /**
  *供应商
  */
 export const supplierAPI = {
 	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/list', v)),
 	addAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProd/save', v)),
 	editAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProd/update', v)),
 	detailAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/get', v)),
 	auditListAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/audit/list', v)),
 	auditAcceptAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProd/audit/accept', v)),
 	auditRejectAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProd/audit/reject', v)),
 	offterRecordAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'skuProd/offerRecord/list', v))
 }
 /**
  *商品单位
  */
export const unitAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'skuProdUnit/list', v)),
 	addAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProdUnit/save', v)),
 	editAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'skuProdUnit/update', v))
}
 /**
  *销售商品
  */
export const salesAPI = {
	addSingleAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/saveSingle', v)),
	addMultipleAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/saveMultiple', v)),
	salesListAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'sellProd/list', v)),
	detailAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'sellProd/get', v)),
	editMultipleAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/updateMultiple', v)),
	editSingleAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/updateSingle', v)),
	offterRecordAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'sellProduct/offerRecord/list', v)),
	auditListAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'sellProd/audit/list', v)),
	auditAcceptAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/audit/accept', v)),
 	auditRejectAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/audit/reject', v)),
 	offTheShelfAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/offTheShelf', v)),
 	shelvesAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/shelves', v)),
 	offterAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'sellProd/offer', v))
}
