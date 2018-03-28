/**
 * author hgf 
 * day    2018-3-19
 * 仓库业务
 */
import { warehouseAPI } from '@w/api/setting'
export default function warehouseAction (vm) {
	return {
		getWarehouseInfo: () => {
			warehouseAPI.warehouseInfoAPI((result) => {
				vm.warehouseData = result;
				vm.previousData = result;
			})
		},
		warehouseSet: () => {
			warehouseAPI.warehouseSetAPI(vm.warehouseData, (result) => {
				vm.$message({
					message: '修改成功！',
					type: 'success'
				});
				vm.type = 'show';
				vm.loadWarehouse();
			})
		}
	}
}