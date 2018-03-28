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
					name: '采购单',
					item: [
						{
							name: '采购单列表',
							router: 'warehouse.stock.purchase.list'
						}
					]
				},
				{
					name: '入库单',
					item: [
						{
							name: '入库单列表',
							router: 'warehouse.stock.storage.list'
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