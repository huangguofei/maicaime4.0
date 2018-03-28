/**
 * author hgf 
 * day    2018-3-16
 * 优惠券模块接口
 */
export const couponAPI = {
	listAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'coupon/list', v)),
	giveOutCouponAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('post', 'couponSendRecord/save', v)),
	payoutRecordAPI: (...v) => fCommon.ajax(cJs.apiDataReturnParams('get', 'couponSendRecord/list', v))
}