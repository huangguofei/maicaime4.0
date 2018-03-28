/**
 * author pzh
 * 订单路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/goods/index')), 'indexView')
const salesListView = r => require.ensure([], () => r(require('../view/goods/sales/list')), 'salesListView')
const goodsListView = r => require.ensure([], () => r(require('../view/goods/supply-goods/list')), 'goodsListView')
const router = [
	{
		name: 'warehouse.goods.supply.list',
		path: 'supply/list',
		component: goodsListView
	},
	{
		name: 'warehouse.goods.sales.list',
		path: 'sales/list',
		component: salesListView
	}
]
export default {
	router
}