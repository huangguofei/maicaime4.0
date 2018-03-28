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
					name: '供应商品',
					item: [
						{
							name: '商品列表',
							router: 'warehouse.goods.supply.list'
						}
					]
				},
				{
					name: '销售商品',
					item: [
						{
							name: '商品列表',
							router: 'warehouse.goods.sales.list'
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