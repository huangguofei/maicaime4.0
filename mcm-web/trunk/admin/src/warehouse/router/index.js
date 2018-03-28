const indexView = r => require.ensure([], () => r(require('../view/index/index')), 'indexView')
const router = [
	{
		name: 'warehouse.index',
		path: '/',
		component: indexView
	}
]
export default {
	router
}