/**
 * author hgf 
 * day    2018-3-27
 * 商品分类业务
 */
 import { commonAPI } from '@f/api/common'
 export default function classAction (vm) {
 	return {
 		getGoodsClass: () => {
	 		commonAPI.categoryAllAPI((result) => {
	 			vm.tableData = result
	 		})
	 	}
 	}
 }