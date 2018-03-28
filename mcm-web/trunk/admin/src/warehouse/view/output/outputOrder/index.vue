<template>
	<mcm-page-area>
		<mcm-page-title>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>出库</el-breadcrumb-item>
			<el-breadcrumb-item>出库单</el-breadcrumb-item>
			<el-breadcrumb-item>出库单列表</el-breadcrumb-item>
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
						<el-table-column prop="stockOutId" label="单据编号" width="220">
						</el-table-column>
						<el-table-column prop="creationTime" label="出库时间">
						</el-table-column>
						<el-table-column prop="warehouseId" label="操作人">
						</el-table-column>
						<el-table-column prop="supplierId" label="供应商">
						</el-table-column>
						<el-table-column prop="productCount" label="出库商品种数">
						</el-table-column>
						<el-table-column prop="productTotalQuantity" label="出库总量">
						</el-table-column>
						<el-table-column prop="productTotalQuantity" label="备注">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="160">
							<template slot-scope="scope">
								<el-button @click="detailRow(scope.row)" type="text" size="small">
									详情
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="出库单详情" :visible.sync="detailShow" width="1000px" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="12"><span class="name">出库单号：</span><span class="val">{{selectRow.stockOutId}}</span></el-col>
				</el-row>
				<el-row :gutter="20" class="item">
				<el-col :span="12"><span class="name">供应商：</span><span class="val">{{selectRow.supplierId}}</span></el-col>
				</el-row>
				<el-row :gutter="20" class="item">
				<el-col :span="12"><span class="name">出库时间：</span><span class="val">{{selectRow.creationTime}}</span></el-col>
				</el-row>
				<el-row :gutter="20" class="item">
				<el-col :span="12"><span class="name">操作人：</span><span class="val">{{selectRow.warehouseId}}</span></el-col>
				</el-row>
			<el-table :data="selectRow.products" style="width: 100%">
					<el-table-column fixed type="index" width="50">
					</el-table-column>
					<el-table-column prop="products" label="商品名称">
					</el-table-column>
					<el-table-column prop="stockOutId" label="SKUID">
					</el-table-column>
					<el-table-column prop="productUnit" label="单位">
					</el-table-column>
					<el-table-column prop="stockOutQuantity" label="数量">
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					</el-table-column>
			</el-table>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import outputActionFun from '@w/action/output/output'
	export default {
		data () {
			return {
				tabs: [],
				tableData: [],
				total: 0,
				outputAction: outputActionFun(this),
				detailShow: false,
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
				this.outputAction.getOutputList();
			},
			currentChange (page) {
				this.query.pageNum = page
				this.initPage();
			},
			detailRow (row) {
				this.detailShow = true
				this.outputAction.getOutputDetails({stockOutId: row.stockOutId})
			}
		}
	}
</script>