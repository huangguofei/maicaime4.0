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
						name: '商户中心',
						item: [{
								name: '商户列表',
								router: 'filiale.customer.purchaser.list'
							}
						]
					},
					{
						name: '供应商',
						item: [{
								name: '供应商列表',
								router: 'filiale.customer.supplier.list'
							}
//						,
//							{
//								name: '添加供应商',
//								router: 'filiale.customer.supplier.add'
//							}
						]
					},
					{
						name: '司机',
						item: [{
								name: '司机列表',
								router: 'filiale.customer.driver.list'
							}
						]
					},
					{
						name: '中心仓',
						item: [{
								name: '中心仓列表',
								router: 'filiale.customer.warehouse.list'
							}
//						,
//							{
//								name: '开设中心仓',
//								router: 'filiale.customer.warehouse.add'
//							}
						]
					}
//					,
//					{
//						name: '黑名单',
//						item: [{
//								name: '黑名单列表',
//								router: ''
//							},
//							{
//								name: '拉入黑名单',
//								router: ''
//							}
//						]
//					}
				]
			}
		},
		components: {
			mcmLeftMenu
		}
	}
</script>