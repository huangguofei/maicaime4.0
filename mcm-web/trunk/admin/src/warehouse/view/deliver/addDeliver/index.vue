<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>配送单</el-breadcrumb-item>
				<el-breadcrumb-item>创建配送单</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-tab :tabs="tabs"></mcm-page-tab>
		<mcm-page-search>
			<!--<el-form :inline="true" :model="query" class="demo-form-inline">
				<el-form-item label="订单日期">
					<el-date-picker size="small" v-model="search.time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="配送状态">
					<el-select v-model="search.region" placeholder="活动区域" size="small">
						<el-option label="未设置配送人员" value="0"></el-option>
						<el-option label="已设置配送人员" value="1"></el-option>
						<el-option label="全部" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" size="small">搜索</el-button>
				</el-form-item>
			</el-form>-->
		</mcm-page-search>
		<mcm-page-content>
			<div class="map" id="map" style="display: none;"></div>
			<div class="order-list">
				<div class="item" v-for="(v, k) in orderData" :key="k">
					<el-checkbox v-model="v.check" label="备选项1" border>
						<span class="number pull-left">{{k+1}}</span>
						<div class="info pull-left">
							<p class="sales-num">销售单号 {{v.sellOrderId}}</p>
							<p class="sales-name">{{v.receiverName}}</p>
							<p class="sales-address">{{v.receiverAddr}}</p>
							<p class="sales-price">商品金额：¥{{v.payableAmount}}</p>
							<!--<p class="sales-class"></p>-->
						</div>
						<span class="distance" v-show="v.distance">{{v.distance}}米</span>
					</el-checkbox>
				</div>
			</div>
			<mcm-pagination :total="total" :page-size="query.pageSize" @currentChange="currentChange"></mcm-pagination>
			<div class="foolter">
				<el-row type="flex" justify="space-between">
					<el-col :span="6">
						指派配送员
						<el-select v-model="options.deliverId" placeholder="请选择配送员">
							<el-option v-for="(v, k) in deliverList" :key="k" :label="v.driverName" :value="v.driverId"></el-option>
						</el-select>
					</el-col>
					<el-col :span="2">
						<el-button size="small" @click="subEvent">提交</el-button>
					</el-col>
				</el-row>
			</div>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import deliverActions from '@w/action/deliver/addDeliver'
	export default {
		data () {
			return {
				tabs: [],
				orderData: [],
				deliverList: [],
				total: 0,
				deliverAction: deliverActions(this),
				query: {
					pageNum: 1,
					pageSize: 4,
					beginDate: '',
					endDate: ''
				},
				options: {
					sellOrderIds: '',
					deliverId: ''
				},
				checked3: false,
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick (picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick (picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick (picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				}
			}
		},
		created () {
			this.initPage();
		},
		methods: {
			initPage () {
				this.loadList();
				this.deliverAction.deliverList();
			},
			loadList () {
				this.deliverAction.getOrderList();
			},
			currentChange (page) {
				this.query.pageNum = page
				this.loadList();
			},
			detailRow (row) {
				this.detailShow = true
				this.selectRow = row
				try {
					var imgs = JSON.parse(row.minorImage)
					this.selectRow.minorImages = imgs
				} catch(e) {}
			},
			search () {

			},
			subEvent () {
				var _that = this;
				var sellOrderIds = '';
				this.orderData.forEach ((v, k) => {
					if(v.check) {
						sellOrderIds += v.sellOrderId + ',';
					}
				});
				sellOrderIds = sellOrderIds.substring(0, sellOrderIds.length - 1);
				if(!sellOrderIds) {
					_that.$message.error('请选择要配送的订单！');
					return false;
				}
				if(!_that.options.deliverId) {
					_that.$message.error('请选择配送人员！');
					return false;
				}
				_that.options.sellOrderIds = sellOrderIds;
				this.deliverAction.addDeliver();
			}
		}
	}
</script>
<style lang="less">
	/*@import "../../../public/less/config.css";*/
	
	.clearfix() {
		&:after {
			content: "";
			display: block;
			clear: both
		}
		zoom:1
	}
	
	.map {
		height: 300px;
		border: 1px solid #ccc;
	}
	
	.order-list {
		margin-top: 20px;
		.clearfix();
		.item {
			position: relative;
			float: left;
			width: 410px;
			height: 150px;
			margin-right: 10px;
			margin-bottom: 10px;
			label {
				width: 100%;
				height: 100%;
				line-height: initial;
				display: flex;
				align-items: center;
				span.pull-left {
					height: 130px;
					line-height: 130px;
				}
				.number {
					font-size: 26px;
					margin: 0 10px;
				}
				.info {
					width: 250px;
					line-height: 30px;
					font-size: 20px;
					.sales-num {}
				}
				.distance {
					position: absolute;
					top: 60px;
					right: 10px;
					font-size: 24px;
				}
			}
		}
		.item:nth-child(4n) {
			margin-right: 0;
		}
	}
	
	.sales-address {
		word-wrap: break-word;
		word-break: break-all;
		overflow: auto;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 14px;
		line-height:20px ;
	}
</style>