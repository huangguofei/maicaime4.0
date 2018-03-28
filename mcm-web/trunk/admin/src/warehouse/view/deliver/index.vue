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
					name: '配送单',
					item: [
						{
							name: '配送单列表',
							router: 'warehouse.deliver.list'
						}
					]
				},
				{
					name: '创建配送单',
					item: [
						{
							name: '创建配送',
							router: 'warehouse.deliver.add'
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