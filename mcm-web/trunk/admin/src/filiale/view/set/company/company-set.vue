<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>分公司设置</el-breadcrumb-item>
				<el-breadcrumb-item>基础信息</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<el-form ref="form" :model="companyData" label-width="180px" style="width: 1000px;">
				<el-form-item label="公司名称">
					<p v-if="type=='show'">{{companyData.companyName}}</p>
					<el-input v-else v-model="companyData.companyName"></el-input>
				</el-form-item>
				<el-form-item label="公司负责人">
					<p v-if="type=='show'">{{companyData.principal}}</p>
					<el-input v-else v-model="companyData.principal"></el-input>
				</el-form-item>
				<el-form-item label="公司负责人电话">
					<p v-if="type=='show'">{{companyData.principalMobile}}</p>
					<el-input v-else v-model="companyData.principalMobile"></el-input>
				</el-form-item>
				<el-form-item label="公司地址">
					<p v-if="type=='show'">{{companyData.address}}</p>
					<el-input v-else v-model="companyData.address"></el-input>
				</el-form-item>
				<el-form-item style="text-align: center;">
					<el-button type="primary" v-show="type=='show'" @click="type='edit'">修改个人基本资料</el-button>
					<el-button type="primary" v-show="type=='edit'" @click="onSubmit">确认修改</el-button>
					<el-button @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>

		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import companyActionFun from '@f/action/set/company'
	export default {
		data () {
			return {
				companyAction: companyActionFun(this),
				previousData: '',
				total: 0,
				companyData: '',
				type: 'show'
			}
		},
		created () {
			this.loadCompany();
		},
		methods: {
			onSubmit: function () {
				this.companyAction.companySet();
			},
			loadCompany: function () {
				this.companyAction.getCompanyInfo();
			},
			cancel () {
				this.type = 'show';
				this.companyData = JSON.parse(JSON.stringify(this.previousData));
			}
		}
	}
</script>