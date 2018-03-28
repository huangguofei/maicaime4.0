/*
 * author pzh
 * 开发环境
 */
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import CommonJs from '@/common/js/common'
import HelloWorld from '@/components/HelloWorld'
import adminRouter from '@/admin/router/router'
import filialeRouter from '@/filiale/router/router'
import warehouseRouter from '@/warehouse/router/router'
import ElementUI from 'element-ui'
import '@/common/less/common.less'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(ElementUI)
window.cJs = CommonJs
/* eslint-disable no-new */
let routerArray = [{
	path: '/',
	name: 'HelloWorld',
	component: HelloWorld
}]
routerArray = routerArray.concat(adminRouter.router)
	.concat(filialeRouter.router)
	.concat(warehouseRouter.router)
var router = new Router ({
	mode: 'history',
	base: __dirname,
	routes: routerArray
})
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
});
Vue.filter('PRICE', (v) => {
	if(v === '' || v === 0) {
		return '0.00';
	}
	v = Math.abs(v);
	if(v < 0.01) {
		return 0.01;
	}
	return(v * 100 / 100).toFixed(2);
});