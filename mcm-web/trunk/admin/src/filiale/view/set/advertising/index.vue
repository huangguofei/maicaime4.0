<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>业务设置</el-breadcrumb-item>
				<el-breadcrumb-item>业务广告</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
			<el-button type="primary" @click="addAccount('add')" size="small" style="float:right;">添加广告</el-button>
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column prop="index" label="顺序">
						</el-table-column>
						<el-table-column label="图片">
							<template slot-scope="scope">
								<img :src="scope.row.src" />
							</template>
						</el-table-column>
						<el-table-column prop="href" label="跳转链接">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="160">
							<template slot-scope="scope">
								<el-button @click="addAccount('edit')" type="text" size="small">
									修改
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
		</mcm-page-content>
		<el-dialog :title="diaAccount.title" :visible.sync="diaAccount.show" width="30%">
			<el-form label-width="70px" class="demo-ruleForm">
				<el-row v-for="(v, k) in ruleForm" :key="k" style="margin-bottom: 10px;">
					<el-col :span="6">
						<el-upload class="avatar-uploader" v-loading="v.loading" :action="uploadUrl" name="imgFile" :show-file-list="false" :on-success="mainImageSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="v.src" :src="v.src" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span class="remark">建议750*420</span>
					</el-col>
					<el-col :span="18">
						<el-form-item label="顺序">
							<el-input v-model="v.index" size="small" placeholder="顺序" auto-complete="off" style="width: 100px;"></el-input>
						</el-form-item>
						<el-form-item label="链接地址">
							<el-input v-model="v.href" size="small" placeholder="链接地址" auto-complete="off" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-button type="primary" size="small" icon="el-icon-plus" @click="addList" style="display: block; margin:0 auto ;">添加</el-button>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="diaAccount.show = false">取 消</el-button>
		    <el-button type="primary" @click="confimDialog('ruleForm')">确 定</el-button>
		  </span>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
	import advertisingActionFun from '@f/action/set/advertising'
	export default {
		data () {
			return {
				advertisingAction: advertisingActionFun(this),
				tableData: null,
				ruleForm: [],
				diaAccount: {
					show: false,
					title: ''
				},
				uploadUrl: process.env.API_ROOT + 'common/img/uploadSkuProduct',
				upLoadIndex: 0,
				editType: ''
			}
		},
		created () {
			this.loadData();
		},
		methods: {
			confimDialog (formName) {
				var _that = this;
				for(var i = 0; i < this.ruleForm.length; i++) {
					var v = this.ruleForm[i];
					if(!v.src) {
						_that.$message.error('第' + (i + 1) + '条广告图片未上传!');
						return false;
					}
					if(!v.index) {
						_that.$message.error('第' + (i + 1) + '条顺序不能为空!');
						return false;
					}
				}
				var options = JSON.stringify(this.ruleForm);
				if(this.editType === 'add') {
					this.advertisingAction.addAdvertising({
						'advertisingValue': options
					});	
				} else {
					this.advertisingAction.editAdvertising({
						'advertisingValue': options
					});	
				}
			},
			addAccount (type, data) {
				this.editType = type;
				this.diaAccount.show = true;
				var _that = this;
				if(type === 'add') {
					this.ruleForm = [];
					this.diaAccount.title = '添加广告';
					this.addList();
				} else {
					this.ruleForm = JSON.parse(JSON.stringify(this.tableData));
					this.diaAccount.title = '编辑广告';
					setTimeout(function () {
						_that.addClickEven();
					}, 300);
				}
			},
			loadData () {
				this.advertisingAction.getAdvertising();
			},
			beforeAvatarUpload (file) {
				if(cJs.upLoadImgSize(file)) {
					this.ruleForm[this.upLoadIndex].loading = true;
					return true;
				}
				return false;
			},
			mainImageSuccess (res, file) {
				console.log(res, file)
				this.ruleForm[this.upLoadIndex].loading = false;
				this.ruleForm[this.upLoadIndex].src = res.data;
			},
			addList () {
				if(this.ruleForm.length > 4) {
					this.$message.error('广告数量不能超过5个！');
					return false;
				}
				this.ruleForm.push({
					src: '',
					index: this.ruleForm.length + 1,
					href: '',
					loading: false
				});
				var _that = this;
				setTimeout(function () {
					_that.addClickEven();
				}, 300);
			},
			addClickEven () {
				var _that = this;
				var doms = document.getElementsByClassName('avatar-uploader');
				var clickEvent = function (i) {
					return function () {
						_that.upLoadIndex = i;
						console.log(i)
					}
				}
				for(var i = 0; i < doms.length; i++) {
					doms[i].addEventListener('click', clickEvent(i));
				}
			}
		}
	}
</script>
<style lang="less">
	.avatar-uploader-icon,
	.avatar {
		width: 80px;
		height: 80px;
		line-height: 80px;
	}
	
	.el-form-item {
		margin-bottom: 10px;
	}
	.remark{
		font-size: 14px;
		color: #ccc;
	}
</style>