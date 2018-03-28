<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>店铺中心</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺详情</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content class="shop-detail">
			<h4 class="h-header">店铺信息<el-button size="small" onclick="history.back(-1)" class="back">返回</el-button></h4><br/>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">店铺名称：</span><span class="value">{{detailInfo.shopName}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">起送价：</span><span class="value">{{detailInfo.distributionAmountLimit}}</span>
				</el-col>
			</el-row><br/>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">营业时间：</span><span class="value">{{detailInfo.businessHours}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">创建时间：</span><span class="value">{{detailInfo.creationTime}}</span>
				</el-col>
			</el-row>
			<br/>
			<h4>销售的商品</h4>
			<div class="prod-wrap">
				<el-table
			      :data="tableData"
			      height="350"
			      style="width: 100%">
			      <el-table-column
			        prop="date"
			        label="商品图"
			        width="80"
			        >
			         <template slot-scope="scope">
				        <img :src="scope.row.mainImage" class="prod-img" />
				      </template>
			      </el-table-column>
			      <el-table-column
			        prop="productName"
			        label="商品名"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="sellUnit"
			        label="单位"
			       >
			      </el-table-column>
			     
			    </el-table>
			</div>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import shopActionFun from '@f/action/shop/shop'
export default{
	data () {
		return {
			shopAction: shopActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: 10000,
				shopId: this.$route.query.id
			},
			detailInfo: {}
		}
	},
	created () {
		this.shopAction.detailInfo()
		this.shopAction.selectSalesProds('detail')
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
	@import "../../../public/less/config.less";
	.shop-detail{
		padding: 20px;
		h4{
			font-size: 20px;
			color: @mcm-color-text-primary;
			border-bottom:1px solid @mcm-border-color-base;
			padding: 0px 0 10px 0;
			.back{
				float:right;
			}
		}
		img{
			width:45px;
			height:45px;
		}
	}

</style>