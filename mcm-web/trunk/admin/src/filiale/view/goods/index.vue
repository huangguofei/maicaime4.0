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
		data() {
			return {
				menus: [{
						name: '供应商品',
						item: [{
								name: '商品列表',
								router: 'filiale.goods.supplier.list'
							},
							{
								name: '添加商品',
								router: 'filiale.goods.supplier.add'
							},
							{
								name: '商品单位',
								router: 'filiale.goods.supplier.unit'
							},
							{
								name: '审核报价',
								router: 'filiale.goods.supplier.audit'
							},
							{
								name: '报价历史',
								router: 'filiale.goods.supplier.offter.record'
							}
						]
					},
					{
						name: '销售商品',
						item: [{
								name: '商品列表',
								router: 'filiale.goods.sales.list'
							},
							{
								name: '添加商品',
								router: 'filiale.goods.sales.add'
							},
							{
								name: '商品报价',
								router: 'filiale.goods.sales.offter'
							},
							{
								name: '审核报价',
								router: 'filiale.goods.sales.audit'
							},
							{
								name: '报价历史',
								router: 'filiale.goods.sales.offter.record'
							}
						]
					},
					{
						name: '商品分类',
						item: [{
							name: '分类详情',
							router: 'filiale.goods.class.tree'
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