<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>库存</el-breadcrumb-item>
			  <el-breadcrumb-item>商品报损</el-breadcrumb-item>
			  <el-breadcrumb-item>报损记录</el-breadcrumb-item>
			  <el-breadcrumb-item>报损详情</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content v-if="detailInfo" class="detail-area">
			<h2 class="h-header">报损信息</h2>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">商品数量：</span><span class="value">{{detailInfo.productCount}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">报损总数：</span><span class="value">{{detailInfo.productTotalQuantity}}</span>
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
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="productUnit"
					      label="单位"
					      width="120">
					    </el-table-column>
					   <el-table-column
					      prop="breakageQuantity"
					      label="报损数量"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="remark"
					      label="描述"
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

		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import breakageActionFun from '@w/action/inventory/breakage'
export default{
	data () {
		return {
			breakageAction: breakageActionFun(this),
			detailInfo: null
		}
	},
	created () {
		this.breakageAction.getBreakageDetails()
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