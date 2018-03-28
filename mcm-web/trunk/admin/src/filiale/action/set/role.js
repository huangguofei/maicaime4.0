/**
 * author pzh 
 * day    2018-3-6
 * 角色业务
 */
 import {roleAPI} from '@f/api/setting'
 export default function roleAction (vm) {
 	return {
 		getRoleList: () => {
	 		roleAPI.roleListAPI((result) => {
	 			vm.tableData = result
	 		})
	 	}
 	}
 }