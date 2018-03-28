/**
 * author pzh 
 * day    2018-3-9
 * 店铺中心模块接口
 */
export const shopAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'shop/list', v)),
	detailAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'shop/get', v)),
	prodListAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'shop/shopSaleProdList', v)),
	editInfoAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'shop/updateBaseInfo', v)),
	addProdAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'shop/updateProdToShop', v))
}