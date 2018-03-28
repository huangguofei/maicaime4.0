<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>业务设置</el-breadcrumb-item>
				<el-breadcrumb-item>客户群体</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column prop="customerProfileId" label="编号">
						</el-table-column>
						<el-table-column prop="profileName" label="群体名称">
						</el-table-column>
						<el-table-column prop="identificationCode" label="标识码">
						</el-table-column>
						<el-table-column prop="creationTime" label="创建时间">
						</el-table-column>
						<el-table-column prop="remark" label="备注">
						</el-table-column>
						
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import clientActionFun from '@f/action/set/client'
	export default {
		data () {
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
		created () {
			this.clientAction.getClientList();
		},
		methods: {
			detailRow (row) {
				this.$router.push({
					name: 'filiale.order.sales.detail',
					query: {
						id: row.sellOrderId
					}
				})
			},
			currentChange (page) {
				this.query.pageNum = page
				this.salesOrderAction.getSalesOrderList()
			}
		}
	}
</script>