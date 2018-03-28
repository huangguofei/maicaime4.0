/**
 * author pzh 
 * day    2018-3-9
 * 销售单业务
 */
import {salesOrderAPI} from '@f/api/order'
export default function salesOrderAction (vm) {
	return {
		getSalesOrderList: () => {
			salesOrderAPI.listAPI(vm.query, (result) => {
				vm.total = result.totalCount
	 			vm.tableData = result.resultList
			})
		},
		getSalesOrderDetailInfo: () => {
			var params = {
				sellOrderId: vm.$route.query.id
			}
			salesOrderAPI.detailAPI(params, (result) => {
				vm.detailInfo = result
			})
		}
	}
}