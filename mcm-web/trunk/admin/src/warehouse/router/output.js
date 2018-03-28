/**
 * author hgf
 * 出库路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/output/index')), 'indexView')
const salesOrderView = r => require.ensure([], () => r(require('../view/output/salesTicket/index')), 'salesOrderView')
const outputOrderView = r => require.ensure([], () => r(require('../view/output/outputOrder/index')), 'outputView')
const router = [
	{
		name: 'warehouse.output.outputOrder.list',
		path: 'outputOrder/list',
		component: outputOrderView
	},
	{
		name: 'warehouse.output.salesOrder.list',
		path: 'salesOrder/list',
		component: salesOrderView
	}
]
export default {
	router
}