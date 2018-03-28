<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>销售商品</el-breadcrumb-item>
			  <el-breadcrumb-item>{{$route.query.id ? '编辑商品' : '添加商品'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-step>
			<el-steps :active="stepActive" finish-status="success" simple >
			  <el-step title="第一步 选择商品规格类型"></el-step>
			  <el-step title="第二步 填写商品信息" ></el-step>
			</el-steps>
		</mcm-page-step>
		<mcm-page-content v-if="stepActive === 0" class="sales-edit-step1">
			<h2>选择商品规格类型</h2>
			<div class="sku-wrap ">
				<ul class="clear-float">
					<li class="s-item" :class="skuActive === 0 ? 'active':''" @click="skuActive=0">
						<h2>单规格</h2>
						<p class="desc">只有一个商品只有一个规格</p>
						<p class="icon">
							<img src="../../../images/Group 61.png">
						</p>
					</li>
					<li class="s-item"  :class="skuActive === 1 ? 'active':''" @click="skuActive=1">
						<h2>多规格</h2>
						<p class="desc">一个商品有多个规格</p>
						<p class="icon">
							<img src="../../../images/Group 5.png">
						</p>
					</li>
					<li class="s-item disable">
						<span class="sign">未开放</span>
						<h2>组合商品</h2>
						<p class="desc">暂未开放，敬请期待</p>
						<p class="icon">
							<img src="../../../images/Group 8.png">
						</p>
					</li>
				</ul>
				<el-button type="primary" class="btn-step" @click="stepActive = 1">下一步</el-button>
			</div>
			
		</mcm-page-content>
		<mcm-page-content  v-else>
			<el-row :gutter="20">
				<el-col :span="5">
					<div class="prod-wrap">
						<div class="con-wrap">
							<div class="header">
								<span>供应商品</span>
							</div>
							<div class="con not-select" v-if="!selectProd" @click="dialogSupplierProd.show = true">
								<div class="select-prod">
									<img src="../../../images/Group 6.png">
									<p class="tit">选择商品</p>
								</div>
							</div>
							<div class="con" v-else>
								<div class="prod-info">
									<i class="img"><img :src="selectProd.mainImage"></i>
									<p class="name">{{selectProd.productName}}</p>
								</div>
								<el-row :gutter="24" class="prod-con">
									<el-col :span="12" class="line">
										<p class="t">结算价格</p>
										<p class="price" v-if="selectProd.minOfferSettlePrice && selectProd.maxOfferSettlePrice">
											¥{{(selectProd.minOfferSettlePrice *1).toFixed(2)}}-{{(selectProd.maxOfferSettlePrice *1).toFixed(2)}}
										</p>
										<p class="price" v-else-if="!selectProd.minOfferSettlePrice && selectProd.maxOfferSettlePrice">
											¥{{(selectProd.maxOfferSettlePrice *1).toFixed(2)}}
										</p>
										<p class="price" v-else-if="selectProd.minOfferSettlePrice && !selectProd.maxOfferSettlePrice">
											{{selectProd.minOfferSettlePrice && '¥' + (selectProd.minOfferSettlePrice *1).toFixed(2)}}
										</p>
										<p class="price" v-else>无</p>
									</el-col>
									<el-col :span="12">
										<p class="t">供应商</p>
										<p class="s-num">{{selectProd.supplierCount || 0}}家</p>
									</el-col>
								</el-row>
								<el-button type="primary" size="medium" class="btn-select-prod"  @click="dialogSupplierProd.show = true" v-if="!$route.query.id">重新选择</el-button>
							</div>
						</div>
						
					</div>
				</el-col>
				<el-col :span="15" v-if="skuActive === 0">
					<edit-prod-single
					:selectProd="selectProd"
					:categoryList="categoryList"
					:unitList="unitList"
					:customerList="customerList"
					ref="editProd"
					></edit-prod-single>
				</el-col>
				<el-col :span="15" v-if="skuActive === 1">
					<edit-prod-multiple
					:selectProd="selectProd"
					:categoryList="categoryList"
					:unitList="unitList"
					:customerList="customerList"
					ref="editProd"
					></edit-prod-multiple>
				</el-col>
			</el-row>

		</mcm-page-content>
		<el-dialog
		  title="供应商品"
		  :visible.sync="dialogSupplierProd.show"
		  width="50%"
		  class="dialog-detail"
		  :before-close="closeDialog"
		  >
		 	<supplier-prod-list @selectSkuProd="selectSkuProd"></supplier-prod-list>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
import SupplierProdList from '@f/components/goods/supplier-prod-list'
import editProdIngle from '@f/components/goods/edit-prod-single'
import editProdMultiple from '@f/components/goods/edit-prod-multiple'
import salesActionFun from '@f/action/goods/sales'
export default{
	data () {
		return {
			salesAction: salesActionFun(this),
			stepActive: 0,
			skuActive: -1,
	        unitList: null,
	        categoryList: [],
	        customerList: [],
	        dialogSupplierProd: {
	        	show: false
	        },
	        selectProd: null
		}
	},
	created () {
		if(this.$route.query.id) {
			this.stepActive = 1
			this.skuActive = 1
			this.salesAction.getDetailInfo()
		} else {
			this.stepActive = 0
			this.skuActive = 0
			this.selectProd = null
		}
		this.salesAction.getCategoryList()
		this.salesAction.getCustomerList()
	},
	mounted () {

	},
	components: {
		'supplier-prod-list': SupplierProdList,
		'edit-prod-single': editProdIngle,
		'edit-prod-multiple': editProdMultiple
	},
	methods: {
		submitForm () {

		},
		selectSkuProd (row) {
			this.selectProd = row
			this.dialogSupplierProd.show = false
			this.$refs.editProd.selectProdVal(row)
		},
		closeDialog () {
			this.dialogSupplierProd.show = false
		}
	}
}
</script>
<style lang="less" scoped>
	@import "../../../public/less/config.less";
	.sales-edit-step1{
		h2{
			padding: 30px 0;
			text-align: center;
			font-size: 32px;
			color: @mcm-color-text-primary;
		}
		.sku-wrap{
			text-align: center;
			ul{
				width: 1000px;
				margin: auto;
			}
			.s-item {
				float: left;
				display: inline-block;
				width: 240px;
				height: 340px;
				box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.07);
				border-radius: 4px; 
				margin:10px 4%;
				border:2px solid rgba(0,0,0,0.01);
				h2{
					font-weight:normal;
					color: @mcm-color-text-primary;
					padding-top: 70px;
					padding-bottom:0;
				}
				.desc{
					color: @mcm-color-text-regular;
				}
				.icon{
					margin-top: 50px;
				}
			}
			.active{
				border:2px solid @mcm-color-primary;
				h2,.desc{
					color: @mcm-color-primary;
				}
			}
			.disable{
				position: relative;
				.sign{
					position: absolute;
					top: 0;
					right: 20px;
					background: @mcm--color-warning;
					color: #FFF;
					display:inline-block;
					width: 20px;
					padding: 5px 5px 10px 5px;
					&:after{

					}
				}
				h2,.desc{
					color: @mcm-color-text-placeholder;
				}
			}
			.btn-step{
				margin-top: 30px;
				padding: 12px 45px;
			}
		}
		
	}
	.prod-wrap{
		width: 240px;
		height: 340px;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.07);
		background:url(../../../images/addgoods_bg.png) no-repeat;
		border-radius: 4px ;
		.con-wrap{
			padding: 20px 10px;
		}
		.header{
			text-align: center;
			background: none;
			span{
				font-size: 20px;
			}
		}
		.con{
			background: #FFF;
			height: 226px;
			margin-top:20px;
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.16);
			border-radius: 4px ; 
			cursor:pointer;
			padding: 20px;
			.prod-info{
				position: relative;
				.img{
					display: inline-block;
					width: 30px;
					height: 30px;
					border-radius: 50%;
					overflow:hidden;
					img{
						max-width: 100%;
						max-height: 100%;
					}
				}
				.name{
					position: absolute;
					top: 0;
					padding-left: 40px;
				}
			}
			.prod-con{
				margin-top: 50px;
				text-align: center;
				.t{
					color: @mcm-color-text-placeholder;
				}
				.price {
					color: @mcm--color-danger;
					font-size: 15px;
				}
				.s-num{
					font-size: 15px;
					color: @mcm-color-text-primary;
				}
				.line{
					border-right: 1px solid @mcm-border-color-base;
					margin-right: -1px;
				}

			}
			.btn-select-prod{
				width: 100%;
				margin-top: 60px;
			}
		}
		.not-select{
			text-align:center;
			img{
				margin-top: 60px;
			}
			.tit{
				color: @mcm-color-primary;
				font-size: 16px;
			}
		}
	}
</style>