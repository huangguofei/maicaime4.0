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
						name: '商户',
						item: [{
							name: '商户列表',
							router: 'warehouse.customer.purchaser.list'
						}]
					},
					{
						name: '供应商',
						item: [{
							name: '供应商列表',
							router: 'warehouse.customer.supplier.list'
						}]
					}, {
						name: '司机',
						item: [{
							name: '司机列表',
							router: 'warehouse.customer.driver.list'
						}]
					}
				]
			}
		},
		components: {
			mcmLeftMenu
		}
	}
</script>