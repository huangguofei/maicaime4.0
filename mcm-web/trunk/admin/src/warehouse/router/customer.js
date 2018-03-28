/**
 * author pzh
 * 客户路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/customer/index')), 'indexView')
const purchaserListView = r => require.ensure([], () => r(require('../view/customer/purchaser/list')), 'purchaserListView')

const supplierListView = r => require.ensure([], () => r(require('../view/customer/supplier/list')), 'supplierListView')

const driverListView = r => require.ensure([], () => r(require('../view/customer/driver/list')), 'driverListView')

const router = [
	{
		name: 'warehouse.customer.purchaser.list',
		path: 'purchaser/list',
		component: purchaserListView
	},
	{
		name: 'warehouse.customer.supplier.list',
		path: 'supplier/list',
		component: supplierListView
	},
	{
		name: 'warehouse.customer.driver.list',
		path: 'driver/list',
		component: driverListView
	}
]
export default {
	router
}