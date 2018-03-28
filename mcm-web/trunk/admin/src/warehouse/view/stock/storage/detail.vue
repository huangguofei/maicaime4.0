<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>入库单</el-breadcrumb-item>
			  <el-breadcrumb-item>入库列表</el-breadcrumb-item>
			  <el-breadcrumb-item>入库详情</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content v-if="detailInfo" class="detail-area">
			<h2 class="h-header">入库信息</h2>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">商品数量：</span><span class="value">{{detailInfo.productCount}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">入库总量：</span><span class="value">{{detailInfo.productTotalQuantity}}</span>
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
					      prop="productUnit"
					      label="单位"
					      width="120">
					    </el-table-column>
					   <el-table-column
					      prop="stockInQuantity"
					      label="入库数量"
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
import storageActionFun from '@w/action/stock/storage'
export default{
	data () {
		return {
			storageAction: storageActionFun(this),
			detailInfo: null
		}
	},
	created () {
		this.storageAction.getStorageDetail()
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