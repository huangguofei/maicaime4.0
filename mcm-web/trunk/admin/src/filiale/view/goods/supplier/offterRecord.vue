<!-- 报价历史 -->
<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>供应商品</el-breadcrumb-item>
			  <el-breadcrumb-item>报价历史</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
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
					      label="商品名"
					      width="240">
					       <template slot-scope="scope">
					      		{{scope.row.skuProduct.productName}}
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="skuUnit"
					      label="单位"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      label="报价"
					      width="120">
					      <template slot-scope="scope">
					      	{{(scope.row.skuPrice * 1).toFixed(2)}}
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="auditStatusText"
					      label="审核结果"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="auditRemark"
					      label="审核意见"
					      >
					    </el-table-column>
					     <el-table-column
					      prop="skuPriceOfferTime"
					      label="报价时间"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="creationTime"
					      label="操作时间"
					      >
					    </el-table-column>
					  </el-table>
				</div>

			</mcm-table-area>
			<mcm-pagination :total="total" :pageSize="query.pageSize" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import supplierActionFun from '@f/action/goods/supplier'
export default{
	data () {
		return {
			supplierAction: supplierActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			}
			
		}
	},
	created () {
		this.supplierAction.getOffterRecordList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.supplierAction.getOffterRecordList()
		}
	}
}
</script>
<style lang="less" scoped>
	.dialog-detail{
		.item{
			padding: 10px 0;
		}
		.img{
			display: inline-block;
			width: 120px;
			height: 120px;
			margin-right: 20px;
			img{
				max-width: 100%;
			}
		}
	}
</style>