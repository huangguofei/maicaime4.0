/**
 * author hgf 
 * day    2018-3-17
 * 库存业务
 */
import { inventoryAPI } from '@w/api/inventory'
export default function inventoryAction (vm) {
	return {
		getInventoryList: () => {
			var parameter = cJs.clearNullField(vm.query);
			inventoryAPI.inventoryListAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.tableData = result.resultList;
			})
		},
		getGoodsInventoryList: (id) => {
			inventoryAPI.goodsInventoryAPI({
				sellProductIds: id
			}, (result) => {
				vm.detailsData = result;
			})
		}
	}
}