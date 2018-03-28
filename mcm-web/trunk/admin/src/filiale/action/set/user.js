/**
 * author hgf 
 * day    2018-3-23
 * 个人设置业务
 */
import { userAPI } from '@f/api/setting'
export default function userInfoAction (vm) {
	return {
		getUserInfo: () => {
			userAPI.userInfoAPI((result) => {
				vm.userData = result;
				vm.previousData = JSON.parse(JSON.stringify(result));
			})
		},
		userSet: () => {
			userAPI.userInfoEditAPI(vm.userData, (result) => {
				vm.$message({
					message: '修改成功！',
					type: 'success'
				});
				vm.type = 'show';
				vm.loadUserInfo();
			})
		},
		pswEdit: () => {
			userAPI.userInfoEditPswAPI(vm.pswData, (result) => {
				vm.$message({
					message: '修改成功！',
					type: 'success'
				});
				vm.pswData = {
					newUserPassword: '',
					oldUserPassword: '',
					oldUserPasswords: ''
				}
			})
		}
	}
}