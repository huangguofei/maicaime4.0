import '@w/public/theme/index.css'
import '@w/public/less/common.less'
import '@/common/js/global-components.js'
import '@/common/js/common.js'
import '@w/public/js/config.js'
import '@w/public/js/common.js'
import warehouse from '@w/index'
import index from '@w/router/index'
import goods from '@w/router/goods'
import stock from '@w/router/stock'
import sorting from '@w/router/sorting'
import customer from '@w/router/customer'
import output from '@w/router/output'
import deliver from '@w/router/deliver'
import inventory from '@w/router/inventory'
import set from '@w/router/set'

const indexView = r => require.ensure([], () => r(require('../view/login/login')), 'indexView')

let children = []
children = children.concat(goods.router)
.concat(stock.router)
.concat(sorting.router)
.concat(customer.router)
.concat(output.router)
.concat(deliver.router)
.concat(inventory.router)
.concat(set.router)
.concat(index.router)

let router = [{
	name: 'warehouse.index',
	path: '/warehouse/',
	component: warehouse,
	children: children
}, {
	name: 'warehouse.login',
	path: '/warehouse/login',
	component: indexView
}]
export default {
	router
}