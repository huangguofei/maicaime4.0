/**
 * author pzh 
 * day    2018-3-6
 * 预出库模块业务JS脚本
 */
import { predictAPI } from '@w/api/sorting'
export default function preictAction (vm) {
	return {
		getPredictList: () => {
			var params = cJs.clearNullField(vm.query)
	 		predictAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData =  result.resultList
	 		})
		},
		getPredictDetail: () => {
			var params = {
				sortingDataId: vm.$route.query.id
			}
			predictAPI.detailAPI(params, (result) => {
				vm.detailInfo = result
			})
		}
	}
}