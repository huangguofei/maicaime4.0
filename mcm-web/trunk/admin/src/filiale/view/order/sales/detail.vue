<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>订单中心</el-breadcrumb-item>
			  <el-breadcrumb-item>销售单</el-breadcrumb-item>
			  <el-breadcrumb-item>销售单列表</el-breadcrumb-item>
			  <el-breadcrumb-item>销售单详情</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content v-if="detailInfo" class="detail-area">
			<h2 class="h-header">订单信息</h2>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">订单号：</span><span class="value">{{detailInfo.sellOrderId}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">状态：</span><span class="value">{{detailInfo.orderStatusText}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">支付类型：</span><span class="value">{{detailInfo.deliveryWayText}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">下单时间：</span><span class="value">{{detailInfo.submitedTime}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">应付金额：</span><span class="value">{{(detailInfo.payableAmount * 1).toFixed(2)}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">实付金额：</span><span class="value">{{(detailInfo.totalAmount * 1).toFixed(2)}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">店铺名称：</span><span class="value">{{detailInfo.shop.shopName}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">下单设备：</span><span class="value">{{detailInfo.deviceText}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">商户联系人：</span><span class="value">{{detailInfo.receiverName}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">联系人电话：</span><span class="value">{{detailInfo.receiverMobile}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="24">
					<span class="tit">商户地址：</span><span class="value">{{detailInfo.receiverAddr}}</span>
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
					      prop="mainImage"
					      label="主图"
					      >
					       <template slot-scope="scope">
					        <img :src="scope.row.productImage">
					      </template>
					    </el-table-column>
					     <el-table-column
					      prop="productUnit"
					      label="销售单位"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="settleUnit"
					      label="单位"
					      width="120">
					    </el-table-column>
					    
					    <el-table-column
					      label="单位换算"
					      width="120">
					      <template slot-scope="scope">
					        {{scope.row.matrixingMultiple}} {{scope.row.settleUnit}}
					      </template>
					    </el-table-column>
					   <el-table-column
					      prop="skuPrice"
					      label="单价"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="productQuantity"
					      label="数量"
					      width="120">
					    </el-table-column>
					     <el-table-column
					      prop="totalAmount"
					      label="总价"
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
import salesOrderActionFun from '@f/action/order/sales'
export default{
	data () {
		return {
			salesOrderAction: salesOrderActionFun(this),
			detailInfo: null
		}
	},
	created () {
		this.salesOrderAction.getSalesOrderDetailInfo()
	},
	methods: {
		detailRow (row) {
			this.$router.push({
				name: '',
				query: {
					id: row.sellOrderId
				}
			})
		}
	}
}
</script>