const indexView = r => require.ensure([], () => r(require('../view/set/index')), 'indexView')
const userInfoView = r => require.ensure([], () => r(require('../view/set/userSet/user-set')), 'userInfoView')
const useramendPswView = r => require.ensure([], () => r(require('../view/set/userSet/user-amendPsw')), 'useraAmendPswView')

const roleListView = r => require.ensure([], () => r(require('../view/set/role/list')), 'roleListView')
const accountListView = r => require.ensure([], () => r(require('../view/set/account/list')), 'accountListView')

const deductionView = r => require.ensure([], () => r(require('../view/set/deduction/deduction')), 'deductionView')
const customDeductionView = r => require.ensure([], () => r(require('../view/set/deduction/custom-deduction')), 'customDeductionView')

const clientView = r => require.ensure([], () => r(require('../view/set/client/client')), 'clientView')

const companySetView = r => require.ensure([], () => r(require('../view/set/company/company-set')), 'companySetView')

const advertisingView = r => require.ensure([], () => r(require('../view/set/advertising/index')), 'advertisingView')

const router = [{
		name: 'filiale.set.user.info',
		path: 'user/info',
		component: userInfoView
	}, {
		name: 'filiale.set.user.amendpsw',
		path: 'user/amendpsw',
		component: useramendPswView
	}, {
		name: 'filiale.set.role.list',
		path: 'role/list',
		component: roleListView
	}, {
		name: 'filiale.set.account.list',
		path: 'account/list',
		component: accountListView,
		ident: 'set'
	}, {
		name: 'filiale.set.deduction.default',
		path: 'deduction/default',
		component: deductionView
	}, {
		name: 'filiale.set.deduction.custom',
		path: 'deduction/custom',
		component: customDeductionView
	}, {
		name: 'filiale.set.client.list',
		path: 'client/list',
		component: clientView
	}, {
		name: 'filiale.set.company.set',
		path: 'company/set',
		component: companySetView
	}, {
		name: 'filiale.set.advertising.index',
		path: 'advertising/index',
		component: advertisingView
	}]
export default {
	router
}