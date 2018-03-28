<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>客户中心</el-breadcrumb-item>
				<el-breadcrumb-item>商户</el-breadcrumb-item>
				<el-breadcrumb-item>商户列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!--<mcm-page-tab :tabs="tabs"></mcm-page-tab>-->
		<mcm-page-search>
			<el-form :inline="true" :model="query" class="">
				<el-form-item label="商户编号">
					<el-input v-model="query.buyerId" placeholder="商户编号"></el-input>
				</el-form-item>
				<el-form-item label="登录账号">
					<el-input v-model="query.buyerName" placeholder="登录账号"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="query.status" clearable placeholder="请选择">
					    <el-option
					      v-for="item in status"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="审批状态">
					<el-select v-model="query.auditStatus" clearable placeholder="请选择">
					    <el-option
					      v-for="item in auditStatus"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-date-picker v-model="query.time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
					</el-date-picker>
				</el-form-item>
				<!--
				<el-form-item label="关键字">
					<el-input v-model="query.keyword" placeholder="关键字"></el-input>
				</el-form-item>
				-->
				<el-form-item>
					<el-button type="primary" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed prop="buyerId" label="商户编号" width="150">
						</el-table-column>
						<el-table-column prop="user.mobile" label="登录账号">
						</el-table-column>
						<el-table-column prop="buyerName" label="店铺名称">
						</el-table-column>
						<el-table-column prop="principal" label="负责人">
						</el-table-column>
						<el-table-column prop="principalMobile" label="负责人电话">
						</el-table-column>
						<el-table-column prop="expectedReceiptTime" label="期望收货时间">
						</el-table-column>
						<el-table-column prop="address" label="详细地址" width="120">
						</el-table-column>
						<el-table-column prop="creationTime" label="注册时间">
						</el-table-column>
						<el-table-column prop="statusText" label="状态">
						</el-table-column>
						<el-table-column prop="auditStatusText" label="审核状态">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button v-show="scope.row.auditStatusId!=0" @click.native.prevent="shopDetails(scope.$index, scope.row,true)" type="text" size="small">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="商户详情" :visible.sync="detailShow" width="50%" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">商户编号：</span><span class="val">{{detailsData.buyerId}}</span></el-col>
				<el-col :span="6"><span class="name">店铺名称：</span><span class="val">{{detailsData.buyerName}}</span></el-col>
				<el-col :span="6"><span class="name">负责人：</span><span class="val">{{detailsData.principal}}</span></el-col>
				<el-col :span="6"><span class="name">负责人电话：</span><span class="val">{{detailsData.principalMobile}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">创建时间：</span><span class="val">{{detailsData.creationTime}}</span></el-col>
				<el-col :span="18"><span class="name">店铺地址：</span><span class="val">{{detailsData.address}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">期望收货时间：</span><span class="val">{{detailsData.expectedReceiptTime}}</span></el-col>
				<el-col :span="6"><span class="name">收货人：</span><span class="val">{{detailsData.deliverName}}</span></el-col>
				<el-col :span="6"><span class="name">收货人电话：</span><span class="val">{{detailsData.deliverMobile}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="20"><span class="name">身份证审核：</span><span class="val img">
			  	<img :src="detailsData.identityCardFrontImage">
			  	<img :src="detailsData.identityCardReverseImage">
			</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="20"><span class="name">店铺门头照：</span><span class="val img">
			  	<img :src="detailsData.shopImage">
			</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="20"><span class="name">&nbsp;营业执照：</span><span class="val img">
			  	<img :src="detailsData.businessLicenseImage">
			</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item" style="text-align: center;" v-show="!isShowAuditBtn">
				<el-button @click.native.prevent="adudit(detailsData)" type="primary" size="small">审核</el-button>
			</el-row>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import purchaserFun from '@w/action/customer/purchaser'
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
				dataFun: purchaserFun(this),
				options: {
					auditStatus: '2',
					remark: '',
					customerProfileId: ''
				},
				clientData: [],
				status: [{
					value: '-1',
        			label: '已删除'
				},
				{
					value: '0',
        			label: '禁用'
				},
				{
					value: '1',
        			label: '正常'
				},
				{
					value: '2',
        			label: '只读'
				}],
				auditStatus: [{
					value: '0',
        			label: '未提交'
				},
				{
					value: '1',
        			label: '待审核'
				},
				{
					value: '2',
        			label: '已通过'
				},
				{
					value: '3',
        			label: '未通过'
				}],
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
			this.dataFun.getpurchaserList();
		},
		methods: {
			shopDetails (index, data, isAudit) {
				this.isShowAuditBtn = isAudit ? isAudit : false;
				this.dataFun.getpurchaserDetails(data.buyerId);
			},
			currentChange (page) {
				this.query.pageNum = page;
				this.dataFun.getpurchaserList();
			},
			search () {
				this.tableData = [];
				this.dataFun.getpurchaserList();
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