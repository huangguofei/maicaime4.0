<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>个人设置</el-breadcrumb-item>
				<el-breadcrumb-item>基础信息</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<el-form ref="form" :model="userData" label-width="180px" style="width: 1000px;">
				<el-form-item label="用户头像">
					<img :src="userData.headImg" class="headimg" v-if="type=='show'"/>
					<el-upload v-else style='margin-left: 10px;' class="avatar-uploader" v-loading="loading" :action="uploadUrl" name="imgFile" :show-file-list="false" :on-success="mainImageSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="userData.headImg" :src="userData.headImg" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
				</el-form-item>
				<el-form-item label="用户姓名">
					<p>{{userData.userName}}</p>
				</el-form-item>
				<el-form-item label="用户昵称">
					<p v-if="type=='show'">{{userData.nickName}}</p>
					<el-input v-else v-model="userData.nickName"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<p v-if="type=='show'">{{userData.realName}}</p>
					<el-input v-else v-model="userData.realName"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<p>{{userData.mobile}}</p>
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
	import userInfoActionFun from '@w/action/set/user'
	export default {
		data () {
			return {
				userInfoAction: userInfoActionFun(this),
				userData: '',
				previousData: '',
				type: 'show',
				loading: false,
				uploadUrl: process.env.API_ROOT + 'common/img/uploadSkuProduct'
				
			}
		},
		created () {
			this.loadUserInfo();
		},
		methods: {
			onSubmit () {
				this.userInfoAction.userSet();
			},
			loadUserInfo () {
				this.userInfoAction.getUserInfo();
			},
			beforeAvatarUpload (file) {
				if(cJs.upLoadImgSize(file)) {
					this.loading = true;
					return true;
				}
				return false;
			},
			mainImageSuccess (res, file) {
				this.userData.headImg = res.data;
				this.loading = false;
			},
			cancel () {
				this.type = 'show';
				this.userData = JSON.parse(JSON.stringify(this.previousData));
			}
		}
	}
</script>
<style lang="less">
	.headimg{
		width: 100px;
		height: auto;
	}
</style>