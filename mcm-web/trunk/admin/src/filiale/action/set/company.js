/**
 * author hgf 
 * day    2018-3-19
 * 分公司业务
 */
import { companyAPI } from '@f/api/setting'
export default function companyAction (vm) {
	return {
		getCompanyInfo: () => {
			companyAPI.companyInfoAPI((result) => {
				vm.companyData = result;
				vm.previousData = result;
			})
		},
		companySet: () => {
			companyAPI.companySetAPI(vm.companyData, (result) => {
				vm.$message({
					message: '修改成功！',
					type: 'success'
				});
				vm.type = 'show';
				vm.loadCompany();
			})
		}
	}
}