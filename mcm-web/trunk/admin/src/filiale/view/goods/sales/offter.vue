<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>销售商品</el-breadcrumb-item>
			  <el-breadcrumb-item>商品报价</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table
					    :data="tableData"
					    style="width: 100%">
					   
					    <el-table-column
					      fixed
					      type="index"
					      width="50">
					    </el-table-column>
					    <el-table-column
					      prop="mainImage"
					      label="主图"
					      >
					       <template slot-scope="scope">
					        <img :src="scope.row.mainImage">
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="productName"
					      label="商品名"
					      width="220">
					    </el-table-column>
					    <el-table-column
					      prop="sellUnit"
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
					      label="价格状态"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="sellProductStatusText"
					      label="状态"
					      >
					      <template slot-scope="scope">
					      		<span  v-if="scope.row.sellProductStatusId === 1">上架</span>
					      		<span  v-if="scope.row.sellProductStatusId === 2">下架</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="sellProductTypeText"
					      label="类型"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="creationTime"
					      label="创建时间"
					      width="180"
					      >
					    </el-table-column>
					    <el-table-column
					      label="待报价数"
					      >
					      <template slot-scope="scope">
					      		{{scope.row.sellProductTypeId === 1 ? 1 : scope.row.products.length}}
					      </template>
					    </el-table-column>
					     <el-table-column type="expand" label="点开报价" fixed="right" prop="creationTime" width="120">
						      <template slot-scope="props" >
						      		<prod-offter-area 
						      			v-if="props.row.sellProductTypeId === 1"
						      			:prod="props.row"
						      			:type="props.row.sellProductTypeId"
						      			@confimOffter="confimOffter"
						      		>
						      		</prod-offter-area>
						      		<prod-offter-area v-else 
					      				:key="index" 
					      				:prod="prod"
						      			:type="props.row.sellProductTypeId"
					      				v-for="(prod, index) in props.row.products"
					      				@confimOffter="confimOffter"
					      				>
					      			</prod-offter-area>
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
import prodOffterArea from '@f/components/goods/prod-offter-area'
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
		this.salesAction.getSalesList()
	},
	components: {
		'audit-offter-area': auditOffterArea,
		'prod-offter-area': prodOffterArea
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.unitAction.getUnitList()
		},
		confimOffter (params) {
			this.salesAction.setProdOffter(params)
		}
	}
}
</script>
