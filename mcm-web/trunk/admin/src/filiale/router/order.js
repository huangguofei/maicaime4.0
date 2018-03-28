/**
 * author pzh
 * 订单路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/order/index')), 'indexView')
const salesListView = r => require.ensure([], () => r(require('../view/order/sales/list')), 'salesListView')
const salesDetailView = r => require.ensure([], () => r(require('../view/order/sales/detail')), 'salesDetailView')
const router = [
	{
		name: 'filiale.order.sales.list',
		path: '/sales/list',
		component: salesListView
	},
	{
		name: 'filiale.order.sales.detail',
		path: '/sales/detail',
		component: salesDetailView
	}
]
export default {
	router
}