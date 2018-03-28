/**
 * author hgf 
 * day    2018-3-19
 * 扣点业务
 */
 import { businessAPI } from '@f/api/setting'
 export default function deductionAction (vm) {
 	return {
 		getDefaultDeduction: () => {
	 		businessAPI.defaultDeductionAPI ((result) => {
	 			vm.total = result.total;
	 			vm.tableData = result;
	 		})
	 	},
	 	getCustomDeduction: () => {
	 		var params = cJs.clearNullField(vm.query);
	 		businessAPI.customDeductionAPI (params, (result) => {
	 			vm.total = result.total;
	 			vm.tableData = result.resultList;
	 		})
	 	}
 	}
 }