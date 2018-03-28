/**
 * author hgf 
 * day    2018-3-14
 * 配送单业务
 */
import { outputAPI } from '@w/api/output'
import { driverAPI } from '@w/api/customer'
import { deliverOrderAPI } from '@w/api/deliverOrder'
export default function deliverAction (vm) {
	return {
		getOrderList: () => {
			var parameter = cJs.clearNullField(vm.query);
			deliverOrderAPI.getDeliverOrderAPI(parameter, (result) => {
				vm.total = result.totalCount;
				result.resultList.forEach((v, k) => {
					v.check = false;
				});
				vm.orderData = result.resultList;
			})
		},
		getpurchaserDetails: (id, isAudit) => {
			purchaserAPI.detailsAPI({
				buyerId: id
			}, (result) => {
				if(result.auditVO) {
					var auditContent = JSON.parse(result.auditVO.auditContent);
					var obj = Object.assign(auditContent, result.auditVO);
					obj.customerProfileId = result.customerProfileId;
					obj.creationTime = result.creationTime;
					vm.detailsData = obj;
				} else {
					vm.detailsData = result;
				}
				console.log(vm.detailsData);
				vm.detailShow = true;
			})
		},
		addDeliver: () => {
			deliverOrderAPI.addDeliverOrderAPI(vm.options, (result) => {
				vm.$message({
					message: '分配成功',
					type: 'success'
				});
				vm.loadList();
			});
		},
		deliverList: () => {
			driverAPI.listAPI({
				pageNum: 1,
				pageSize: 1000
			}, (result) => {
				result.resultList.forEach((v, k) => {
					if(v.auditStatusId === 2) {
						vm.deliverList.push(v);
					}
				});
			});
		}
	}
}