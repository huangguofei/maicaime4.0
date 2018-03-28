<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>销售商品</el-breadcrumb-item>
			  <el-breadcrumb-item>审核报价</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table
					    :data="tableData"
					    style="width: 100%">
					   
					     <el-table-column
					      prop="mainImage"
					      label="商品图"
					      >
					       <template slot-scope="scope">
					        <img :src="scope.row.mainImage">
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="productName"
					      label="商品名"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="skuProductUnitName"
					      label="单位"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="productAlias"
					      label="别名"
					      width="120">
					    </el-table-column>
					   <el-table-column
					      prop="expirationDate"
					      label="保质期"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="newestSellPriceStatusText"
					      label="状态"
					      >
					    </el-table-column>

					    <el-table-column
					      prop="creationTime"
					      label="创建时间"
					      width="200"
					      >
					    </el-table-column>
					    <el-table-column
					      label="报价待处理数"
					      width="150"
					      >
					      <template slot-scope="scope">
					        	{{scope.row.sellProductTypeId === 1 ? 1 : scope.row.products.length}}
					      </template>
					    </el-table-column>
					     <el-table-column type="expand" label="点开处理"  fixed="right" prop="creationTime" width="120">
						      <template slot-scope="props" >
						      		<audit-offter-area 
						      			v-if="props.row.sellProductTypeId === 1"
						      			ref="auditOffterArea"
						      			@auditOffter="auditOffter"
							      		:item="props.row"
							      		type="sales"
							      		:sku="props.row.sellProductTypeId"
							      		>
						      		</audit-offter-area>
						      		<audit-offter-area 
						      			v-else
						      			ref="auditOffterArea"
						      			@auditOffter="auditOffter"
							      		:item="rowProd" 
							      		:key="index"
							      		type="sales" 
							      		:sku="props.row.sellProductTypeId"
							      		v-for="(rowProd, index) in props.row.products">
						      		</audit-offter-area>  
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
import salesActionFun from '@f/action/goods/sales'
import auditOffterArea from '@f/components/goods/audit-offter-area'
export default{
	data () {
		return {
			salesAction: salesActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			}
	      }
	},
	created () {
		this.salesAction.getAuditProd()
	},
	components: {
		'audit-offter-area': auditOffterArea
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.salesAction.getAuditProd()
		},
		auditOffter (params, item) {
			this.salesAction.auditOffterProd(params, item.sellProductId)
		}
	}
}
</script>