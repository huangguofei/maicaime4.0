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
					name: '分拣',
					item: [
						{
							name: '创建分拣任务',
							router: 'warehouse.sorting.task.created'
						},
						{
							name: '分拣任务列表',
							router: 'warehouse.sorting.task.list'
						}
					]
				},
				{
					name: '预出库记录',
					item: [
						{
							name: '预出库列表',
							router: 'warehouse.sorting.predict.list'
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