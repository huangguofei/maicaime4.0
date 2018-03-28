/**
 * author pzh 
 * day    2018-3-12
 * 进货模块接口
 */
/**
*分拣任务
*/
export const taskAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'sorting/list', v)),
	detailAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'sorting/get', v)),
	saveAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'sorting/save', v)),
	prodListAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('post', 'sorting/listProdPreloadData', v))
}
/**
*预出库任务
*/
export const predictAPI = {
	listAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'sortingData/list', v)),
	detailAPI: (...v) => wCommon.ajax(cJs.apiDataReturnParams('get', 'sortingData/get', v))
}