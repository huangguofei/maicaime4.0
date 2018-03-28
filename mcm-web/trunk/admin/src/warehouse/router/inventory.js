/**
 * author hgf
 * 库存路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/inventory/index')), 'indexView')
const inventoryListView = r => require.ensure([], () => r(require('../view/inventory/inventory-list/list')), 'inventoryListView')
const addBreakageView = r => require.ensure([], () => r(require('../view/inventory/goods-breakage/add-breakage')), 'addBreakageView')
const deliverRecordView = r => require.ensure([], () => r(require('../view/inventory/goods-breakage/breakage-record')), 'deliverRecordView')
const detailView = r => require.ensure([], () => r(require('../view/inventory/goods-breakage/detail')), 'detailView')
const router = [
	{
		name: 'warehouse.inventory.list',
		path: 'list',
		component: inventoryListView
	},
	{
		name: 'warehouse.inventory.breakage.add',
		path: 'breakage/add',
		component: addBreakageView
	},
	{
		name: 'warehouse.inventory.breakage.list',
		path: 'breakage/list',
		component: deliverRecordView
	},
	{
		name: 'warehouse.inventory.breakage.detail',
		path: 'breakage/detail',
		component: detailView
	}
]
export default {
	router
}