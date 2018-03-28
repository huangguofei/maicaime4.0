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
					name: '账户权限',
					item: [
						{
							name: '账号管理',
							router: 'filiale.set.account.list'
						},
						{
							name: '角色管理',
							router: 'filiale.set.role.list'
						}
					]
				},
				{
					name: '业务设置',
					item: [{
							name: '销售扣点',
							router: 'filiale.set.deduction.default'
						},
						{
							name: '客户群体',
							router: 'filiale.set.client.list'
						},
						{
							name: '业务广告',
							router: 'filiale.set.advertising.index'
						}
					]
				},
				{
					name: '个人设置',
					item: [
						{
							name: '基础信息',
							router: 'filiale.set.user.info'
						},
						{
							name: '修改密码',
							router: 'filiale.set.user.amendpsw'
						}
					]
				},
				{
					name: '分公司设置',
					item: [
						{
							name: '基础信息',
							router: 'filiale.set.company.set'
						}
					]
				}
			]
		}
	},
	components: {
		mcmLeftMenu
	},
	created () {
		
	}
}
</script>