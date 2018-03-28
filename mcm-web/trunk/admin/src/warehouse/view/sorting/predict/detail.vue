<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>分拣</el-breadcrumb-item>
			  <el-breadcrumb-item>分拣</el-breadcrumb-item>
			  <el-breadcrumb-item>预出库记录</el-breadcrumb-item>
			  <el-breadcrumb-item>预出库列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content v-if="detailInfo" class="detail-area">
			<h2 class="h-header">预出库信息</h2>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">预出库单号：</span><span class="value">{{detailInfo.sortingDataId}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">销售商品种数：</span><span class="value">{{detailInfo.productCount}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">预计销售商品分拣量：</span><span class="value">{{detailInfo.productTotalQuantity}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">备注：</span><span class="value">{{detailInfo.remark}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">创建时间：</span><span class="value">{{detailInfo.creationTime}}</span>
				</el-col>
			</el-row>
			<h2 class="h-header">商品列表</h2>
			<mcm-table-area>
				<div slot="table-con">
					<el-table
					    :data="detailInfo.products"
					    style="width: 100%"
					    >
					    <el-table-column
					      fixed
					      type="index"
					      width="50">
					    </el-table-column>
					    <el-table-column
					      prop="skuName"
					      label="供应商品名"
					      width="240">
					    </el-table-column>
					    <el-table-column
					      prop="productName"
					      label="销售商品名"
					      width="240">
					    </el-table-column>
					    <el-table-column
					      prop="skuUnit"
					      label="单位"
					      width="120">
					    </el-table-column>
					     <el-table-column
					      prop="productUnit"
					      label="结算单位"
					      width="120">
					    </el-table-column>
					   	<el-table-column
					   	  prop="orderQuantity"
					      label="下单总量"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="todayQuantity"
					      label="已计划数"
					      width="120">
					    </el-table-column>
					     <el-table-column
					      prop="plannedQuantity"
					      label="分拣计划数"
					      width="120">
					    </el-table-column>
					     <el-table-column
					      prop="totalStock"
					      label="供应总存库"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="remark"
					      label="描述"
					      >
					    </el-table-column>
					    
					  </el-table>
				</div>
			</mcm-table-area>

		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import predictActionFun from '@w/action/sorting/predict'
export default{
	data () {
		return {
			predictAction: predictActionFun(this),
			detailInfo: null
		}
	},
	created () {
		this.predictAction.getPredictDetail()
	},
	methods: {
		
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