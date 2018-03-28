/**
 * author hgf
 * 配送路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/deliver/index')), 'indexView')
const deliverListView = r => require.ensure([], () => r(require('../view/deliver/deliverList/index')), 'deliverListView')
const addDeliverView = r => require.ensure([], () => r(require('../view/deliver/addDeliver/index')), 'addDeliverView')
const router = [
	{
		name: 'warehouse.deliver.list',
		path: '/deliver/list',
		component: deliverListView
	},
	{
		name: 'warehouse.deliver.add',
		path: '/deliver/add',
		component: addDeliverView
	}
]
export default {
	router
}