/**
 * author pzh
 * 订单路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/goods/index')), 'indexView')
const salesListView = r => require.ensure([], () => r(require('../view/goods/sales/list')), 'salesListView')
const router = [
	{
		name: 'admin.goods.index',
		path: '/admin/',
		component: indexView,
		children: [
			{
				name: 'admin.goods.sales.list',
				path: '/',
				component: salesListView
			}
		]
	}
]
export default {
	router
}