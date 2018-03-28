/**
 * author pzh
 * 分拣路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/sorting/index')), 'indexView')
const taskListView = r => require.ensure([], () => r(require('../view/sorting/task/list')), 'taskListView')
const taskDetailView = r => require.ensure([], () => r(require('../view/sorting/task/detail')), 'taskDetailView')
const taskCreatedView = r => require.ensure([], () => r(require('../view/sorting/task/created')), 'taskCreatedView')
const predictListView = r => require.ensure([], () => r(require('../view/sorting/predict/list')), 'predictListView')
const predictDetailView = r => require.ensure([], () => r(require('../view/sorting/predict/detail')), 'predictDetailView')
const router = [
	{
		name: 'warehouse.sorting.task.list',
		path: 'task/list',
		component: taskListView
	},
	{
		name: 'warehouse.sorting.task.detail',
		path: 'task/detail',
		component: taskDetailView
	},
	{
		name: 'warehouse.sorting.task.created',
		path: 'task/created',
		component: taskCreatedView
	},
	{
		name: 'warehouse.sorting.predict.list',
		path: 'predict/list',
		component: predictListView
	},
	{
		name: 'warehouse.sorting.predict.detail',
		path: 'predict/detail',
		component: predictDetailView
	}
]
export default {
	router
}