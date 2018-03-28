<!-- 审核报价 -->
<template>
<div class="audit-offter-area" v-if="sku === 1 || item.newestSellPriceStatusId === 1">
	<header class="h" v-if="type === 'sales'">商品规格：{{sku === 1 ? item.productName : item.specName}}</header>
	<header class="h" v-else>{{item.supplier ? item.supplier.supplierName : '没有找到供应商'}}</header>
	<el-row :gutter="24" class="r-con"  v-if="type === 'sales'">
		<el-col :span="12">
			<p class="t">最新报价</p>
			<p class="price">¥{{item.newestSellPrice && item.newestSellPrice.toFixed(2)}}</p>
			<p class="date">{{item.newestSellPriceOfferTime}}</p>
		</el-col>
		<el-col :span="12">
			<p class="t">当前销售价</p>
			<p class="price log-price" v-if="item.sellPrice">¥{{item.sellPrice.toFixed(2)}}</p>
			<p class="price log-price" v-else>无销售价</p>
			<p class="date" v-if="item.sellPriceEffectiveTime">{{item.sellPriceEffectiveTime}}</p>
		</el-col>
	</el-row>
	<el-row :gutter="24" class="r-con"  v-else>
		<el-col :span="12">
			<p class="t">最新报价</p>
			<p class="price">¥{{item.newestSettlePrice && item.newestSettlePrice.toFixed(2)}}</p>
			<p class="date">{{item.newestSettlePriceOfferTime}}</p>
		</el-col>
		<el-col :span="12">
			<p class="t">当前结算价</p>
			<p class="price log-price" v-if="item.settlePrice">¥{{item.settlePrice.toFixed(2)}}</p>
			<p class="price log-price" v-else>无结算价</p>
			<p class="date" v-if="item.settlePriceEffectiveTime">{{item.settlePriceEffectiveTime}}</p>
		</el-col>
	</el-row>
	<footer class="f">
		 <el-button size="mini" @click="rejectAudit">拒绝</el-button>
 		 <el-button type="primary" size="mini" @click="acceptAudit">通过</el-button>
	</footer>
	<el-dialog
		  title="拒绝原因"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <span>
		  	<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入拒绝原因"
			  v-model="remark">
			</el-input>
			</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitReject">确 定</el-button>
		  </span>
	</el-dialog>
</div>
</template>
<script>
export default{
	data () {
		return {
			dialogVisible: false,
			remark: ''
		}
	},
	props: {
		item: {
			type: Object,
			default: null
		},
		type: {
			type: String,
			default: ''
		},
		sku: {
			type: Number,
			default: 1
		}
	},
	methods: {
		rejectAudit () {
			this.dialogVisible = true
		}, 
		acceptAudit () {
			var params = {
				type: 1
			}
			this.$emit('auditOffter', params, this.item)
		},
		submitReject () {
			var params = {
				type: 0,
				remark: this.remark
			}
			this.$emit('auditOffter', params, this.item)
		},
		handleClose () {
			this.dialogVisible = false
		}
	}
}
</script>
<style lang="less" scoped>
	@import "../../public/less/config.less";
	.audit-offter-area{
		width: 280px;
		height: 170px;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.07) ;
		border-radius: 4px ;
		float: left; 
		margin-right: 20px;
		.h{
			height: 39px;
			border-bottom: 1px solid @mcm-border-color-base;
			line-height: 39px;
			text-indent: 10px;
			position: relative;
			&:before{
				content: "";
				position: absolute;
				top: 12px;
				left: 0;
				width: 2px;
				height: 15px;
				background: @mcm-color-primary;
			}
		}
		.r-con{
			padding: 12px 8px;
			.t{
				font-size: 12px;
			}
			.price {
				font-size: 25px;
				color: @mcm--color-warning;
			}
			.log-price{
				color: @mcm--color-info;
			}
			.date{
				font-size: 11px;
				color: @mcm-color-text-placeholder;
			}
		}
		.f{
			padding: 0 12px;
			border-top: 1px solid @mcm-border-color-base;
			text-align:right;
			.el-button{
				margin-top: 8px;
			}
		}
	}
</style>
