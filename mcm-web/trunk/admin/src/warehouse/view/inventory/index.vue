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
						name: '库存',
						item: [{
							name: '库存查询',
							router: 'warehouse.inventory.list'
						}]
					},
					{
						name: '商品报损',
						item: [{
							name: '录入报损',
							router: 'warehouse.inventory.breakage.add'
						},
						{
							name: '报损记录',
							router: 'warehouse.inventory.breakage.list'
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