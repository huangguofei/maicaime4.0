/**
 * author pzh 
 * day    2018-3-6
 * 供应商业务
 */
 import {supplierAPI, unitAPI} from '@f/api/goods'
 import {commonAPI} from '@f/api/common'
 export default function supplierAction (vm) {
 	return {
 		getSupplierList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		supplierAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getUnitAllList: () => {
	 		var params = {
	 			pageSize: 1000
	 		}
	 		unitAPI.listAPI(params, (result) => {
	 			vm.unitList = result.resultList
	 		})
	 	},
	 	/**
	 	 *获取商品分类
	 	 */
	 	getCategoryList: () => {
	 		commonAPI.categoryEnabledAPI((result) => {
	 			vm.categoryList = result
	 		})
	 	},
	 	saveProdInfo: () => {
	 		function success () {
	 			vm.$message('保存成功')
	 			vm.$router.push({
	 				name: 'filiale.goods.supplier.list'
	 			})
	 		}
	 		vm.$route.query.id ? supplierAPI.editAPI(vm.ruleForm, (result) => {
	 			success()
	 		}, () => {
	 			vm.submitLoading = false
	 		}) : supplierAPI.addAPI(vm.ruleForm, (result) => {
	 			success()
	 		}, () => {
	 			vm.submitLoading = false
	 		})
	 	},
	 	getDetailInfo: () => {
	 		var params = {
	 			skuProductId: vm.$route.query.id
	 		}
	 		supplierAPI.detailAPI(params, (result) => {
	 			if(result) {
	 				vm.assignmentForm(result)
	 				vm.ruleForm.skuProductId = result.skuProductId
	 				vm.selectedOptions[0] = result.productFirstCategoryId
	 				vm.selectedOptions[1] = result.productSecondCategoryId
	 				vm.selectedOptions[2] = result.productThirdCategoryId
		         	try {
	         			vm.minorImageList = JSON.parse(result.minorImage);
		         	} catch (e) {}
	 			}
	 		})
	 	},
	 	/**
		 * 审核报价列表
	 	 */
	 	 getAuditProd: () => {
	 	 	var params = cJs.clearNullField(vm.query)
	 	 	supplierAPI.auditListAPI(params, (result) => {
	 	 		if(result) {
	 	 			vm.total = result.totalCount
	 				vm.tableData = result.resultList
	 	 		} else {
	 	 			vm.total = 0
	 				vm.tableData = []
	 	 		}
	 	 	})
	 	 },
	 	 auditOffterProd: (data, ssprId) => {
	 	 	function success () {
	 	 		vm.$message('提交成功')
	 	 		if (data.type === 0) {
	 	 			vm.$refs.auditOffterArea.dialogVisible = false
	 	 		}
	 	 		vm.supplierAction.getAuditProd()
	 	 	}
	 	 	var params = {
	 	 		ssprId: ssprId
	 	 	}
	 	 	data && data.type ? supplierAPI.auditAcceptAPI(params, (result) => {
 	 			success()
 	 		}) : (() => {
 	 			params.remark = data.remark
 	 			supplierAPI.auditRejectAPI(params, (result) => {
 	 				success()
 	 			})
 	 		})()
	 	 },
	 	 /**
		 * 报价历史
	 	 */
	 	 getOffterRecordList: () => {
	 	 	var params = cJs.clearNullField(vm.query)
	 	 	supplierAPI.offterRecordAPI(params, (result) => {
	 	 		vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 	 	})
	 	 }
 	}
 }