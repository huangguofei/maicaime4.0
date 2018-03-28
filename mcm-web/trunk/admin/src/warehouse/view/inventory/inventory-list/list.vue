<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>库存</el-breadcrumb-item>
				<el-breadcrumb-item>库存查询</el-breadcrumb-item>
				<el-breadcrumb-item>库存列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-tab :tabs="tabs"></mcm-page-tab>
		<mcm-page-search>搜索区域</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column prop="productName" label="商品名">
						</el-table-column>
						<el-table-column prop="productUnit" label="单位">
						</el-table-column>
						<el-table-column prop="totalStock" label="总库存">
						</el-table-column>
						<el-table-column prop="availableStock" label="可用库存">
						</el-table-column>
						<el-table-column prop="creationTime" label="创建时间">
						</el-table-column>
						<el-table-column prop="remark" label="备注">
						</el-table-column>
						<!--<el-table-column fixed="right" label="操作" width="160">
							<template slot-scope="scope">
								<el-button @click="detailRow(scope.row)" type="text" size="small">
									详情
								</el-button>
							</template>
						</el-table-column>-->
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import inventoryActionFun from '@w/action/inventory/inventory'
	export default {
		data () {
			return {
				tabs: [],
				tableData: [],
				total: 0,
				inventoryAction: inventoryActionFun(this),
				selectRow: {},
				query: {
					pageNum: 1,
					pageSize: 20
				}
			}
		},
		created () {
			this.initPage();
		},
		methods: {
			initPage () {
				this.loadList();
			},
			loadList () {
				this.inventoryAction.getInventoryList();
			},
			currentChange () {
				this.query.pageNum = page
				this.initPage();
			}
		}
	}
</script>