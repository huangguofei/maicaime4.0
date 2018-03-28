<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>进货</el-breadcrumb-item>
			  <el-breadcrumb-item>入库单</el-breadcrumb-item>
			  <el-breadcrumb-item>入库单列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
				
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
		}
	}
}
</script>