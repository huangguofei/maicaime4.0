/**
 * author hgf 
 * day    2018-3-20
 * 中心仓业务
 */
import { warehouseAPI } from '@f/api/customer'
export default function warehouseAction (vm) {
	return {
		getWarehouseList: () => {
			var parameter = cJs.clearNullField(vm.query);
			warehouseAPI.listAPI(parameter, (result) => {
				vm.tableData = result;
			})
		},
		getWarehouseDetails: (id) => {
			warehouseAPI.detailsAPI({
				warehouseId: id
			}, (result) => {
				if(result.audit) {
					var auditContent = JSON.parse(result.audit.auditContent);
					var obj = Object.assign(auditContent, result.audit);
					obj.customerProfileId = result.customerProfileId;
					obj.creationTime = result.creationTime;
					vm.detailsData = obj;
				} else {
					vm.detailsData = result;
					console.log(vm.detailsData);
				}
				vm.detailShow = true;
			})
		}
	}
}