/**
 * author hgf 
 * day    2018-3-13
 * 供应商品模块业务JS脚本
 */
import { salesAPI } from '@w/api/goods'
export default function supplierSalesAction (vm) {
	return {
		getSalesList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		salesAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getSalesDetails: () => {
 			var params = cJs.clearNullField(vm.query)
	 		salesAPI.detailsAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	}
	}
}