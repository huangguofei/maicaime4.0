<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>订单中心</el-breadcrumb-item>
			  <el-breadcrumb-item>销售单</el-breadcrumb-item>
			  <el-breadcrumb-item>销售单列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table
					    :data="tableData"
					    style="width: 100%"
					    >
					   <el-table-column
					      fixed
					      type="index"
					      width="50">
					    </el-table-column>
					    <el-table-column
					      label="商户名称"
					      width="240">
					       <template slot-scope="scope">
					        {{scope.row.buyer.buyerName}}
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="orderStatusText"
					      label="状态"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="submitedTime"
					      label="下单时间"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="payableAmount"
					      label="应付金额"
					     >
					    </el-table-column>
					     <el-table-column
					      prop="totalAmount"
					      label="实付金额"
					      >
					       <template slot-scope="scope">
					       	<p>{{scope.row.totalAmount>0?scope.row.totalAmount:0}}</p>
					       	</template>
					    </el-table-column>
					     <el-table-column
					      prop="deliveryWayText"
					      label="支付类型"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      fixed="right"
					      label="操作"
					      width="120">
					      <template slot-scope="scope">
					        <el-button
					          @click="detailRow(scope.row)"
					          type="text"
					          size="small">
					          详情
					        </el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import salesOrderActionFun from '@f/action/order/sales'
export default{
	data () {
		return {
			salesOrderAction: salesOrderActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			}
		}
	},
	created () {
		this.salesOrderAction.getSalesOrderList()
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