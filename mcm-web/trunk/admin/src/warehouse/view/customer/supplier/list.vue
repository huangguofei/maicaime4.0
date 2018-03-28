<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>客户中心</el-breadcrumb-item>
				<el-breadcrumb-item>供应商</el-breadcrumb-item>
				<el-breadcrumb-item>供应商列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!--<mcm-page-tab :tabs="tabs"></mcm-page-tab>-->
		<mcm-page-search>
			<el-form :inline="true" :model="query" class="">
				<el-form-item label="供应商编号">
					<el-input v-model="query.supplierId" placeholder="供应商编号"></el-input>
				</el-form-item>
				<el-form-item label="供应商名字">
					<el-input v-model="query.supplierName" placeholder="供应商名字"></el-input>
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
				<el-form-item>
					<el-button type="primary" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed prop="supplierId" label="供应商编号" width="150">
						</el-table-column>
						<el-table-column prop="user.mobile" label="登录账号">
						</el-table-column>
						<el-table-column prop="supplierName" label="供应商名称">
						</el-table-column>
						<el-table-column prop="principal" label="负责人">
						</el-table-column>
						<el-table-column prop="principalMobile" label="联系电话">
						</el-table-column>
						<el-table-column prop="address" label="地址">
							<template slot-scope="scope">
								<p>{{scope.row.province}}{{scope.row.city}}{{scope.row.address}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="creationTime" label="注册时间">
						</el-table-column>
						<el-table-column prop="statusText" label="状态">
						</el-table-column>
						<el-table-column prop="auditStatusText" label="审核状态">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click.native.prevent="showGoods(scope.row)" type="text" size="small">查看商品</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="商品列表" :visible.sync="goodsShow" width="50%" class="dialog-detail">
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="goodsData" style="width: 100%">
						<el-table-column fixed prop="skuProductId" label="商品编号">
						</el-table-column>
						<el-table-column prop="productName" label="商品名称">
						</el-table-column>
						<el-table-column prop="productAlias" label="商品别名">
						</el-table-column>
						<el-table-column prop="skuProductUnitName" label="单位">
						</el-table-column>
						<el-table-column prop="grade" label="等级">
						</el-table-column>
						<el-table-column prop="expirationDate" label="有效期">
						</el-table-column>
						<el-table-column prop="creationTime" label="上架时间">
						</el-table-column>
						<el-table-column prop="skuProductStatusText" label="状态">
						</el-table-column>
						<el-table-column prop="remark" label="备注">
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="goodsTotal" @currentChange="gCurrentChange"></mcm-pagination>
		</el-dialog>

	</mcm-page-area>
</template>
<script>
	import supplierFun from '@w/action/customer/supplier'
	export default {
		data () {
			return {
				query: {
					supplierName: '',
					supplierId: '',
					keyword: '',
					status: '',
					auditStatus: '',
					companyId: '',
					time: '',
					pageSize: 10,
					pageNum: 1
				},
				goodsQuery: {
					pageSize: 10,
					pageNum: 1
				},
				tableData: [],
				goodsData: [],
				total: 0,
				goodsTotal: 0,
				goodsShow: false,
				supplierId: '',
				dataFun: supplierFun(this),
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
			this.initPage();
		},
		methods: {
			initPage () {
				this.tableData = [];
				this.dataFun.getsupplierList();
			},
			shopDetails (index, data, isAudit) {
				this.isShowAuditBtn = isAudit ? isAudit : false;
				this.dataFun.getsupplierDetails(data.supplierId);
			},
			currentChange (page) {
				this.query.pageNum = page;
				this.dataFun.getsupplierList();
			},
			gCurrentChange (page) {
				this.goodsQuery.pageNum = page;
				this.dataFun.getsupplierGoods(this.supplierId);
			},
			search () {
				this.initPage();
			},
			showGoods (data) {
				this.goodsShow = true;
				this.supplierId = data.supplierId;
				this.dataFun.getsupplierGoods(this.supplierId);
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