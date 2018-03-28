/**
 * author pzh 
 * day    2018-3-6
 * 销售商品业务
 */
import {salesAPI} from '@f/api/goods'
import {commonAPI} from '@f/api/common'
 export default function supplierAction (vm) {
 	return {
 		getSalesList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		salesAPI.salesListAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	saveProdInfo: (type) => {
	 		function success () {
	 			vm.$message('保存成功')
	 			vm.$router.push({
	 				name: 'filiale.goods.sales.list'
	 			})
	 		}
	 		var addAPI = '', params = null
	 		if (type === 0) {
	 			addAPI = vm.$route.query.id ? 'editSingleAPI' : 'addSingleAPI'
	 			params = vm.ruleForm
	 		} else if (type === 1) {
	 			addAPI = vm.$route.query.id ? 'editMultipleAPI' : 'addMultipleAPI'
	 			params = JSON.parse(JSON.stringify(vm.ruleForm))
				var items = params.items
				for(var i in items) {
					params['items[' + i + '].specName'] = items[i].specName
					params['items[' + i + '].sellUnit'] = items[i].sellUnit
					params['items[' + i + '].sellPrice'] = items[i].sellPrice
					params['items[' + i + '].originalPrice'] = items[i].originalPrice
					params['items[' + i + '].matrixingMultiple'] = items[i].matrixingMultiple
					params['items[' + i + '].isWeigh'] = items[i].isWeigh
					if(items[i].sellProductId) {
						params['items[' + i + '].sellProductId'] = items[i].sellProductId
					}
				}
				delete params.items
	 		} else {
	 			return false
	 		}
 			salesAPI[addAPI](params, (result) => {
	 			success()
	 		}, () => {
	 			vm.submitLoading = false
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
	 	getCustomerList: () => {
	 		commonAPI.customerListAPI((result) => {
	 			vm.customerList = result
	 		})
	 	},
	 	getDetailInfo: () => {
	 		var params = {
	 			sellProductId: vm.$route.query.id
	 		}
	 		salesAPI.detailAPI(params, (result) => {
	 			vm.selectProd = result.skuProduct
	 			vm.skuActive = result.sellProductTypeId === 2 ? 1 : 0
	 			setTimeout(() => {
 					vm.$refs.editProd.assignmentForm(result)
 				}, 500)
	 		})
	 	},
	 	/**
		 * 审核报价列表
	 	 */
	 	 getAuditProd: () => {
	 	 	var params = cJs.clearNullField(vm.query)
	 	 	salesAPI.auditListAPI(params, (result) => {
	 	 		if(result) {
	 				vm.total = result.totalCount
	 				vm.tableData = result.resultList
	 	 		} else {
	 	 			vm.total = 0
	 				vm.tableData = []
	 	 		}
	 	 	})
	 	 },
	 	 auditOffterProd: (data, sellProductId) => {
	 	 	function success () {
	 	 		vm.$message('提交成功')
	 	 		if (data.type === 0) {
	 	 			vm.$refs.auditOffterArea.dialogVisible = false
	 	 		}
	 	 		vm.salesAction.getAuditProd()
	 	 	}
	 	 	var params = {
	 	 		sellProductId: sellProductId
	 	 	}
	 	 	data && data.type ? salesAPI.auditAcceptAPI(params, (result) => {
 	 			success()
 	 		}) : (() => {
 	 			params.remark = data.remark
 	 			salesAPI.auditRejectAPI(params, (result) => {
 	 				success()
 	 			})
 	 		})()
	 	 },
	 	/**
		 * 报价历史
	 	 */
	 	 getOffterRecordList: () => {
	 	 	var params = cJs.clearNullField(vm.query)
	 	 	salesAPI.offterRecordAPI(params, (result) => {
	 	 		vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 	 	})
	 	 },
	 	 /**
		 * 销售商品上下架
	 	 */
	 	 shelvesOffTheShelf: (row, callback) => {
	 	 	var params = {
	 	 		sellProductId: row.sellProductId
	 	 	}
	 	 	function _success () {
	 	 		row.sellProductStatusId = row.sellProductStatusId === 1 ? 2 : 1
	 	 		vm.$message(row.sellProductStatusId === 1 ? '上架成功' : '下架成功')
	 	 		callback && callback()
	 	 	}
	 	 	row.sellProductStatusId === 1 ? salesAPI.offTheShelfAPI(params, (result) => {
	 	 		_success()
	 	 	}) : salesAPI.shelvesAPI(params, (result) => {
	 	 		_success()
	 	 	})
	 	 },
	 	 setProdOffter: (params) => {
	 	 	salesAPI.offterAPI (params, (result) => {
	 	 		vm.$message('报价成功')
	 	 	})
	 	 }
 	}
 }