/*
 * author pzh
 * 生产环境
 */
import Vue from 'vue'
import App from '@/App'
import Router from 'vue-router'
import CommonJs from '@/common/js/common'
import warehouseRouter from '@/warehouse/router/router'
import ElementUI from 'element-ui'
import '@/common/less/common.less'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(ElementUI)
window.cJs = CommonJs
/* eslint-disable no-new */
let routerArray = []
routerArray = routerArray.concat(warehouseRouter.router)
var router = new Router({
	mode: 'history',
	base: __dirname,
  	routes: routerArray
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})