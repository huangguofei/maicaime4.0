<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>报表中心</el-breadcrumb-item>
				<el-breadcrumb-item>销售扣点</el-breadcrumb-item>
				<el-breadcrumb-item>扣点列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		 <mcm-page-search>
		 	<el-form :model="query" :inline='true' ref="ruleForm" label-width="100px" class="demo-ruleForm" >
  				<el-form-item label="查询日期">
  					<el-date-picker size="small" v-model="query.date" format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
  				</el-form-item>
  				<el-form-item>
    				<el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
  				</el-form-item>
  			</el-form>	
		 </mcm-page-search> 
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column prop="supplierName" label="供应商名称">
						</el-table-column>
						<el-table-column prop="sellOrderPayableAmount" label="订单应付总额">
						</el-table-column>
						<el-table-column prop="sellOrderTotalAmount" label="订单实付总额">
						</el-table-column>
						<el-table-column prop="totalSettleAmount" label="结算实付总额">
						</el-table-column>
						<!--<el-table-column prop="payableSettleAmount" label="结算应付总额">
						</el-table-column>-->
						<el-table-column prop="sellOrderDiscountAmount" label="优惠金额">
						</el-table-column>
						<el-table-column prop="yuehouSalesPointReceiveAmount" label="总部应得金额">
						</el-table-column>
						<el-table-column prop="companySalesPointReceiveAmount" label="分公司应得金额">
						</el-table-column>
							<el-table-column prop="warehouseSalesPointReceiveAmount" label="中心仓应得金额">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click.native.prevent="shopDetails(scope.row)" type="primary" size="small">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import deductionActionFun from '@f/action/report/deduction'
	export default {
		data () {
			return {
				deductionAction: deductionActionFun(this),
				tableData: null,
				total: 0,
				query: {
					date: new Date().toLocaleDateString().replace(/\//g, '-')
				}
			}
		},
		created () {
			this.deductionAction.getDeductionList();
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
			onSubmit () {
				this.deductionAction.getDeductionList();
			},
			shopDetails (data) {
				this.$router.push({
					name: 'filiale.report.deduction.detail',
					query: {
						id: data.supplierId,
						date: this.query.date
					}
				});
			}
		}
	}
</script>