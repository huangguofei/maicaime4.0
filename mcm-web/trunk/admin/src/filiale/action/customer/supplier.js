/**
 * author hgf 
 * day    2018-3-7
 * 供应商业务
 */
import { supplierAPI } from '@f/api/customer'
import { commonAPI } from '@f/api/common'
import { supplierAPI as goodsAPI } from '@f/api/goods'
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
		getsupplierDetails: (id, isAudit) => {
			supplierAPI.detailsAPI({
				supplierId: id
			}, (result) => {
				if(result.audit) {
					var auditContent = JSON.parse(result.audit.auditContent);
					var obj = Object.assign(auditContent, result.audit);
					obj.creationTime = result.creationTime;
					vm.detailsData = obj;
				} else {
					vm.detailsData = result;
				}
				vm.detailShow = true;
			})
		},
		auditSupplier: () => {
			supplierAPI.auditAPI(vm.options, (result) => {
				vm.auditShow = false;
				vm.detailShow = false;
				vm.initPage();
			})
		},
		disabledSupplier: (data) => {
			supplierAPI.activeAPI(data, (result) => {
				vm.$message.success(data.status === '1' ? '启用成功！' : '禁用成功！');
				vm.initPage();
			})
		},
		getAllClass () {
			function filterThreeChilren (data) {
				console.log(data)
				if(data.length > 0) {
					data.forEach((v, k) => {
						console.log(v)
						if(v.tier === 2) {
							delete v.childrenList;
						} else {
							filterThreeChilren(v.childrenList);
						}
					})
				}
			}
			commonAPI.categoryEnabledAPI((result) => {
				filterThreeChilren(result);
				console.log(result)
				vm.classData = result;
				if(vm.step > 0) {
					vm.classShow = true;
					vm.step = 0;
				} else {
					vm.step++;
				}
			});
		},
		getClientGroupList: () => {
			clientGroupAPI.listAPI((result) => {
				vm.clientData = result;
			})
		},
		getClass: (data, callback) => {
			supplierAPI.supplierClassAPI(data, (result) => {
				vm.selectClass = [];
				callback && callback(result);
				if(callback) {
					return false;					
				}
				result.forEach((v, k) => {
					vm.selectClass.push(v.productSecondCategoryId);
				});
				if(vm.step > 0) {
					vm.classShow = true;
					vm.step = 0;
				} else {
					vm.step++;
				}
			})
		},
		setClass: (data) => {
			supplierAPI.setClassAPI(data, (result) => {
				vm.$message.success('设置成功！');
				vm.classShow = false;
				vm.initPage();
			})
		},
		getAllGoods: (data) => {
			var op = {
				pageNum: 1,
				pageSize: 1000
			}
			op.productSecondCategoryIds = [];
			data.forEach((v, k) => {
				console.log(v)
				op['productSecondCategoryIds[' + k + ']'] = v;
			});
			goodsAPI.listAPI(op, (result) => {
				vm.goodsData = result.resultList;
				console.log(vm.goodsData);
				if(vm.step > 0) {
					vm.goodsShow = true;
					vm.step = 0;
				} else {
					vm.step++;
				}
			})
		},
		getGoods: (data) => {
			supplierAPI.supplierGoodsAPI(data, (result) => {
				vm.selectGoods = [];
				vm.beforeGoods = [];
				vm.beforeAllGoods = result.resultList;
				result.resultList.forEach((v, k) => {
					vm.selectGoods.push(v.skuProductId);
				});
				console.log(vm.selectGoods);
				vm.beforeGoods = JSON.parse(JSON.stringify((vm.selectGoods)));
				if(vm.step > 0) {
					vm.goodsShow = true;
					vm.step = 0;
				} else {
					vm.step++;
				}
			})
		},
		setGoods: () => {
			supplierAPI.setGoodsAPI(vm.goodsOp, (result) => {
				vm.$message.success('设置成功！');
				vm.goodsShow = false;
				vm.initPage();
			})
		}
	}
}