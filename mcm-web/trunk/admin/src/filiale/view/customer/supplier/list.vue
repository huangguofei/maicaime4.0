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
			<!--<el-form :inline="true" :model="query" class="">
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
						<el-table-column fixed prop="supplierId" label="供应商编号" width="150">
						</el-table-column>
						<el-table-column prop="user.mobile" label="登录账号">
						</el-table-column>
						<el-table-column prop="supplierName" label="供应商名称">
						</el-table-column>
						<el-table-column prop="principal" label="负责人">
						</el-table-column>
						<el-table-column prop="principalMobile" label="负责人电话">
						</el-table-column>
						<el-table-column prop="address" label="地址">
							<template slot-scope="scope">
								<p>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</p>
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
								<el-button v-show="scope.row.auditStatusId!=0" @click.native.prevent="shopDetails(scope.$index, scope.row,true)" type="text" size="small">详情</el-button>
								<el-button v-show="scope.row.auditStatusId==1" @click.native.prevent="shopDetails(scope.$index, scope.row)" type="text" size="small">审核</el-button>
								<el-button v-show="scope.row.auditStatus!=1" @click.native.prevent="disabled( scope.row)" type="text" size="small">{{scope.row.statusId==1?'禁用':'启用'}}</el-button> <br>
								<el-button v-show="scope.row.auditStatusId==2" @click.native.prevent="setGoods(scope.row)" type="text" size="small">设置供应商品</el-button><br>
								<el-button v-show="scope.row.auditStatusId==2" @click.native.prevent="setClass(scope.row)" type="text" size="small">设置分类</el-button><br>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="供应商详情" :visible.sync="detailShow" width="50%" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">供应商编号：</span><span class="val">{{detailsData.supplierId}}</span></el-col>
				<el-col :span="6"><span class="name">供应商名称：</span><span class="val">{{detailsData.supplierName}}</span></el-col>
				<el-col :span="6"><span class="name">负责人：</span><span class="val">{{detailsData.principal}}</span></el-col>
				<el-col :span="6"><span class="name">负责人电话：</span><span class="val">{{detailsData.principalMobile}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">简介：</span><span class="val">{{detailsData.brief}}</span></el-col>
				<el-col :span="6"><span class="name">创建时间：</span><span class="val">{{detailsData.creationTime}}</span></el-col>
				<el-col :span="4"><span class="name">省份：</span><span class="val">{{detailsData.province}}</span></el-col>
				<el-col :span="4"><span class="name">市：</span><span class="val">{{detailsData.city}}</span></el-col>
				<el-col :span="4"><span class="name">区：</span><span class="val">{{detailsData.city}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="24"><span class="name">详细地址：</span><span class="val">{{detailsData.address}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item" v-show="detailsData.shopImage">
				<el-col :span="20"><span class="name">店铺门照：</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="item" v-show="detailsData.shopImage">
				<el-col :span="20">
					<span class="val img">
			  		<img :src="detailsData.shopImage">
					</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="item" v-show="detailsData.businessLicenseImage">
				<el-col :span="20">
					<span class="name">营业执照：</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="item" v-show="detailsData.businessLicenseImage">
				<el-col :span="20">
					<span class="val img">
			  			<img :src="detailsData.businessLicenseImage">
					</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="item" style="text-align: center;" v-show="!isShowAuditBtn">
				<el-button @click.native.prevent="adudit(detailsData)" type="primary" size="small">审核</el-button>
			</el-row>
		</el-dialog>
		<el-dialog title="设置分类" :visible.sync="classShow" width="50%" class="dialog-detail">
			<el-tree :data="classData" v-if="classShow" ref="tree" node-key="productCategoryId" :default-checked-keys="selectClass" :props="treeConfig" show-checkbox @check-change="handleCheckChange">
			</el-tree>
			<div class="btn-group" style="margin-top: 20px; text-align: center;">
				<el-button @click="setClassEvent" type="primary" size="small">确定</el-button>
				<el-button @click="classShow=false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="设置商品" :visible.sync="goodsShow" width="50%" class="dialog-detail">
			<template>
				<el-transfer :data="goodsData" :titles="['全部商品','出售商品']" v-if="goodsShow" :props="transferConfig" filterable filter-placeholder="请输入拼音" v-model="selectGoods">
				</el-transfer>
			</template>
			<div class="btn-group" style="margin-top: 20px; text-align: center;">
				<el-button @click="setGoodsEvent" type="primary" size="small">确定</el-button>
				<el-button @click="goodsShow=false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="审核" :visible.sync="auditShow" width="50%" class="dialog-audit">
			<el-row :gutter="20" class="item">
				<el-col :span="3" style="text-align: right;">审核:</el-col>
				<el-col :span="18">
					<el-radio v-model="options.auditStatus" label="2">通过</el-radio>
					<el-radio v-model="options.auditStatus" label="3">不通过</el-radio>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="item" style="margin: 10px 0;">
				<el-col :span="3" style="text-align: right;">审核备注：</el-col>
				<el-col :span="18">
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
	import supplierFun from '@f/action/customer/supplier'
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
				tableData: [],
				detailsData: {},
				classData: [],
				selectClass: [],
				goodsData: [],
				selectGoods: [],
				beforeGoods: [],
				beforeAllGoods: [],
				step: 0,
				treeConfig: {
					children: 'childrenList',
					label: 'categoryName'
				},
				transferConfig: {
					key: 'skuProductId',
					label: 'productName'
				},
				total: 0,
				detailShow: false,
				classShow: false,
				goodsShow: false,
				auditShow: false,
				isShowAuditBtn: false,
				dataFun: supplierFun(this),
				options: {
					auditStatus: '2',
					remark: ''
				},
				classOp: {
					productSecondCategoryIds: [],
					supplierId: ''
				},
				goodsOp: {
					supplierId: '',
					saveProductIds: [],
					delSsprIds: []
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
			search () {
				this.initPage();
			},
			adudit (data) {
				this.auditShow = true;
				this.options.auditId = data.auditId;
				this.options.supplierId = data.supplierId;
				this.options.customerProfileId = data.customerProfileId;
			},
			auditEven () {
				if(!this.options.remark) {
					this.$message.error('备注不能为空！');
					return false;
				}
				this.dataFun.auditSupplier();
			},
			disabled (data) {
				console.log(data);
				var options = {
					supplierId: data.supplierId,
					status: data.statusId === 1 ? '0' : '1'
				}
				this.dataFun.disabledSupplier(options);
			},
			handleCheckChange (data, checked, indeterminate) {
				//				console.log(data, checked, indeterminate);
			},
			setClass (data) {
				this.dataFun.getAllClass();
				this.dataFun.getClass({
					supplierId: data.supplierId
				});
				this.classOp.supplierId = data.supplierId;
			},
			setGoods (data) {
				var _that = this;
				this.dataFun.getClass({
					supplierId: data.supplierId
				}, function (datas) {
					if(datas.length === 0) {
						_that.$message.error('请先设置分类！');
						return false;
					}
					var classList = [];
					datas.forEach((v, k) => {
						classList.push(v.productSecondCategoryId);
					})
					_that.dataFun.getAllGoods(classList);
					_that.dataFun.getGoods({
						pageNum: 1,
						pageSize: 1000,
						supplierId: data.supplierId
					});
					_that.goodsOp.supplierId = data.supplierId;
				});
			},
			setClassEvent () {
				var selectNode = this.$refs.tree.getCheckedNodes();
				var _that = this;
				_that.classOp.productSecondCategoryIds = [];
				selectNode.forEach((v, k) => {
					if(v.tier === 2) {
						_that.classOp.productSecondCategoryIds.push(v.productCategoryId);
					}
				});
				this.dataFun.setClass(_that.classOp);
			},
			setGoodsEvent () {
				var _that = this;
				var delList = [];
				_that.goodsOp.delSsprIds = [];
				_that.goodsOp.saveProductIds = [];
				if(this.beforeGoods.length > 0) {
					if(_that.selectGoods.length > 0) {
						this.selectGoods.forEach((v, k) => {
							if(_that.beforeGoods.indexOf(v) < 0) {
								_that.goodsOp.saveProductIds.push(v);
							}
						});
						this.beforeGoods.forEach((i, j) => {
							if(_that.selectGoods.indexOf(i) < 0) {
								delList.push(i);
							}
						});
					} else {
						delList = this.beforeGoods;
					}
				} else {
					this.goodsOp.saveProductIds = this.selectGoods;
				}
				console.log(_that.goodsOp.delSsprIds)
				delList.forEach((v, k) => {
					_that.beforeAllGoods.forEach((i, j) => {
							if(i.skuProductId === v) {
								_that.goodsOp.delSsprIds.push(i.ssprId);
							}
					});
				});
				console.log(_that.goodsOp);
				this.dataFun.setGoods();
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
			max-height: 100px;
		}
	}
</style>