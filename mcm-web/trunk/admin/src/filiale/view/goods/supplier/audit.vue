<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>供应商品</el-breadcrumb-item>
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
					      prop="skuProductStatusText"
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
					        	{{scope.row.supplierSkuProductRelations.length}}
					      </template>
					    </el-table-column>
					     <el-table-column type="expand" fixed="right" label="点开处理" prop="creationTime" width="120">
						      <template slot-scope="props" >
						      		<audit-offter-area 
						      			ref="auditOffterArea"
						      			@auditOffter="auditOffter"
							      		:item="rowProd" 
							      		:key="index"
							      		v-for="(rowProd, index) in props.row.supplierSkuProductRelations">
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
import supplierActionFun from '@f/action/goods/supplier'
import auditOffterArea from '@f/components/goods/audit-offter-area'
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
		this.supplierAction.getAuditProd()
	},
	components: {
		'audit-offter-area': auditOffterArea
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.supplierAction.getAuditProd()
		},
		auditOffter (params, item) {
			this.supplierAction.auditOffterProd(params, item.ssprId)
		}
	}
}
</script>