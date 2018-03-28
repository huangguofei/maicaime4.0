/**
 * author hgf 
 * day    2018-3-13
 * 出库销售订单模块业务JS脚本
 */
import { outputAPI } from '@w/api/output'
export default function outputAction (vm) {
	return {
		getSalesList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		outputAPI.salesListAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getSalesDetails: (data) => {
	 		outputAPI.salesDetailsAPI(data, (result) => {
	 			vm.selectRow = result;
	 		})
	 	}
	 	
	}
}