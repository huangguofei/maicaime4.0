/**
 * author pzh
 * 进货单路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/stock/index')), 'indexView')
const purchaseListView = r => require.ensure([], () => r(require('../view/stock/purchase/list')), 'purchaseListView')
const purchaseDetailView = r => require.ensure([], () => r(require('../view/stock/purchase/detail')), 'purchaseDetailView')
const storageListView = r => require.ensure([], () => r(require('../view/stock/storage/list')), 'storageListView')
const createdStorageView = r => require.ensure([], () => r(require('../view/stock/storage/created')), 'createdStorageView')
const storageDetailView = r => require.ensure([], () => r(require('../view/stock/storage/detail')), 'storageDetailView')
const router = [
	{
		name: 'warehouse.stock.purchase.list',
		path: 'purchase/list',
		component: purchaseListView
	},
	{
		name: 'warehouse.stock.storage.list',
		path: 'storage/list',
		component: storageListView
	},
	{
		name: 'warehouse.stock.purchase.detail',
		path: 'purchase/detail',
		component: purchaseDetailView
	},
	{
		name: 'warehouse.stock.storage.created',
		path: 'storage/created',
		component: createdStorageView
	},
	{
		name: 'warehouse.stock.storage.detail',
		path: 'storage/detail',
		component: storageDetailView
	}
]
export default {
	router
}