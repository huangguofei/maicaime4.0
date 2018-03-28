/**
 * author hgf 
 * day    2018-3-13
 * 供应商品模块业务JS脚本
 */
import { supplierAPI } from '@w/api/goods'
export default function supplierGoodsAction (vm) {
	return {
		getGoodsList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		supplierAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getGoodsDetails: () => {
 			var params = cJs.clearNullField(vm.query)
	 		supplierAPI.detailsAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	}
	}
}