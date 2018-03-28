const indexView = r => require.ensure([], () => r(require('../view/marketing/index')), 'indexView')

const couponListView = r => require.ensure([], () => r(require('../view/marketing/coupon/list')), 'couponListView')
const giveOutRecordView = r => require.ensure([], () => r(require('../view/marketing/coupon/giveOutRecord')), 'giveOutRecordView')

const router = [
	{
		name: 'filiale.marketing.coupon.list',
		path: 'coupon/list',
		component: couponListView
	}, {
		name: 'filiale.marketing.coupon.giveOutRecord',
		path: 'coupon/giveOutRecord',
		component: giveOutRecordView
	}
]
export default {
	router
}