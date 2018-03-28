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
	export default {
		data () {
			return {
				menus: [{
						name: '销售单',
						item: [{
								name: '订单列表',
								router: 'warehouse.output.salesOrder.list'
							}
						]
					},
					{
						name: '出库单',
						item: [{
								name: '订单列表',
								router: 'warehouse.output.outputOrder.list'
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