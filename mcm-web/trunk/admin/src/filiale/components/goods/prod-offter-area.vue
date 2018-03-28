<!-- 商品报价 -->
<template>
<div class="prod-offter-area" v-if="prod">
	<header class="h ellipsis">商品规格：{{type === 1 ? prod.productName : prod.specName}}</header>
	<el-row class="r-con">
		<el-row :gutter="24" class="r-item">
			<el-col :span="7" class="tit">销售单位</el-col>
			<el-col :span="17" >{{prod.sellUnit}} = {{prod.matrixingMultiple}}{{prod.settleUnit}}</el-col>
		</el-row>
		<el-row :gutter="24" class="r-item">
			<el-col :span="7" class="tit">销售价</el-col>
			<el-col :span="17" class="price">{{prod.sellPrice ? '¥' + prod.sellPrice : '无'}}</el-col>
		</el-row>
		<el-row :gutter="24" class="r-item">
			<el-col :span="7" class="tit">报价时间</el-col>
			<el-col :span="17">{{prod.newestSellPriceOfferTime || '无'}}</el-col>
		</el-row>
		<el-row :gutter="24" class="r-item">
			<el-col :span="7" class="tit">审核生效</el-col>
			<el-col :span="17">{{prod.newestSellPriceOfferTime}}</el-col>
		</el-row>
	</el-row>
	<footer class="f">
		<el-row :gutter="24" class="r-item">
			<el-col :span="17" class="offter-area">
				最新报价：<el-input v-model.number="amount" size="mini" @change="inputNumber"></el-input>
			</el-col>
			<el-col :span="7" class="tit">
				<el-button type="primary" size="mini" @click="confimOffter">完成</el-button>
			</el-col>
		</el-row>
	</footer>
</div>
</template>
<script>
export default{
	data () {
		return {
			amount: ''
		}
	},
	props: {
		type: {
			type: Number,
			default: 1
		},
		prod: {
			type: Object,
			defalut: null
		}
	},
	methods: {
		inputNumber () {
			if (!cJs.checkPrice(this.amount)) {
				this.$message('请输入正确的价格格式')
				this.amount = ''
				return false
			}
			return true
		},
		confimOffter () {
			if(!this.amount) {
				this.$message('价格不能为空')
				return false
			} else {
				var params = {
					sellPrice: this.amount,
					sellProductId: this.prod.sellProductId
				}
				this.$emit('confimOffter', params)
			}
		}
	}
}
</script>
<style lang="less">
@import "../../public/less/config.less";
.prod-offter-area{
	width: 280px;
	height: 180px;
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
		font-weight: bold;
		color: @mcm-color-text-primary;
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
		padding: 12px;
		.r-item{
			padding: 2px 0;
			font-size: 12px;
			color: @mcm-color-text-primary;
			.tit{
				color: @mcm-color-text-secondary;
			}
			.price{
				color: @mcm--color-warning;
				font-size: 13px;
			}
		}
	}
	.f{
		padding: 0 2px;
		border-top: 1px solid @mcm-border-color-base;
		line-height: 39px;
		.el-button{
		}
		.offter-area{
			border:1px solid @mcm-border-color-base;
			height: 30px;
			margin-top: 5px;
			line-height: 28px;
			width: 180px;
			margin-left: 20px;
			position: relative;
			.el-input{
				position: absolute;
				left: 85px;
				width: 80px;
				float: right;
			}
			.el-input__inner{
				border-color: #FFF !important;
				padding:0;
				height: 25px;
			}
		}
	}
}
</style>
