<template>
	<el-container>
		<el-aside width="200px" class="left">
			<mcm-left-menu :menus="menus"></mcm-left-menu>
		</el-aside>
		<el-main class="main-area">
			<router-view />
		</el-main>
	</el-container>
</template>
<script>
import mcmLeftMenu from '@cp/mcm-left-menu'
export default{
	data () {
		return {
			menus: [
				{
					name: '优惠券',
					item: [
						{
							name: '优惠券列表',
							router: 'filiale.marketing.coupon.list'
						},
						{
							name: '派发记录',
							router: 'filiale.marketing.coupon.giveOutRecord'
						}
					]
				}
			]
		}
	},
	components: {
		mcmLeftMenu
	}
}
</script>