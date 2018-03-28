<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>配送单</el-breadcrumb-item>
				<el-breadcrumb-item>配送列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!--<mcm-page-tab :tabs="tabs"></mcm-page-tab>-->
		<mcm-page-search>
			<el-form :inline="true" :model="query" class="">
				<el-form-item label="订单编号">
					<el-input v-model="query.sellOrderId" placeholder="订单编号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed prop="deliveryOrderId" label="编号" width="180">
						</el-table-column>
						<el-table-column fixed prop="sellOrderId" label="订单编号" width="150">
						</el-table-column>
						<el-table-column prop="warehouseName" label="中心仓">
						</el-table-column>
						<el-table-column prop="productCount" label="商品数量">
						</el-table-column>
						<el-table-column label="配送信息" width="200">
							<template slot-scope="scope">
								<p>配送人：{{scope.row.deliverName}}</p>
								<p>配送人电话：{{scope.row.deliverMobile}}</p>
								<p>配送距离：{{scope.row.distance}}米</p>
							</template>
						</el-table-column>
						<el-table-column prop="receiverName" label="收货信息" width="320">
							<template slot-scope="scope">
								<p>收货人：{{scope.row.receiverName}}</p>
								<p>收货人电话：{{scope.row.receiverMobile}}</p>
								<p>收货地址：{{scope.row.receiverAddr}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="statusText" label="状态">
						</el-table-column>
						<el-table-column prop="deliveryWayText" label="交易方式">
						</el-table-column>
						<el-table-column prop="creationTime" label="创建时间" width="180">
						</el-table-column>
						<el-table-column prop="updatedTime" label="更新时间" width="180">
						</el-table-column>
						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button v-show="scope.row.auditStatusId!=0" @click.native.prevent="shopDetails(scope.$index, scope.row)" type="text" size="small">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" :page-size="query.pageSize" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="配送单详情" :visible.sync="detailShow" width="50%" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="8"><span class="name">配送单编号：</span><span class="val">{{detailsData.deliveryOrderId}}</span></el-col>
				<el-col :span="8"><span class="name">订单编号：</span><span class="val">{{detailsData.sellOrderId}}</span></el-col>
				<el-col :span="4"><span class="name">状态：</span><span class="val">{{detailsData.statusText}}</span></el-col>
				<el-col :span="4"><span class="name">交易方式：</span><span class="val">{{detailsData.deliveryWayText}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="8"><span class="name">应收金额：</span><span class="val">¥{{detailsData.receivableAmount}}</span></el-col>
				<el-col :span="8"><span class="name">已收金额：</span><span class="val">{{detailsData.receivedAmount?detailsData.receivedAmount:'未收款'}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item" style="margin-bottom: 10px;">
				<el-col :span="8"><span class="name">创建时间：</span><span class="val">{{detailsData.creationTime}}</span></el-col>
				<el-col :span="8"><span class="name">最近更新时间：</span><span class="val">{{detailsData.updatedTime}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item" style="margin: 10px 0;">
				<el-col :span="8"><span class="name">配送人：</span><span class="val">{{detailsData.deliverName}}</span></el-col>
				<el-col :span="8"><span class="name">配送人电话：</span><span class="val">{{detailsData.deliverMobile}}</span></el-col>
				<el-col :span="4"><span class="name">配送距离：</span><span class="val">{{detailsData.distance}}米</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="8"><span class="name">收货人：</span><span class="val">{{detailsData.receiverName}}</span></el-col>
				<el-col :span="8"><span class="name">收货人电话：</span><span class="val">{{detailsData.receiverMobile}}米</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="24"><span class="name">收货地址：</span><span class="val">{{detailsData.receiverAddr}}</span></el-col>
			</el-row>
			<el-table :data="detailsData.products" style="width: 100%;margin-top:20px;">
				<el-table-column fixed prop="sellOrderId" label="订单编号" width="150">
				</el-table-column>
				<el-table-column prop="deliveryOrderId" label="配送编号">
				</el-table-column>
				<el-table-column prop="sellProductId" label="商品编号">
				</el-table-column>
				<el-table-column prop="productName" label="名称">
				</el-table-column>
				<el-table-column prop="productQuantity" label="数量">
				</el-table-column>
				<el-table-column prop="receivedValue" label="收到数量">
				</el-table-column>
				<el-table-column prop="productUnit" label="单位">
				</el-table-column>
				<el-table-column prop="productName" label="名称">
				</el-table-column>
				<el-table-column prop="pickupTime" label="取货时间">
				</el-table-column>
			</el-table>		
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import deliverActions from '@w/action/deliver/deliverList'
	export default {
		data () {
			return {
				query: {
					pageSize: 10,
					pageNum: 1,
					orderStatus: '',
					deliverId: '',
					sellOrderId: ''
				},
				tableData: [],
				detailsData: {},
				total: 0,
				detailShow: false,
				dataFun: deliverActions(this),
				options: {

				},
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
				this.dataFun.getDeliverOrderList();
			},
			shopDetails (index, data) {
				this.dataFun.getDeliverOrderDetails(data.deliveryOrderId);
			},
			currentChange (page) {
				this.query.pageNum = page;
				this.initPage();
			},
			search () {
				this.tableData = [];
				this.initPage();
			}
		}
	}
</script>
<style lang="less" scoped>
	.item {
		.val {
			display: inline-block;
			vertical-align: top;
		}
		img {
			width: 100px;
			height: auto;
		}
	}
</style>