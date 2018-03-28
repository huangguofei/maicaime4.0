/**
 * author pzh 
 * day    2018-3-9
 * 店铺中心业务
 */
import {shopAPI} from '@f/api/shop'
import {salesAPI} from '@f/api/goods'
export default function salesOrderAction (vm) {
	return {
		getShopList: () => {
			shopAPI.listAPI(vm.query, (result) => {
				if (!result) {
					return false
				}
				vm.total = result.totalCount
	 			vm.tableData = result.resultList
			})
		},
		saveShopInfo: () => {
			shopAPI.editInfoAPI(vm.shopForm, (result) => {
				vm.$message('保存成功')
				vm.dialogShop = false
				vm.shopAction.getShopList()
			})
		},
		getSalesList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		salesAPI.salesListAPI(params, (result) => {
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
	 	saveShopProds: (ids, delIds) => {
	 		var params = {
	 			saveSellProductIdStr: ids,
	 			delSsrIdStr: delIds,
	 			shopId: vm.$route.query.id
	 		}
	 		shopAPI.addProdAPI(params, (result) => {
	 			vm.$message('保存成功')
	 		})
	 	},
	 	detailInfo: (callback) => {
	 		var params = {
	 			shopId: vm.$route.query.id
	 		}
	 		shopAPI.detailAPI(params, (result) => {
	 			vm.detailInfo = result
	 			callback && callback(result)
	 		})
	 	},
	 	selectSalesProds: (type) => {
	 		var params = type === 'detail' ? vm.query : vm.selectQuery
	 		params.sellProductName && (delete params.sellProductName)
	 		shopAPI.prodListAPI(params, (result) => {
	 			var resultList = result && result.resultList
	 			if (resultList && resultList.length > 0) {
	 				for(var i in resultList) {
	 					var item = resultList[i], sellProduct = item.sellProduct
	 					item.productName = sellProduct.productName
	 					item.sellUnit = sellProduct.sellUnit
	 					item.mainImage = sellProduct.mainImage
	 					delete item.sellProduct
	 				}
	 			}
	 			if(type === 'detail') {
 					vm.tableData = resultList
 				} else {
 					vm.selectTableData = resultList ? resultList : []
	 				vm.selectQueryData = resultList ? resultList : []
	 				vm.shopAction.getSalesList()
 				}
	 		})
	 	},
	 	selectQueryProds: () => {
	 		shopAPI.prodListAPI(vm.selectQuery, (result) => {
	 			var resultList = result.resultList
	 			if (resultList.length > 0) {
	 				for(var i in resultList) {
	 					var item = resultList[i], sellProduct = item.sellProduct
	 					item.productName = sellProduct.productName
	 					item.sellUnit = sellProduct.sellUnit
	 					item.mainImage = sellProduct.mainImage
	 					delete item.sellProduct
	 				}
	 				vm.selectTableData = resultList
	 			}
	 		})
	 	}
	}
}