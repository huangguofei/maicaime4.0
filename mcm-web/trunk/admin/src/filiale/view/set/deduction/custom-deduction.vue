<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>业务设置</el-breadcrumb-item>
				<el-breadcrumb-item>自定义扣点</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-tab :tabs="tabs"></mcm-page-tab>
		<!--<mcm-page-search>搜索区域</mcm-page-search>-->
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<!--
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						-->
						<el-table-column prop="salesPointId" label="扣点编号">
						</el-table-column>
						<el-table-column prop="salesPointWayText" label="扣点方法">
						</el-table-column>
						<!-- 1是商品，2是分类-->
						<el-table-column prop="salesPointWayId" label="参考对象">
							<template slot-scope="scope" >
								<div v-if="scope.row.salesPointWayId === 1">{{scope.row.salesPointWayRef.productName}} </div>
								<div v-if="scope.row.salesPointWayId === 2">{{scope.row.salesPointWayRef.categoryName}} </div>
								<div v-else>未知</div>
					      	</template>
						</el-table-column>
						<el-table-column prop="supplierSalesPointRatio" label="供应商扣点">
						</el-table-column>
						<el-table-column prop="warehouseSalesPointReceiveRatio" label="中心仓收益比例">
						</el-table-column>
						<el-table-column prop="companySalesPointReceiveRatio" label="分公司收益比例">
						</el-table-column>
						<el-table-column prop="yuehouSalesPointReceiveRatio" label="总部收益比例">
						</el-table-column>
						<el-table-column prop="creator" label="创建者">
						</el-table-column>
						<el-table-column prop="effectiveStartTime" label="开始时间">
						</el-table-column>
						<el-table-column prop="effectiveEndTime" label="结束时间">
						</el-table-column>
						<el-table-column prop="creationTime" label="创建时间">
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import deductionActionFun from '@f/action/set/deduction'
	export default {
		data () {
			return {
				tabs: [{
					name: '默认扣点',
					router: 'filiale.set.deduction.default'
				},
				{
					name: '自定义扣点',
					router: 'filiale.set.deduction.custom',
					active: true
				}],
				tableData: [],
				total: 0,
				deductionAction: deductionActionFun(this),
				selectRow: {},
				query: {
					pageNum: 1,
					pageSize: 20,
					salesPointId: ''
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
				this.deductionAction.getCustomDeduction();
			},
			currentChange () {
				this.query.pageNum = page
				this.initPage();
			}
		}
	}
</script>