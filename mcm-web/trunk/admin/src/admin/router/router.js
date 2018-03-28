import '@a/public/theme/index.css'
import '@a/public/less/common.less'
import '@/common/js/global-components.js'
import admin from '@a/index'
import goods from '@a/router/goods'

let children = []
children = children.concat(goods.router)
let router = [
	{
		name: 'admin.index',
		path: '/admin/',
		component: admin,
		children: children
	}
]
export default{
	router
}