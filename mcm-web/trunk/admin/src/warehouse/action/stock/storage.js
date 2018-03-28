/**
 * author pzh 
 * day    2018-3-6
 * 入库模块业务JS脚本
 */
import {storageAPI, purchaseAPI} from '@w/api/stock'
import { commonAPI } from '@w/api/common'
export default function supplierAction (vm) {
	return {
		getStorageList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		storageAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getSupplierList: () => {
	 		var params = cJs.clearNullField(vm.query)
	 		commonAPI.supplierListAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getPurchaseList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		purchaseAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	getPurchaseDetail: () => {
	 		var params = {
	 			purchaseOrderId: vm.$route.query.id
	 		}
	 		purchaseAPI.detailAPI(params, (result) => {
	 			vm.detailInfo = result
	 		})
	 	},
	 	getSupplierProdList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		storageAPI.skuProdAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			var resultList = result.resultList
	 			for(var i in resultList) {
	 				resultList[i].active = false
	 			}
	 			vm.tableData = resultList
	 		})
	 	},
	 	saveStorageInfo: () => {
	 		var recordData = vm.recordData, params = {}, form = vm.cForm, count = 0
  			if(recordData.length) {
  				params.remark = vm.remark
  				if(!form.supplierId) {
  					vm.$message('请选择供应商')
  					return false
  				}
  				params.supplierId = form.supplierId
  				params.purchaseOrderId = form.purchaseOrderId
  				for (var i in recordData) {
  					var item = recordData[i]
  					if(!item.stockInQuantity) {
  						++count
  					}
  					params['productParams[' + i + '].skuProductId'] = item.skuProductId
  					params['productParams[' + i + '].stockInQuantity'] = item.stockInQuantity
  					params['productParams[' + i + '].remark'] = item.remark
  				}
  				count ? (vm.$message('数量格式有误')) : storageAPI.saveAPI(params, (result) => {
  					vm.$message('创建成功')
  					vm.$router.push({
  						name: 'warehouse.stock.storage.list'
  					})
  				})
  			} else {
  				vm.$message('还没有添加商品')
  			}
	 	},
	 	getStorageDetail: () => {
	 		var params = {
	 			stockInId: vm.$route.query.id
	 		}
	 		storageAPI.detailAPI(params, (result) => {
	 			vm.detailInfo = result
	 		})
	 	}
	}
}