<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item>商品分类</el-breadcrumb-item>
				<el-breadcrumb-item>分类列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content>
			<el-tree :data="tableData" ref="tree" node-key="productCategoryId" :default-checked-keys="selectClass" :props="treeConfig" @check-change="handleCheckChange">
			</el-tree>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import classActionFun from '@f/action/goods/class'
	export default {
		data () {
			return {
				classAction: classActionFun(this),
				tableData: null,
				treeConfig: {
					children: 'childrenList',
					label: 'categoryName'
				}
			}
		},
		created () {
			this.classAction.getGoodsClass();
		},
		methods: {
			handleCheckChange () {

			}
		}
	}
</script>
<style lang="less" scoped>

</style>