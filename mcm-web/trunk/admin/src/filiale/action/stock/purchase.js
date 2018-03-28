/**
 * author pzh 
 * day    2018-3-9
 * 店铺中心业务
 */
import {purchaseAPI} from '@f/api/stock'
import {warehouseAPI} from '@f/api/customer'
import {supplierAPI} from '@f/api/goods'
export default function purchaseAction (vm) {
	return {
		getPurchaseList: () => {
			var params = cJs.clearNullField(vm.query)
			purchaseAPI.listAPI(params, (result) => {
				vm.total = result.totalCount
	 			vm.tableData = result.resultList
			})
		},
		getSupplierPordList: () => {
 			var params = cJs.clearNullField(vm.sQuery)
	 		supplierAPI.listAPI(params, (result) => {
	 			vm.supplierTotal = result.totalCount
	 			vm.supplierProds = result.resultList
	 		})
	 	},
	 	/**
	 	 *获取供货商品数据
	 	 */
	 	 getSupplierSkuProdData: (skuProductId) => {
	 	 	var params = {
	 	 		skuProductId: skuProductId
	 	 	}
	 	 	purchaseAPI.supplierProdAPI(params, (result) => {
	 	 		var supplierInfos = result.supplierInfos
	 	 		for (var i in supplierInfos) {
	 	 			supplierInfos[i].purchaseQuantity = 0
	 	 			supplierInfos[i].remark = null
	 	 		}
	 	 		vm.skuInfo = result
	 	 		vm.dialogProd = false
	 	 	})
	 	 },
	 	 /**
	 	  *保存采购单
	 	  */
	 	  savePurchaseInfo: () => {
 	  			var recordSkus = vm.recordSkus, params = {}, count = 0
 	  			if(recordSkus.length) {
 	  				params.remark = vm.remark
 	  				if(!vm.warehouseId) {
 	  					vm.$message('请选择仓库')
 	  					return false
 	  				}
 	  				params.warehouseId = vm.warehouseId
 	  				for (var i in recordSkus) {
 	  					var item = recordSkus[i]
 	  					if(!item.purchaseQuantity) {
 	  						++count
 	  					}
 	  					params['productParams[' + i + '].supplierId'] = item.supplierId
 	  					params['productParams[' + i + '].skuProductId'] = item.skuProductId
 	  					params['productParams[' + i + '].purchaseQuantity'] = item.purchaseQuantity
 	  					params['productParams[' + i + '].remark'] = item.remark
 	  				}
 	  				count ? (vm.$message('单供应量数量格式有误')) : purchaseAPI.saveAPI(params, (result) => {
 	  					vm.$message('创建成功')
 	  					vm.$router.push({
 	  						name: 'filiale.stock.purchase.list'
 	  					})
 	  				})
 	  			} else {
 	  				vm.$message('还没有添加商品')
 	  			}
 	  	},
 	  	/**
	 	  *获取仓库
	 	  */
	 	 getWarehouse: () => {
	 	 	warehouseAPI.listAPI((result) => {
	 	 		vm.warehouseList = result
	 	 	})
	 	 },
	 	 getPurchaseDetail: () => {
	 	 	var params = {
	 	 		purchaseOrderId: vm.$route.query.id
	 	 	}
	 	 	purchaseAPI.detailAPI(params, (result) => {
				vm.detailInfo = result
			})
	 	 }
	}
}