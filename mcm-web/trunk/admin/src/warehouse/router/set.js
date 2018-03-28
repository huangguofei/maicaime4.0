const indexView = r => require.ensure([], () => r(require('../view/set/index')), 'indexView')

const roleListView = r => require.ensure([], () => r(require('../view/set/role/list')), 'roleListView')
const accountListView = r => require.ensure([], () => r(require('../view/set/account/list')), 'accountListView')

const userInfoView = r => require.ensure([], () => r(require('../view/set/userSet/user-set')), 'userInfoView')
const useramendPswView = r => require.ensure([], () => r(require('../view/set/userSet/user-amendPsw')), 'useraAmendPswView')

const warehouseSetView = r => require.ensure([], () => r(require('../view/set/warehouse/warehouse-set')), 'warehouseSetView')
const router = [
	{
		name: 'warehouse.set.role.list',
		path: 'role/list',
		component: roleListView
	}, {
		name: 'warehouse.set.account.list',
		path: 'account/list',
		component: accountListView
	}, {
		name: 'warehouse.set.company.set',
		path: 'warehouse/set',
		component: warehouseSetView
	},
	{
		name: 'warehouse.set.user.info',
		path: 'user/info',
		component: userInfoView
	}, {
		name: 'warehouse.set.user.amendpsw',
		path: 'user/amendpsw',
		component: useramendPswView
	}
]
export default {
	router
}