/**
 * author hgf 
 * day    2018-3-21
 * 出库订单模块业务JS脚本
 */
import { outputAPI } from '@w/api/output'
export default function outputAction (vm) {
	return {
		getOutputList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		outputAPI.outputListAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getOutputDetails: (data) => {
	 		outputAPI.outputDetailsAPI(data, (result) => {
	 			vm.selectRow = result;
	 		})
	 	}
	 	
	}
}