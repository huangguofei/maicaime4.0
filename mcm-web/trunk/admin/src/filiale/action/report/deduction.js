/**
 * author hgf
 * day    2018-3-27
 * 销售扣点报表业务
 */
import { deductionAPI } from '@f/api/report'
export default function deductionAction (vm) {
	return {
		getDeductionList: () => {
			var params = cJs.clearNullField(vm.query);
			deductionAPI.listAPI(params, (result) => {
	 			vm.tableData = result
			})
		},
		getDeductionDetail: () => {
			deductionAPI.detailAPI(vm.query, (result) => {
				vm.tableData = result
			})
		}
	}
}