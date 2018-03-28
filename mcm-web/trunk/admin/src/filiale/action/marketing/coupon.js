/**
 * author hgf 
 * day    2018-3-16
 * 优惠券业务
 */
import { couponAPI } from '@f/api/marketing'
import { purchaserAPI } from '@f/api/customer'
export default function driverAction (vm) {
	return {
		getCouponList: () => {
			var parameter = cJs.clearNullField(vm.query);
			couponAPI.listAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.couponData = result.resultList;
			})
		},
		getPurchaserList: () => {
			purchaserAPI.listAPI({
				pageNum: 1,
				pageSize: 10000
			}, (result) => {
				vm.purchaserData = result.resultList;
			});
		},
		giveOutCoupon: () => {
			var subSaveParams = vm.payoutData.subSaveParams, params = {}
			for(var i in subSaveParams) {
				var item = subSaveParams[i]
				params['subSaveParams[0].' + i] = item;
			}
			params.couponId = vm.payoutData.couponId;
			couponAPI.giveOutCouponAPI(params, (result) => {
				vm.$message({
					message: '派发成功！',
					type: 'success'
				})
				vm.dialogShow = false;
			})
		},
		getPayoutRecord: () => {
			var parameter = cJs.clearNullField(vm.query);
			couponAPI.payoutRecordAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.recordData = result.resultList;
			})
		}
	}
}