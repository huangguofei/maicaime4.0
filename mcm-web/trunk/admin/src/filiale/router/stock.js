/**
 * author pzh
 * 进货路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/stock/index')), 'indexView')
const purchaseListView = r => require.ensure([], () => r(require('../view/stock/purchase/list')), 'purchaseListView')
const purchaseSupplierProdView = r => require.ensure([], () => r(require('../view/stock/purchase/addSupplierProd')), 'purchaseSupplierProdView')
const purchaseDetailView = r => require.ensure([], () => r(require('../view/stock/purchase/detail')), 'purchaseDetailView')
const router = [
	{
		name: 'filiale.order.purchase.list',
		path: 'purchase/list',
		component: purchaseListView
	},
	{
		name: 'filiale.order.purchase.supplier.prod',
		path: 'purchase/supplier/prod',
		component: purchaseSupplierProdView
	},
	{
		name: 'filiale.order.purchase.detail',
		path: 'purchase/detail',
		component: purchaseDetailView
	}
]
export default {
	router
}