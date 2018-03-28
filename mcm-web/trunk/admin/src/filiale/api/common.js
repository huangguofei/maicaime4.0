/**
 * author pzh 
 * day    2018-3-6
 * 商品中心模块接口
 */
export const commonAPI = {
	/**
	 *商品分类只是启用
	 */
 	categoryEnabledAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'product/category/listEnabled', v)),
 	/**
 	 *商品分类包含禁用
 	 */
 	categoryAllAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'product/category/listAll', v)),
 	/**
 	 *客户群体列表
 	 */
 	customerListAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'businessSetting/customerProfile/list', v))
}