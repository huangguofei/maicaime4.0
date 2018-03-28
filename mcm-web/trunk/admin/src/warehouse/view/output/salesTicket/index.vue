<template>
	<mcm-page-area>
		<mcm-page-title>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>出库</el-breadcrumb-item>
			<el-breadcrumb-item>销售单</el-breadcrumb-item>
			<el-breadcrumb-item>销售单列表</el-breadcrumb-item>
		</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-tab :tabs="tabs"></mcm-page-tab>
		<mcm-page-search>搜索区域</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column prop="sellOrderId" label="销售单号" width="220">
						</el-table-column>
						<el-table-column prop="buyer.buyerName" label="采购商">
						</el-table-column>
						<el-table-column prop="orderStatusText" label="状态">
						</el-table-column>
						<el-table-column prop="creationTime" label="下单时间" width="160">
						</el-table-column>
						<el-table-column prop="receivedTime" label="收到时间" width="160">
						</el-table-column>
						<el-table-column prop="updatedTime" label="更新时间" width="160">
						</el-table-column>
						<el-table-column prop="shippedTime" label="到货时间" width="160">
						</el-table-column>
						<el-table-column prop="submitedTime" label="提交时间" width="160">
						</el-table-column>
						<el-table-column prop="payableAmount" label="价格">
						</el-table-column>
						<el-table-column prop="deliveryWayText" label="类型">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="160">
							<template slot-scope="scope">
								<el-button @click="detailRow(scope.row)" type="text" size="small">
									详情
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="订单详情" :visible.sync="detailShow" width="1000px" class="dialog-detail" v-if="selectRow.log">
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">订单编号：</span><span class="val">{{selectRow.sellOrderId}}</span></el-col>
				<el-col :span="6"><span class="name">金额：</span><span class="val">{{selectRow.log.payableAmount}}</span></el-col>
				<el-col :span="6"><span class="name">状态：</span><span class="val">{{selectRow.log.logTitle}}</span></el-col>
				<el-col :span="6"><span class="name">方式：</span><span class="val">{{selectRow.deliveryWayText}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">采购商：</span><span class="val">{{selectRow.buyer.buyerName}}</span></el-col>
				<el-col :span="6"><span class="name">供应商：</span><span class="val">{{selectRow.shop.shopName}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">配送人：</span><span class="val">{{selectRow.deliverymanName}}</span></el-col>
				<el-col :span="6"><span class="name">配送电话：</span><span class="val">{{selectRow.deliverymanMobile}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">收货人：</span><span class="val">{{selectRow.receiverName}}</span></el-col>
				<el-col :span="6"><span class="name">收货电话：</span><span class="val">{{selectRow.receiverMobile}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="20"><span class="name">收货地址：</span><span class="val">{{selectRow.receiverAddr}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">创建时间：</span><span class="val">{{selectRow.creationTime}}</span></el-col>
				<el-col :span="6"><span class="name">提交时间：</span><span class="val">{{selectRow.submitedTime}}</span></el-col>
				<el-col :span="6"><span class="name">更新时间：</span><span class="val">{{selectRow.updatedTime}}</span></el-col>
				<el-col :span="6"><span class="name">配送时间：</span><span class="val">{{selectRow.deliveryEndTime}}</span></el-col>
			</el-row>
			<el-table :data="selectRow.products" style="width: 100%">
					<el-table-column fixed type="index" width="50">
					</el-table-column>
					<el-table-column prop="productName" label="商品名称">
					</el-table-column>
					<el-table-column prop="productUnit" label="单位">
					</el-table-column>
					<el-table-column prop="productQuantity" label="数量">
					</el-table-column>
					<el-table-column prop="skuPrice" label="单价">
					</el-table-column><br />
					<el-table-column prop="totalAmount" label="总价">
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					</el-table-column>
					<el-table-column prop="creationTime" label="创建时间">
					</el-table-column>
			</el-table>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import outputActionFun from '@w/action/output/sale'
	export default {
		data () {
			return {
				tabs: [],
				tableData: [],
				total: 0,
				outputAction: outputActionFun(this),
				detailShow: false,
				selectRow: {},
				query: {
					pageNum: 1,
					pageSize: 10
				}
			}
		},
		created () {
			this.initPage();
		},
		methods: {
			initPage () {
				this.loadList();
			},
			loadList () {
				this.outputAction.getSalesList();
			},
			currentChange (page) {
				this.query.pageNum = page
				this.initPage();
			},
			detailRow (row) {
				this.detailShow = true;
				this.outputAction.getSalesDetails({
					sellOrderId: row.sellOrderId
				});
			}
		}
	}
</script>