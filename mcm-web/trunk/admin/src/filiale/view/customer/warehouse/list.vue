<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>客户中心</el-breadcrumb-item>
				<el-breadcrumb-item>中心仓</el-breadcrumb-item>
				<el-breadcrumb-item>中心仓列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!--<mcm-page-tab :tabs="tabs"></mcm-page-tab>-->
		<mcm-page-search>
			
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%" max-height="250">
						<el-table-column fixed prop="warehouseId" label="仓库编号" width="150">
						</el-table-column>
						<el-table-column prop="warehouseName" label="仓库名称">
						</el-table-column>
						<el-table-column prop="contactName" label="仓库联系人">
						</el-table-column>
						<el-table-column prop="mobile" label="联系人电话">
						</el-table-column>
						<el-table-column label="地址">
							<template slot-scope="scope">
								<p>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="statusText" label="状态">
						</el-table-column>
						<el-table-column prop="creationTime" label="创建时间">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click.native.prevent="shopDetails(scope.$index, scope.row,true)" type="text" size="small">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
		</mcm-page-content>
		<el-dialog title="中心仓详情" :visible.sync="detailShow" width="50%" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">仓库编号：</span><span class="val">{{detailsData.warehouseId}}</span></el-col>
				<el-col :span="6"><span class="name">仓库名称：</span><span class="val">{{detailsData.warehouseName}}</span></el-col>
				<el-col :span="6"><span class="name">负责人：</span><span class="val">{{detailsData.contactName}}</span></el-col>
				<el-col :span="6"><span class="name">联系电话：</span><span class="val">{{detailsData.mobile}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">状态：</span><span class="val">{{detailsData.statusText}}</span></el-col>
				<el-col :span="6"><span class="name">创建时间：</span><span class="val">{{detailsData.creationTime}}</span></el-col>
				
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="20"><span class="name">地址：</span><span class="val">{{detailsData.province}}{{detailsData.city}}{{detailsData.address}}{{detailsData.area}}</span></el-col>
			</el-row>
		</el-dialog>
		<el-dialog title="审核" :visible.sync="auditShow" width="50%" class="dialog-audit">
			<el-row :gutter="20" class="item">
				<el-col :span="4" style="text-align: right;">审核</el-col>
				<el-col :span="20">
					<el-radio v-model="options.auditStatus" label="2">通过</el-radio>
					<el-radio v-model="options.auditStatus" label="3">不通过</el-radio>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="item" style="margin: 10px 0;">
				<el-col :span="4" style="text-align: right;">审核备注</el-col>
				<el-col :span="20">
					<el-input type="textarea" :rows="2" placeholder="备注" v-model="options.remark">
					</el-input>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="item" style="text-align: center;">
				<el-button @click.native.prevent="auditEven" type="primary" size="small">确定</el-button>
			</el-row>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import warehouseActionFun from '@f/action/customer/warehouse'
	export default {
		data () {
			return {
				query: {
					buyerName: '',
					buyerId: '',
					keyword: '',
					status: '',
					auditStatus: '',
					companyId: '',
					customerProfileId: '',
					identificationCode: '',
					time: '',
					pageSize: 10,
					pageNum: 1
				},
				tableData: [],
				detailsData: {},
				total: 0,
				detailShow: false,
				auditShow: false,
				isShowAuditBtn: false,
				warehouseAction: warehouseActionFun(this),
				options: {
					auditStatus: '2',
					remark: ''
				}
			}
		},
		created () {
			this.warehouseAction.getWarehouseList();
		},
		methods: {
			shopDetails (index, data, isAudit) {
				this.isShowAuditBtn = isAudit ? isAudit : false;
				this.warehouseAction.getWarehouseDetails(data.warehouseId);
			},
			currentChange (page) {
				this.query.pageNum = page;
				this.warehouseAction.getWarehouseList();
			},
			search () {
				this.tableData = [];
				this.warehouseAction.getWarehouseList();
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