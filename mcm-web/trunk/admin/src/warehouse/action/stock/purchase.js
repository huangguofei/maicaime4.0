/**
 * author pzh 
 * day    2018-3-6
 * 采购单模块业务JS脚本
 */
import { purchaseAPI } from '@w/api/stock'
export default function supplierAction (vm) {
	return {
		getPurchaseList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		purchaseAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	}
	}
}