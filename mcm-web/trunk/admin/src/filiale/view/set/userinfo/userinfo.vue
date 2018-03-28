<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>分公司设置</el-breadcrumb-item>
				<el-breadcrumb-item>基础信息</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			
			
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import clientActionFun from '@f/action/set/client'
	export default {
		data() {
			return {
				clientAction: clientActionFun(this),
				tableData: null,
				total: 0,
				query: {
					pageNum: 1,
					pageSize: 10
				}
			}
		},
		created() {
			this.clientAction.getClientList();
		},
		methods: {
			detailRow(row) {
				this.$router.push({
					name: 'filiale.order.sales.detail',
					query: {
						id: row.sellOrderId
					}
				})
			},
			currentChange(page) {
				this.query.pageNum = page
				this.salesOrderAction.getSalesOrderList()
			}
		}
	}
</script>