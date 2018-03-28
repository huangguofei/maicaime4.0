/**
 * author hgf
 * day    2018-3-27
 * 流水明细报表业务
 */
import { billAPI } from '@f/api/report'
export default function billAction (vm) {
	return {
		getBillList: () => {
			var params = cJs.clearNullField(vm.query);
			billAPI.listAPI(params, (result) => {
				vm.total = result.pageInfo.totalCount;
				vm.otherData = result.stats;
				vm.tableData = result.pageInfo.resultList;
			})
		}
	}
}