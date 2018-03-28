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
							router: 'warehouse.set.account.list'
						},
						{
							name: '角色管理',
							router: 'warehouse.set.role.list'
						}
					]
				},
				{
					name: '个人设置',
					item: [
						{
							name: '基础信息',
							router: 'warehouse.set.user.info'
						},
						{
							name: '修改密码',
							router: 'warehouse.set.user.amendpsw'
						}
					]
				},
				{
					name: '分公司设置',
					item: [
						{
							name: '基础信息',
							router: 'warehouse.set.company.set'
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