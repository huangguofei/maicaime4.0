/**
 * author pzh 
 * day    2018-3-6
 * 商品单位业务
 */
 import {unitAPI} from '@f/api/goods'
 export default function unitAction (vm) {
 	return {
 		getUnitList: () => {
	 		unitAPI.listAPI(vm.query, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	saveUnitInfo: () => {
	 		vm.ruleForm.skuProductUnitId ? unitAPI.editAPI(vm.ruleForm, (result) => {
	 			vm.diaUnit.show = false
	 			vm.unitAction.getUnitList()
	 		}) : unitAPI.addAPI(vm.ruleForm, (result) => {
	 			vm.diaUnit.show = false
	 			vm.unitAction.getUnitList()
	 		}) 
	 	}
 	}
 }