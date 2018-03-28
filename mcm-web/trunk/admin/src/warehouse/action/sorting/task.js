/**
 * author pzh 
 * day    2018-3-6
 * 分拣任务模块业务JS脚本
 */
import { taskAPI } from '@w/api/sorting'
import { salesAPI } from '@w/api/goods'
import { commonAPI } from '@w/api/common'
export default function taskAction (vm) {
	return {
		getTaskList: () => {
			var params = cJs.clearNullField(vm.query)
	 		taskAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData =  result.resultList
	 		})
		},
		getTaskDetail: () => {
			var params = {
				sortingId: vm.$route.query.id
			}
			taskAPI.detailAPI(params, (result) => {
				vm.detailInfo = result
			})
		},
		getSalesProdList: () => {
	 		salesAPI.listAPI(vm.query, (result) => {
	 			vm.total = result.totalCount
	 			var resultList = result.resultList,
	 				selectProds = vm.selectTableData
	 			for (var i in resultList) {
	 				var item = resultList[i], count = 0
	 				for (var n in selectProds) {
	 					item.sellProductId === selectProds[n].sellProductId && (++count)
	 				}
	 				count !== 0 ? item.active = true : item.active = false
	 			}
	 			vm.tableData = resultList
	 		})
	 	},
	 	getProdsBySellProductIds: (sellProductIds, type) => {
	 		var params = {
	 			sellProductIds: sellProductIds
	 		}
	 		taskAPI.prodListAPI(params, (result) => {
	 			type === 'order' ? vm.dialogSalesOrder = false : vm.dialogSalesProd = false
	 			for(var i in result) {
	 				result[i].plannedQuantity = 0
	 				result[i].remark = ''
	 			}
	 			vm.taskProds = result
	 		})
	 	},
	 	getSalesOrderProd: () => {
	 		var params = cJs.clearNullField(vm.query)
	 		var date = new Date()
	 		var year = date.getFullYear(), moth = date.getMonth() + 1, day = date.getDate()
	 		moth = moth > 9 ? '0' + moth : moth
	 		var locale = year + '-' + moth + '-' + day
	 		params.beginDate = locale + ' ' + (vm.dateVals ? vm.dateVals[0] : '00:00:00')
	 		params.endDate = locale + ' ' + (vm.dateVals ? vm.dateVals[1] : '23:59:59')
	 		commonAPI.salesOrderProdAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			var resultList = result.resultList,
	 				selectProds = vm.selectTableData
	 			for (var i in resultList) {
	 				var item = resultList[i], count = 0
	 				for (var n in selectProds) {
	 					item.sellProductId === selectProds[n].sellProductId && (++count)
	 				}
	 				count !== 0 ? item.active = true : item.active = false
	 			}
	 			vm.tableData = resultList
	 		})
	 	},
	 	saveTask: () => {
	 		var taskProds = vm.taskProds, params = {}, count = 0
  			if(taskProds.length) {
  				params.remark = vm.remark
  				for (var i in taskProds) {
  					var item = taskProds[i]
  					if(!item.plannedQuantity) {
  						++count
  					}
  					params['productParams[' + i + '].sellProductId'] = item.sellProduct.sellProductId
  					params['productParams[' + i + '].plannedQuantity'] = item.plannedQuantity
  					params['productParams[' + i + '].remark'] = item.remark
  				}
  				count ? (vm.$message('分拣计划数格式有误')) : taskAPI.saveAPI(params, (result) => {
  					vm.$message('保存成功')
  					vm.$router.push({
  						name: 'warehouse.sorting.task.list'
  					})
  				}) 
  			} else {
  				vm.$message('还没有添加商品')
  			}
	 	}
	}
}