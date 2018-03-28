<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>客户中心</el-breadcrumb-item>
				<el-breadcrumb-item>司机</el-breadcrumb-item>
				<el-breadcrumb-item>司机列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!--<mcm-page-tab :tabs="tabs"></mcm-page-tab>-->
		<mcm-page-search>
			<!--<el-form :inline="true" :model="query" class="">
				<el-form-item label="司机编号">
					<el-input v-model="query.driverId" placeholder="编号"></el-input>
				</el-form-item>
				<el-form-item label="司机姓名">
					<el-input v-model="query.driverName" placeholder="司机姓名"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="query.status" clearable placeholder="请选择">
						<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审批状态">
					<el-select v-model="query.auditStatus" clearable placeholder="请选择">
						<el-option v-for="item in auditStatus" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-date-picker v-model="query.time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item label="关键字">
					<el-input v-model="query.keyword" placeholder="编号"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>-->
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed prop="driverId" label="司机编号" width="150">
						</el-table-column>
						<el-table-column prop="user.mobile" label="登录账号">
						</el-table-column>
						<el-table-column prop="driverName" label="司机姓名">
						</el-table-column>
						<el-table-column prop="idNumber" label="身份证号码">
						</el-table-column>
						<el-table-column prop="licensePlateNumber" label="牌照">
						</el-table-column>
						<el-table-column prop="deliverName" label="紧急联系人">
							<template slot-scope="scope">
								<p>{{scope.row.emergencyContact}}</p>
								<p>{{scope.row.emergencyContactMobile}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="createionTime" label="加入时间">
						</el-table-column>
						<el-table-column prop="statusText" label="状态">
						</el-table-column>
						<el-table-column prop="auditStatusText" label="审核状态">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click.native.prevent="shopDetails(scope.$index, scope.row,true)" type="text" size="small">详情</el-button>
								<el-button v-show="scope.row.auditStatusId==1" @click.native.prevent="shopDetails(scope.$index, scope.row)" type="text" size="small">审核</el-button>
								<el-button v-show="scope.row.auditStatus!=1" @click.native.prevent="disabled( scope.row)" type="text" size="small">{{scope.row.statusId==1?'禁用':'启用'}}</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="司机详情" :visible.sync="detailShow" width="50%" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">司机编号：</span><span class="val">{{detailsData.driverId}}</span></el-col>
				<el-col :span="6"><span class="name">司机姓名：</span><span class="val">{{detailsData.driverName}}</span></el-col>
				<el-col :span="6"><span class="name">身份证号：</span><span class="val">{{detailsData.idNumber}}</span></el-col>
				<el-col :span="6"><span class="name">联系电话：</span><span class="val">{{detailsData.emergencyContactMobile}}</span></el-col>
				<el-col :span="6"><span class="name">状态：</span><span class="val">{{detailsData.statusText}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">车辆类型：</span><span class="val">{{detailsData.vehicleType}}</span></el-col>
				<el-col :span="6"><span class="name">车牌号：</span><span class="val">{{detailsData.licensePlateNumber}}</span></el-col>
				<!--<el-col :span="6"><span class="name">车牌所有人：</span><span class="val">{{detailsData.licensePlateNumber}}</span></el-col>-->
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="12"><span class="name">车辆正面照：</span><span class="val img">
			  	<img :src="detailsData.vehicleImage"></span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="12"><span class="name">驾驶证照：</span><span class="val img">
			  	<img :src="detailsData.drivingLicenceImage"></span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="20"><span class="name">身份证审核：</span><span class="val img">
			  	<img :src="detailsData.identityCardFrontImage">
			  	<img :src="detailsData.identityCardReverseImage">
			</span></el-col>
			</el-row>

			<el-row :gutter="20" class="item" style="text-align: center;" v-show="!isShowAuditBtn">
				<el-button @click.native.prevent="adudit(detailsData)" type="primary" size="small">审核</el-button>
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
	import driverFun from '@f/action/customer/drivers'
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
				dataFun: driverFun(this),
				options: {
					auditStatus: '2',
					remark: ''
				},
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
					}
				],
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
					}
				],
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
			this.dataFun.getdriverList();
		},
		methods: {
			shopDetails (index, data, isAudit) {
				this.isShowAuditBtn = isAudit ? isAudit : false;
				this.dataFun.getdriverDetails(data.driverId);
			},
			currentChange (page) {
				this.query.pageNum = page;
				this.dataFun.getdriverList();
			},
			search () {
				this.tableData = [];
				this.dataFun.getdriverList();
			},
			adudit (data) {
				this.auditShow = true;
				console.log(data)
				this.options.auditId = data.auditId;
				this.options.driverId = data.driverId;
			},
			auditEven () {
				if(!this.options.remark) {
					this.$message.error('备注不能为空！');
					return false;
				}
				console.log(this.options)
				this.dataFun.auditDriver();
			},
			disabled (data) {
				console.log(data);
				var options = {
					driverId: data.driverId,
					status: data.statusId === 1 ? '0' : '1'
				}
				this.dataFun.disabledDriver(options);
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