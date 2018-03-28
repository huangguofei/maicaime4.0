<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>个人设置</el-breadcrumb-item>
				<el-breadcrumb-item>修改密码</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<el-form ref="form" :model="pswData" :rules="rules" label-width="180px" style="width: 500px;">
				<el-form-item label="旧密码" prop="oldUserPassword">
					<el-input type="password" v-model="pswData.oldUserPassword" placeholder ="请输入旧密码" clearable></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newUserPassword">
					<el-input type="password" v-model="pswData.newUserPassword" placeholder ="请输入新密码" clearable></el-input>
				</el-form-item>
				<el-form-item label="重复新密码" prop="newUserPasswords">
					<el-input type="password" v-model="pswData.newUserPasswords" placeholder ="请重新输入旧密码" clearable></el-input>
				</el-form-item>
				<el-form-item style="text-align: center;">
					<el-button type="primary" @click="onSubmit">确认修改</el-button>
					<el-button @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>

		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import userInfoActionFun from '@f/action/set/user'
	export default {
		data () {
			var pswCheck = (rule, value, callback) => {
				if(this.pswData.newUserPassword === this.pswData.newUserPasswords) {
					callback();
				} else {
					callback(new Error('两次输入的密码不一致！'));
				}
			}
			return {
				userInfoAction: userInfoActionFun(this),
				total: 0,
				pswData: {
					oldUserPassword: '',
					newUserPassword: '',
					newUserPasswords: ''
				},
				rules: {
					oldUserPassword: [{
						required: true, message: '请输入旧密码', trigger: 'blur'
					}],
					newUserPassword: [{
						required: true, message: '请输入新密码', trigger: 'blur'
					}],
					newUserPasswords: [{
						required: true, message: '请重复输入新密码', trigger: 'blur'
					},
					{
						validator: pswCheck,
						trigger: 'blur'
					}]
				}
			}
		},
		created () {
			
		},
		methods: {
			onSubmit: function () {
				this.userInfoAction.pswEdit();
			},
			cancel: function () {
				this.pswData = {
					oldUserPassword: '',
					newUserPassword: '',
					newUserPasswords: ''
				}
			}
		}
	}
</script>