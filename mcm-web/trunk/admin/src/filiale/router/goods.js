/**
 * author pzh
 * 商品中心路由配置
 */
const supplierListView = r => require.ensure([], () => r(require('../view/goods/supplier/list')), 'supplierListView')
const supplierAddView = r => require.ensure([], () => r(require('../view/goods/supplier/edit')), 'supplierAddView')
const supplierUnitView = r => require.ensure([], () => r(require('../view/goods/supplier/unit')), 'supplierUnitView')
const supplierAuditView = r => require.ensure([], () => r(require('../view/goods/supplier/audit')), 'supplierAuditView')
const supplierOffterRecordView = r => require.ensure([], () => r(require('../view/goods/supplier/offterRecord')), 'supplierOffterRecordView')

const salesListView = r => require.ensure([], () => r(require('../view/goods/sales/list')), 'salesListView')
const salesEditView = r => require.ensure([], () => r(require('../view/goods/sales/edit')), 'salesEditView')
const salesOffterView = r => require.ensure([], () => r(require('../view/goods/sales/offter')), 'salesOffterView')
const salesAuditView = r => require.ensure([], () => r(require('../view/goods/sales/audit')), 'salesAuditView')
const salesOffterRecordView = r => require.ensure([], () => r(require('../view/goods/sales/offterRecord')), 'salesOffterRecordView')

const goodClassView = r => require.ensure([], () => r(require('../view/goods/class/class')), 'goodClassView')

const pathConfig = 'supplier/'
const salesPath = 'sales/'
const router = [
	{
		name: 'filiale.goods.supplier.list',
		path: pathConfig + 'list',
		component: supplierListView
	},
	{
		name: 'filiale.goods.supplier.add',
		path: pathConfig + 'edit',
		component: supplierAddView
	},
	{
		name: 'filiale.goods.supplier.unit',
		path: pathConfig + 'unit',
		component: supplierUnitView
	},
	{
		name: 'filiale.goods.supplier.audit',
		path: pathConfig + 'audit',
		component: supplierAuditView
	},
	{
		name: 'filiale.goods.supplier.offter.record',
		path: pathConfig + 'offter/record',
		component: supplierOffterRecordView
	},
	{
		name: 'filiale.goods.sales.list',
		path: salesPath + 'list',
		component: salesListView
	},
	{
		name: 'filiale.goods.sales.add',
		path: salesPath + 'edit',
		component: salesEditView
	},
	{
		name: 'filiale.goods.sales.offter',
		path: salesPath + 'offter',
		component: salesOffterView
	},
	{
		name: 'filiale.goods.sales.audit',
		path: salesPath + 'audit',
		component: salesAuditView
	},
	{
		name: 'filiale.goods.sales.offter.record',
		path: salesPath + 'offter/record',
		component: salesOffterRecordView
	},
	{
		name: 'filiale.goods.category.list',
		path: 'goods/class/tree',
		component: goodClassView
	}
]
export default {
	router
}