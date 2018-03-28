import '@f/public/theme/index.css'
import '@f/public/less/common.less'
import '@/common/js/global-components.js'
import '@/common/js/common.js'
import '@f/public/js/config.js'
import '@f/public/js/common.js'
import filiale from '@f/index'
import index from '@f/router/index'
import order from '@f/router/order'
import customer from '@f/router/customer'
import goods from '@f/router/goods'
import shop from '@f/router/shop'
import stock from '@f/router/stock'
import set from '@f/router/set'
import marketing from '@f/router/marketing'
import report from '@f/router/report'

const loginView = r => require.ensure([], () => r(require('../view/login/login')), 'loginView')

let children = []
children = children.concat(order.router)
.concat(customer.router)
.concat(goods.router)
.concat(shop.router)
.concat(stock.router)
.concat(set.router)
.concat(marketing.router)
.concat(index.router)
.concat(report.router)

let router = [
	{
		name: 'filiale.index',
		path: '/filiale/',
		component: filiale,
		children: children
	}, {
		name: 'filiale.login',
		path: '/filiale/login',
		component: loginView
	}
]
export default{
	router
}