/**
 * author hgf 
 * day    2018-3-14
 * 配送单业务
 */
import { deliverOrderAPI } from '@w/api/deliverOrder'
export default function deliverAction (vm) {
	return {
		getDeliverOrderList: () => {
			var parameter = cJs.clearNullField(vm.query);
			deliverOrderAPI.listAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.tableData = result.resultList;
			})
		},
		getDeliverOrderDetails: (id) => {
			deliverOrderAPI.detailsAPI({
				deliveryOrderId: id
			}, (result) => {
				vm.detailsData = result;
				vm.detailShow = true;
			})
		}
	}
}