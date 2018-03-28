<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>营销中心</el-breadcrumb-item>
				<el-breadcrumb-item>优惠券</el-breadcrumb-item>
				<el-breadcrumb-item>优惠券列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<div class="coupn">
				<div class="group item_a">
					<coupon v-for="(v, k) in couponData" :key="k" v-if="k % 5 ==0" :couponData="v" :index="k" @payoutCoupon="payoutCoupon"></coupon>
				</div>
				<div class="group item_b">
					<coupon v-for="(v, k) in couponData" :key="k" v-if="k % 5 ==1" :couponData="v" :index="k" @payoutCoupon="payoutCoupon"></coupon>
				</div>
				<div class="group item_c">
					<coupon v-for="(v, k) in couponData" :key="k" v-if="k % 5 ==2" :couponData="v" :index="k" @payoutCoupon="payoutCoupon"></coupon>
				</div>
				<div class="group item_d">
					<coupon v-for="(v, k) in couponData" :key="k" v-if="k % 5 ==3" :couponData="v" :index="k" @payoutCoupon="payoutCoupon"></coupon>
				</div>
				<div class="group item_e">
					<coupon v-for="(v, k) in couponData" :key="k" v-if="k % 5 ==4" :couponData="v" :index="k" @payoutCoupon="payoutCoupon"></coupon>
				</div>
			</div>
		</mcm-page-content>
		<el-dialog title="派发优惠券" :visible.sync="dialogShow" width="30%">
			<el-form :model="payoutData" ref="shopForm" label-width="120px" class="demo-ruleForm">
				<el-form-item label="选择派发的商户" prop="buyerId">
					<el-select v-model="payoutData.subSaveParams.buyerId" clearable placeholder="请选择">
						<el-option v-for="item in purchaserData" :key="item.buyerId" :label="item.buyerName" :value="item.buyerId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="派发数量" prop="quantity">
					<el-input v-model="payoutData.subSaveParams.quantity"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" v-model="payoutData.subSaveParams.remark"></el-input>
				</el-form-item>
				<el-form-item style="text-align: center;">
					<el-button type="primary" @click="confimDialog" size="small">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import couponActionFun from '@f/action/marketing/coupon'
	import coupon from '@f/components/marketing/coupon'
	export default {
		data () {
			return {
				couponAction: couponActionFun(this),
				couponData: [],
				purchaserData: [],
				total: 0,
				query: {
					pageNum: 1,
					pageSize: 10
				},
				dialogShow: false,
				payoutData: {
					subSaveParams: {
						buyerId: '',
						quantity: 3,
						remark: '',
						userId: ''
					},
					couponId: ''
				}
			}
		},
		created () {
			this.couponAction.getCouponList();
			this.couponAction.getPurchaserList();
		},
		methods: {
			payoutCoupon (id) {
				this.payoutData.couponId = id;
				this.dialogShow = true;
			},
			confimDialog () {
				if(!this.payoutData.subSaveParams.buyerId) {
					this.$message.error('请选择要派发的商户!');
					return false;
				}
				if(this.payoutData.subSaveParams.quantity === 0 || !this.payoutData.subSaveParams.quantity) {
					this.$message.error('派发数量不正确!');
					return false;
				}
				if(!this.payoutData.subSaveParams.remark) {
					this.$message.error('请填写派发的备注!');
					return false;
				}
				this.purchaserData.forEach((v, k) => {
					if(v.buyerId === this.payoutData.subSaveParams.buyerId) {
						this.payoutData.subSaveParams.userId = v.ownerUserId;
					}
				});
				this.couponAction.giveOutCoupon();
			}
		},
		components: {
			coupon
		}
	}
</script>
<style lang="less" scoped>
	@import "../../../../common/less/common.less";
	.page-content .content {
		background: #F2F6FC!important;
		padding-top: 0!important;
	}
	
	.coupn {
		min-width: 1500px;
		.clearfix();
		.group {
			float: left;
			width: 300px;
			padding: 0 10px;
			box-sizing: border-box;
		}
	}
</style>