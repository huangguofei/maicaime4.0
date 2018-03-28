/**
 * author pzh
 * 店铺路由配置
 */
const indexView = r => require.ensure([], () => r(require('../view/shop/index')), 'indexView')
const shopListView = r => require.ensure([], () => r(require('../view/shop/shop/list')), 'shopListView')
const setGoodsView = r => require.ensure([], () => r(require('../view/shop/shop/setGoods')), 'setGoodsView')
const shopDetailView = r => require.ensure([], () => r(require('../view/shop/shop/detail')), 'shopDetailView')
const router = [
	{
		name: 'filiale.shop.shop.list',
		path: 'shop/list',
		component: shopListView
	},
	{
		name: 'filiale.shop.shop.set.goods',
		path: 'set/goods',
		component: setGoodsView
	},
	{
		name: 'filiale.shop.shop.detail',
		path: 'detail',
		component: shopDetailView
	}
]
export default {
	router
}