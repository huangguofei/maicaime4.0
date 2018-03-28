/**
 * author hgf
 * 报表由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/report/index')), 'indexView')
const deductionListView = r => require.ensure([], () => r(require('../view/report/deduction/list')), 'deductionListView')
const deductionDetailView = r => require.ensure([], () => r(require('../view/report/deduction/detail')), 'deductionDetailView')
const billListView = r => require.ensure([], () => r(require('../view/report/bill/list')), 'billListView')

const router = [
	{
		name: 'filiale.report.deduction.list',
		path: 'report/deduction/list',
		component: deductionListView
	},
	{
		name: 'filiale.report.deduction.detail',
		path: 'report/deduction/detail',
		component: deductionDetailView
	},
	{
		name: 'filiale.report.bill.list',
		path: 'report/bill/list',
		component: billListView
	}
]

export default {
	router
}