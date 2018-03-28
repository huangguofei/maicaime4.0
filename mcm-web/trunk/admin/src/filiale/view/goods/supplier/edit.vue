<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>供应商品</el-breadcrumb-item>
			  <el-breadcrumb-item>{{$route.query.id ? '编辑商品' : '添加商品'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content type="form">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
				  <el-form-item label="商品名称" prop="productName">
				    <el-input v-model="ruleForm.productName" :maxlength="18" placeholder="商品名不能超过18个字符"></el-input>
				  </el-form-item>
				  <el-form-item label="单位(报价.结算)" prop="skuProductUnitId">
				    <el-select v-model="ruleForm.skuProductUnitId" placeholder="请选择单位">
				      <el-option :label="u.unitName" :value="u.skuProductUnitId" :key="index" v-for="(u, index) in unitList"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="等级" prop="grade">
				    <el-input v-model="ruleForm.grade"></el-input>
				  </el-form-item>
				  <el-form-item label="别名" prop="productAlias">
				    <el-input v-model="ruleForm.productAlias"></el-input>
				  </el-form-item>
				  <el-form-item label="储藏方式" prop="storageWay">
				    <el-input v-model="ruleForm.storageWay"></el-input>
				  </el-form-item>
				  <el-form-item label="品类" prop="productThirdCategoryId">
				    	 <el-cascader
						    :options="categoryList"
						    v-model="selectedOptions"
						    :props="props"
						    @change="categoryChange">
						  </el-cascader>
				  </el-form-item>
				   <el-form-item label="保质期" prop="expirationDate">
				    <el-input v-model="ruleForm.expirationDate"></el-input>
				  </el-form-item>
				  <el-form-item label="备注" prop="remark">
				    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
				  </el-form-item>
					<el-form-item label="商品主图" prop="mainImage">
						<el-upload
						  class="avatar-uploader"
						   v-loading="loading"
						  :action="uploadUrl"
						  name= "imgFile"
						  :show-file-list="false"
						  :on-success="mainImageSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="ruleForm.mainImage" :src="ruleForm.mainImage" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="商品副图" prop="minorImage">
						<el-upload
						  :multiple="true"
						  :action="uploadUrl"
						  list-type="picture-card"
						  :file-list="minorImageList"
						   name= "imgFile"
						  :on-success="minorImageSuccess"
						  :on-remove="handleRemove">
						  <i class="el-icon-plus"></i>
						</el-upload>
				  </el-form-item>
				   <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading">提交</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
			</el-form>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import supplierActionFun from '@f/action/goods/supplier'
export default{
	data () {
		return {
			supplierAction: supplierActionFun(this),
			ruleForm: {},
	        unitList: null,
	        categoryList: [],
	        selectedOptions: [],
	        loading: false,
	        dialogVisible: false,
	        props: {
	        	label: 'categoryName',
	        	value: 'productCategoryId',
	        	children: 'childrenList'
	        },
	        submitLoading: false,
	        uploadUrl: process.env.API_ROOT + 'common/img/uploadSkuProduct',
	        minorImageList: [],
	        rules: {
			  productName: [
			    { required: true, message: '请输入商品名称', trigger: 'blur' }
			  ],
			  remark: [
			    { required: true, message: '请输入备注信息', trigger: 'blur' }
			  ],
			  expirationDate: [
			    { required: true, message: '请输入保质期', trigger: 'blur' }
			  ],
			  storageWay: [
			    { required: true, message: '请输入储藏方式', trigger: 'blur' }
			  ],
			  grade: [
			    { required: true, message: '请输入等级', trigger: 'blur' }
			  ],
			  productAlias: [
			    { required: true, message: '请输入别名', trigger: 'blur' }
			  ], 
			  skuProductUnitId: [
			    { required: true, message: '请选择单位', trigger: 'blur' }
			  ],
			  mainImage: [
			    { required: true, message: '请上传商品主图', trigger: 'blur' }
			  ],
			  minorImage: [
			    { required: true, message: '请上传商品副图', trigger: 'blur' }
			  ],
			  productThirdCategoryId: [
			    { required: true, message: '请选择品类', trigger: 'blur' }
			  ]
			}
		}
	},
	created () {
		this.assignmentForm()
		if(this.$route.query.id) {
			this.supplierAction.getDetailInfo()
		}
		this.supplierAction.getUnitAllList()
		this.supplierAction.getCategoryList()
	},
	methods: {
		submitForm (formName) {
			if(this.minorImageList[0]) {
				this.ruleForm.minorImage = JSON.stringify(this.minorImageList)
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.submitLoading = true
					this.supplierAction.saveProdInfo()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm (formName) {
			this.$refs[formName].resetFields()
		},
		categoryChange (value) {
			if(value.length >= 3) {
				var form = this.ruleForm
				form.productFirstCategoryId = value[0]
				form.productSecondCategoryId = value[1]
				form.productThirdCategoryId = value[2]
			}
		},
		beforeAvatarUpload (file) {
			if(cJs.upLoadImgSize(file)) {
				this.loading = true
				return true;
			}
			return false;
		},
		mainImageSuccess (res, file) {
			this.loading = false
			this.ruleForm.mainImage = res.data
		},
		minorImageSuccess (res, file, fileList) {
			var isAllOverUpload = false;
			var _that = this;
			if(fileList[fileList.length - 1].status === 'success') {
				fileList.forEach((v, k) => {
					_that.minorImageList.push({
						name: v.name,
						url: v.response.data
					});
				});
			}
		},
		handleRemove (file, fileList) {
			this.minorImageList = fileList
		},
		assignmentForm (data) {
			this.ruleForm = {
	         	skuProductUnitId: data ? data.skuProductUnitId : null,
	         	productFirstCategoryId: data ? data.productFirstCategoryId : null,
	         	productSecondCategoryId: data ? data.productSecondCategoryId : null,
	         	productThirdCategoryId: data ? data.productThirdCategoryId : null,
	         	productName: data ? data.productName : null,
	         	productAlias: data ? data.productAlias : null,
	         	mainImage: data ? data.mainImage : null,
	         	minorImage: data ? data.minorImage : null,
	         	grade: data ? data.grade : null,
	         	storageWay: data ? data.storageWay : null,
	         	expirationDate: data ? data.expirationDate : null,
	         	remark: data ? data.remark : null
	        }
		}
	}
}
</script>