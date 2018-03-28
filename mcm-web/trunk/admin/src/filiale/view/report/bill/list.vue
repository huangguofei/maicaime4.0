<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>报表中心</el-breadcrumb-item>
				<el-breadcrumb-item>流水明细</el-breadcrumb-item>
				<el-breadcrumb-item>明细列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
			<el-form :model="query" :inline='true' ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="查询日期">
					<el-date-picker size="small" format="yyyy-MM-dd HH:mm:ss" v-model="dates" @change="changeDate" type="datetimerange" range-separator="至" clearable start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="商户类型">
					<el-select v-model="query.customerTypeId" placeholder="请选择商户类型">
						<el-option v-for="(v, k) in customerType" :label="v.label" :value="v.key" :key="k"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
				</el-form-item>
			</el-form>
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column prop="customerTypeText" label="商户类型">
						</el-table-column>
						<el-table-column prop="customerName" label="商户名称">
						</el-table-column>
						<el-table-column label="总金额">
							<template slot-scope="scope">
								<p class="price" :class="{active:scope.row.amount>0}">{{scope.row.amount>0?('+' + (scope.row.amount*1).toFixed(2)):(scope.row.amount*1).toFixed(2)}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="amountBeforeChange" label="金额变动前">
						</el-table-column>
						<el-table-column prop="amountAfterChange" label="金额变动后">
						</el-table-column>
						<el-table-column prop="typeText" label="类型">
						</el-table-column>
						<el-table-column prop="walletTypeText" label="钱包类型">
						</el-table-column>
						<el-table-column prop="description" label="说明">
						</el-table-column>
						<el-table-column prop="paymentTypeText" label="支付方式">
						</el-table-column>
						<el-table-column prop="approachText" label="用途">
						</el-table-column>
						<el-table-column prop="creationTime" label="创建时间" width="180">
						</el-table-column>
						<el-table-column prop="statusText" label="状态">
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<div class="total" v-if="otherData">
				<span class="item">小计：{{(otherData.amount*1).toFixed(2)}}</span>
				<span class="item">支出：{{(otherData.expendAmount*1).toFixed(2)}}</span>
				<span class="item">收入：{{(otherData.incomeAmount*1).toFixed(2)}}</span>
			</div>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import billActionFun from '@f/action/report/bill'
	export default {
		data () {
			return {
				billAction: billActionFun(this),
				tableData: null,
				otherData: null,
				total: 0,
				query: {
					pageSize: 10,
					pageNum: 1,
					beginDate: '',
					endDate: '',
					customerTypeId: 200
				},
				customerType: [{
						key: 200,
						label: '商户'
					},
					{
						key: 300,
						label: '供应商'
					}, {
						key: 600,
						label: '仓库'
					}, {
						key: 700,
						label: '司机'
					}
				],
				dates: ''
			}
		},
		created () {
			this.initPage();
		},
		methods: {
			initPage () {
				var d = new Date().toLocaleDateString().replace(/\//g, '-');
				this.query.beginDate = d + ' 00:00:00';
				this.query.endDate = d + ' 23:59:59';
				this.dates = [this.query.beginDate, this.query.endDate];
				this.billAction.getBillList();
			},
			onSubmit () {
				this.billAction.getBillList();
			},
			currentChange (page) {
				this.query.pageNum = page
				this.billAction.getBillList();
			},
			changeDate (value) {
				this.query.beginDate = this.formatDateTime(value[0]);
				this.query.endDate = this.formatDateTime(value[1]);
			},
			formatDateTime (date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			}
		}
	}
</script>
<style lang="less">
	.price {
		color: red;
	}
	
	.active {
		color: #46CD72;
	}
	
	.total {
		height: 45px;
		line-height: 45px;
		border-bottom: 1px solid #DFDFDF;
		text-indent: 1rem;
		margin: 5px 0;
		font-size: 18px;
		.item {
			margin-right: 20px;
		}
	}
</style>