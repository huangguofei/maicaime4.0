/**
 * author hgf 
 * day    2018-3-7
 * 供应商业务
 */
import { supplierAPI } from '@w/api/customer'
export default function supplierAction (vm) {
	return {
		getsupplierList: () => {
			var parameter = JSON.parse(JSON.stringify(vm.query));
			for(var v in parameter) {
				if(!parameter[v]) {
					delete parameter[v]
				}
			}
			supplierAPI.listAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.tableData = result.resultList;
			})
		},
		getsupplierGoods: (id) => {
			supplierAPI.supplierGoodsAPI({
				supplierId: id
			}, (result) => {
				vm.goodsTotal = result.totalCount;
				vm.goodsData = result.resultList;
			})
		}
	}
}