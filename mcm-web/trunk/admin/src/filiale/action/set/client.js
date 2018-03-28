/**
 * author hgf 
 * day    2018-3-19
 * 客户群业务
 */
 import { businessAPI } from '@f/api/setting'
 export default function clientAction (vm) {
 	return {
 		getClientList: () => {
	 		businessAPI.clientAPI((result) => {
	 			vm.tableData = result;
	 		})
	 	}
 	}
 }