<template>
	<div class="coupon-item">
		<div class="head padding">
			<h1>{{couponData.title}}</h1>
			<p class="price">¥<span>{{couponData.amount}}</span></p>
			<p class="remark">{{couponData.preconditionTypeText}}{{couponData.preconditionAmount}}元使用</p>
		</div>
		<div class="main">
			<div class="coupon-info padding hr">
				<h3>别名：暂无</h3>
				<p><i></i>不可与其他优惠同时享受 </p>
				<p><i></i>有效时间：{{couponData.validDay}}天</p>
				<p><i></i>适用说明：{{couponData.purpose}} </p>
			</div>
			<div class="coupon-num padding" style="display: none;">
				<el-row class="row-item">
					<el-col :span="8">
						<p>发行券总数</p>
						<span>0</span>
					</el-col>
					<el-col :span="8">
						<p>已派发总数</p>
						<span>0</span>
					</el-col>
					<el-col :span="8">
						<p>已使用总数</p>
						<span>0</span>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="foolter padding">
			<a href="javascript:;" @click="payoutCoupon(couponData.couponId)">派发此优惠券</a>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		props: ['couponData', 'index'],
		methods: {
			payoutCoupon (id) {
				this.$emit('payoutCoupon', id);
			}
		}
	}
</script>

<style lang="less">
	@import "../../../common/less/common.css";
	.coupon-item {
		width: 280px;
		box-shadow: 0 0 15px #ccc;
		border-radius: 5px;
		background: #fff;
		margin-bottom: 10px;
		.head {
			background: url(../../images/coupon_1.png) no-repeat;
			background-size: 100%;
			text-align: center;
			color: #fff;
			h1 {
				font-size: 20px;
				margin-top: 20px;
			}
			.price {
				font-size: 30px;
				margin: 0 0 10px;
				span {
					font-size: 60px;
				}
			}
			.remark {
				display: inline-block;
				font-size: 16px;
				height: 28px;
				line-height: 28px;
				border: 1px solid #fff;
				border-radius: 14px;
				padding: 0 20px;
			}
		}
		.main {
			.coupon-info {
				h3 {
					font-size: 16px;
					color: #1C2C43;
					margin-bottom: 10px;
				}
				p {
					font-size: 14px;
					color: #606266;
					line-height: 20px;
					i {
						display: inline-block;
						width: 4px;
						height: 4px;
						border-radius: 50%;
						border: 2px solid #EA4335;
						margin-right: 5px;
					}
				}
			}
			.coupon-num {
				padding-bottom: 0;
				text-align: center;
				p {
					font-size: 14px;
					color: #606266;
					margin-bottom: 5px;
				}
				span {
					font-size: 24px;
					color: #1C2C43;
				}
			}
		}
		.foolter {
			text-align: center;
			a {
				display: inline-block;
				height: 38px;
				line-height: 38px;
				color: #1C2C43;
				font-size: 16px;
				width: 100%;
				border: 1px solid #EBEEF5;
			}
		}
	}
</style>