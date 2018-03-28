/**
 * author hgf 
 * day    2018-3-8
 * 司机端业务
 */
import { driverAPI } from '@w/api/customer'
export default function driverAction (vm) {
	return {
		getdriverList: () => {
			var parameter = JSON.parse(JSON.stringify(vm.query));
			for(var v in parameter) {
				if(!parameter[v]) {
					delete parameter[v];
				}
			}
			driverAPI.listAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.tableData = result.resultList;
			})
		},
		getdriverDetails: (id) => {
			driverAPI.detailsAPI({
				driverId: id
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