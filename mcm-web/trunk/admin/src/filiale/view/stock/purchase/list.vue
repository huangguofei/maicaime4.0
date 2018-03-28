<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>进货</el-breadcrumb-item>
			  <el-breadcrumb-item>进货单</el-breadcrumb-item>
			  <el-breadcrumb-item>采购单</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
				<el-button type="primary" size="small" @click="createPurchase">创建采购单</el-button>
			   <!--  <el-button type="primary" size="small">从订单拉取需求</el-button> -->
		</mcm-page-search>
		<mcm-page-content class="stock-purchase">
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
					      prop="productCount"
					      label="商品数量"
					      width="220">
					    </el-table-column>
					    <el-table-column
					      prop="productTotalQuantity"
					      label="总供量"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="remark"
					      label="备注"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="creationTime"
					      label="创建时间"
					      >
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
import purchaseActionFun from '@f/action/stock/purchase'
export default{
	data () {
		return {
			purchaseAction: purchaseActionFun(this),
			tableData: null,
			selectedOptions: [],
			categoryList: [],
			total: 0,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			}
		}
	},
	created () {
		this.purchaseAction.getPurchaseList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.purchaseAction.getPurchaseList()
		},
		createPurchase () {
			this.$router.push({
				name: 'filiale.order.purchase.supplier.prod'
			})
		},
		detailRow (row) {
			this.$router.push({
				name: 'filiale.order.purchase.detail',
				query: {
					id: row.purchaseOrderId
				}
			})
		}
	}
}
</script>