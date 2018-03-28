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
					name: '店铺',
					item: [
						{
							name: '店铺列表',
							router: 'filiale.shop.shop.list'
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