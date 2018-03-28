const indexView = r => require.ensure([], () => r(require('../view/index/index')), 'indexView')
const router = [
	{
		name: 'filiale.index',
		path: '/',
		component: indexView
	}
]
export default {
	router
}