<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>报表中心</el-breadcrumb-item>
				<el-breadcrumb-item>销售扣点</el-breadcrumb-item>
				<el-breadcrumb-item>扣点详情</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column label="供应商名称">
							<template slot-scope="scope">
								<a href="javascript:;" @click="supplierDetails(scope.row.supplier)">{{scope.row.supplier.supplierName}}</a>
							</template>
						</el-table-column>
						<el-table-column label="扣点编号">
							<template slot-scope="scope">
								<a href="javascript:;" @click="salesPointDetails(scope.row.salesPoint)">{{scope.row.salesPointId}}</a>
							</template>
						</el-table-column>
						<el-table-column prop="sellOrderPayableAmount" label="订单应付总额">
						</el-table-column>
						<el-table-column prop="sellOrderTotalAmount" label="订单实付总额">
						</el-table-column>
						<el-table-column prop="totalSettleAmount" label="结算实付总额">
						</el-table-column>
						<el-table-column prop="payableSettleAmount" label="结算应付总额">
						</el-table-column>
						<el-table-column prop="sellOrderDiscountAmount" label="优惠金额">
						</el-table-column>
						<el-table-column prop="yuehouSalesPointReceiveAmount" label="总部应得金额">
						</el-table-column>
						<el-table-column prop="companySalesPointReceiveAmount" label="分公司应得金额">
						</el-table-column>
						<el-table-column prop="warehouseSalesPointReceiveAmount" label="中心仓应得金额">
						</el-table-column>
						<el-table-column prop="createionTime" label="创建时间">
						</el-table-column>
						<el-table-column prop="remark" label="备注">
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
		</mcm-page-content>
		<el-dialog title="供应商详情" :visible.sync="supplierShow" width="50%" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">供应商名称：</span><span class="val">{{supplierData.supplierName}}</span></el-col>
				<el-col :span="6"><span class="name">状态：</span><span class="val">{{supplierData.statusText}}</span></el-col>
				<el-col :span="6"><span class="name">负责人：</span><span class="val">{{supplierData.principal}}</span></el-col>
				<el-col :span="6"><span class="name">负责人电话：</span><span class="val">{{supplierData.principalMobile}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">创建时间：</span><span class="val">{{supplierData.creationTime}}</span></el-col>
				<el-col :span="18"><span class="name">店铺地址：</span><span class="val">{{supplierData.province}}{{supplierData.city}}{{supplierData.area}}{{supplierData.address}}</span></el-col>
			</el-row>
		</el-dialog>
		<el-dialog title="扣点规则详情" :visible.sync="salesPointShow" width="50%" class="dialog-detail">
			<p style="font-weight: bold; font-size: 16px; margin: 10px 0;">扣点信息</p>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">扣点编号：</span><span class="val">{{salesPointData.salesPointId}}</span></el-col>
				<el-col :span="6"><span class="name">扣点方法：</span><span class="val">{{salesPointData.salesPointWayText}}</span></el-col>
				<el-col :span="6"><span class="name">扣点类型：</span><span class="val">{{salesPointData.salesPointTypeText}}</span></el-col>
				<el-col :span="6"><span class="name">创建人：</span><span class="val">{{salesPointData.creator}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">创建时间：</span><span class="val">{{salesPointData.creationTime}}</span></el-col>
			</el-row>
			<p style="font-weight: bold; font-size: 16px; margin: 10px 0;">扣点内容</p>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">总部收益比例：</span><span class="val">{{salesPointData.yuehouSalesPointReceiveRatio}}</span></el-col>
				<el-col :span="6"><span class="name">分公司收益比例：</span><span class="val">{{salesPointData.companySalesPointReceiveRatio}}</span></el-col>
				<el-col :span="6"><span class="name">中心仓收益比例：</span><span class="val">{{salesPointData.warehouseSalesPointReceiveRatio}}</span></el-col>
				<el-col :span="6"><span class="name">供应商收益比例：</span><span class="val">{{salesPointData.supplierSalesPointRatio}}</span></el-col>
			</el-row>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import deductionActionFun from '@f/action/report/deduction'
	export default {
		data () {
			return {
				deductionAction: deductionActionFun(this),
				tableData: null,
				total: 0,
				query: {
					dateStr: this.$route.query.date,
					supplierId: this.$route.query.id
				},
				supplierShow: false,
				salesPointShow: false,
				supplierData: '',
				salesPointData: ''
			}
		},
		created () {
			console.log(this.query)
			this.deductionAction.getDeductionDetail();
		},
		methods: {
			supplierDetails (data) {
				this.supplierData = data;
				this.supplierShow = true;
			},
			salesPointDetails (data) {
				this.salesPointData = data;
				this.salesPointShow = true;
			}
		}
	}
</script>