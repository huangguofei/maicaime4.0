/**
 * author hgf 
 * day    2018-3-20
 * 广告业务
 */
 import { businessAPI } from '@f/api/setting'
 export default function advertisingAction (vm) {
 	return {
 		getAdvertising: () => {
	 		businessAPI.advertisingAPI((result) => {
	 			vm.tableData = JSON.parse(result);
	 		});
	 	},
	 	addAdvertising: (options) => {
	 		businessAPI.advertisingSaveAPI(options, (result) => {
	 			vm.$message({
	 				message: '添加成功！',
	 				type: 'success'
	 			})
	 			vm.diaAccount.show = false;
	 			vm.loadData();
	 		});
	 	},
	 	editAdvertising: (options) => {
	 		businessAPI.advertisingEditAPI(options, (result) => {
	 			vm.$message({
	 				message: '修改成功！',
	 				type: 'success'
	 			})
	 			vm.diaAccount.show = false;
	 			vm.loadData();
	 		});
	 	}
 	}
 }