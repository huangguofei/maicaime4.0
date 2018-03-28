/**
 * author hgf 
 * day    2018-3-17
 * 报损业务
 */
import { inventoryAPI } from '@w/api/inventory'
import { supplierAPI } from '@w/api/customer'

export default function breakageAction (vm) {
	return {
		getBreakageList: () => {
			var parameter = cJs.clearNullField(vm.query);
			inventoryAPI.breakageListAPI(parameter, (result) => {
				vm.total = result.totalCount;
				vm.tableData = result.resultList;
			})
		},
		getBreakageDetails: (id) => {
			inventoryAPI.breakageDetailsAPI({
				breakageId: vm.$route.query.id
			}, (result) => {
				vm.detailInfo = result;
			})
		},
		addBreakage: () => {
			var recordData = vm.recordData, params = {}, form = vm.cForm, count = 0
  			if(recordData.length) {
  				params.remark = vm.remark
  				if(!form.supplierId) {
  					vm.$message('请选择供应商')
  					return false
  				}
  				params.supplierId = form.supplierId
  				for (var i in recordData) {
  					var item = recordData[i]
  					if(!item.breakageQuantity) {
  						++count
  					}
  					params['productParams[' + i + '].skuProductId'] = item.skuProductId
  					params['productParams[' + i + '].breakageQuantity'] = item.breakageQuantity
  					params['productParams[' + i + '].remark'] = item.remark
  				}
  				count ? (vm.$message('数量不能为零或不是数字类型')) : inventoryAPI.saveBreakageAPI(params, (result) => {
  					vm.$message('录入成功！')
  					vm.$router.push({
  						name: 'warehouse.inventory.breakage.list'
  					})
  				})
  			} else {
  				vm.$message('还没有添加商品')
  			}
		},
		/**
		 * 根据商品获取库存情况
		 */
		 getInventoryByProdIds: (prodIds, callback) => {
		 	var params = {
		 		skuProductIds: prodIds
		 	}
		 	inventoryAPI.goodsInventoryAPI(params, (result) => {
		 		callback && callback(result)
		 	})
		 }
	}
}