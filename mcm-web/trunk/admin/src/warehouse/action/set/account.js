/**
 * author pzh 
 * day    2018-3-6
 * 角色业务
 */
 import {accountAPI, roleAPI} from '@w/api/setting'
 export default function accountAction (vm) {
 	return {
 		getAccountList: () => {
 			var params = cJs.clearNullField(vm.query)
	 		accountAPI.listAPI(params, (result) => {
	 			vm.total = result.totalCount
	 			vm.tableData = result.resultList
	 		})
	 	},
	 	shelvesOffTheShelf: (row) => {
	 	 	function _success () {
	 	 		row.statusId = row.statusId === 1 ? 0 : 1
	 	 		vm.$message(row.statusId ? '禁用成功' : '启用成功')
	 	 	}
	 	 	row.statusId === 1 ? accountAPI.disableAPI((result) => {
	 	 		_success()
	 	 	}) : accountAPI.enableAPI((result) => {
	 	 		_success()
	 	 	})
	 	},
	 	getRoleList: () => {
	 		roleAPI.roleListAPI((result) => {
	 			vm.roleList = result
	 		})
	 	},
	 	saveAccount: () => {
	 		var params = vm.ruleForm
	 		accountAPI.saveAPI(params, (result) => {
	 			vm.$message('保存成功')
	 			vm.accountAction.getAccountList()
	 			vm.resetForm('ruleForm')
	 			vm.diaAccount.show = false
	 		})
	 	},
	 	updateRoles: () => {
	 		accountAPI.updateRoleAPI(vm.editRole, (result) => {
	 			vm.$message('编辑成功')
	 			vm.accountAction.getAccountList()
	 			vm.diaRule = false
	 		})
	 	}
 	}
 }