/**
 * author hgf 
 * day    2018-3-7
 * 商户业务
 */
import { purchaserAPI,
	clientGroupAPI } from '@w/api/customer'
export default function purchaserAction (vm) {
	return {
		getpurchaserList: () => {
			var parameter = JSON.parse(JSON.stringify(vm.query));
			for(var v in parameter) {
				if(!parameter[v]) {
					delete parameter[v];
				}
			}
			purchaserAPI.listAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.tableData = result.resultList;
			})
		},
		getpurchaserDetails: (id, isAudit) => {
			purchaserAPI.detailsAPI({
				buyerId: id
			}, (result) => {
				if(result.audit) {
				var auditContent = JSON.parse(result.audit.auditContent);
				var obj = Object.assign(auditContent, result.audit);
				obj.customerProfileId = result.customerProfileId;
				obj.creationTime = result.creationTime;
				vm.detailsData = obj;
				} else {
					vm.detailsData = result;
				}
				console.log(vm.detailsData);
				vm.detailShow = true;
			})
		}
	}
}