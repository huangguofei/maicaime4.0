<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>进货</el-breadcrumb-item>
			  <el-breadcrumb-item>进货单</el-breadcrumb-item>
			  <el-breadcrumb-item>采购单</el-breadcrumb-item>
			  <el-breadcrumb-item>采购单详情</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content v-if="detailInfo" class="detail-area">
			<h2 class="h-header">采购信息</h2>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">商品数量：</span><span class="value">{{detailInfo.productCount}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">采购总量：</span><span class="value">{{detailInfo.productTotalQuantity}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">创建时间：</span><span class="value">{{detailInfo.creationTime}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">备注：</span><span class="value">{{detailInfo.remark}}</span>
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
					      prop="productName"
					      label="商品名"
					      width="180">
					    </el-table-column>
					    <el-table-column
					      prop="settleUnit"
					      label="单位"
					      width="120">
					    </el-table-column>
					   <el-table-column
					      prop="purchaseQuantity"
					      label="采购数量"
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
import purchaseActionFun from '@f/action/stock/purchase'
export default{
	data () {
		return {
			purchaseAction: purchaseActionFun(this),
			detailInfo: null
		}
	},
	created () {
		this.purchaseAction.getPurchaseDetail()
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