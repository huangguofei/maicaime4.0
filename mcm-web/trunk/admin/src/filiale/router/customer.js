/**
 * author pzh
 * 客户路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/customer/index')), 'indexView')
const purchaserListView = r => require.ensure([], () => r(require('../view/customer/purchaser/list')), 'purchaserListView')

const supplierListView = r => require.ensure([], () => r(require('../view/customer/supplier/list')), 'supplierListView')
const supplierAddView = r => require.ensure([], () => r(require('../view/customer/supplier/add')), 'supplierAddView')

const driverListView = r => require.ensure([], () => r(require('../view/customer/driver/list')), 'driverListView')

const warehouseListView = r => require.ensure([], () => r(require('../view/customer/warehouse/list')), 'warehouseListView')
const warehouseAddView = r => require.ensure([], () => r(require('../view/customer/warehouse/add')), 'warehouseAddView')

const router = [
	{
		name: 'filiale.customer.purchaser.list',
		path: 'purchaser/list',
		component: purchaserListView
	},
	{
		name: 'filiale.customer.supplier.list',
		path: 'supplier/list',
		component: supplierListView
	},
	{
		name: 'filiale.customer.supplier.add',
		path: 'supplier/add',
		component: supplierAddView
	},
	{
		name: 'filiale.customer.driver.list',
		path: 'driver/list',
		component: driverListView
	},
	{
		name: 'filiale.customer.warehouse.list',
		path: 'warehouse/list',
		component: warehouseListView
	},
	{
		name: 'filiale.customer.warehouse.add',
		path: 'warehouse/add',
		component: warehouseAddView
	}
]
export default {
	router
}