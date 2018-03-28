const indexView = r => require.ensure([], () => r(require('../view/index/index')), 'indexView')
const router = [
	{
		name: 'admin.index',
		path: '/admin/',
		component: indexView
	}
]
export default {
	router
}