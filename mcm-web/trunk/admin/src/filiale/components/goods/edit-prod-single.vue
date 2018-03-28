<!-- 单规格 -->
<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
	  <el-form-item label="商品名称" prop="productName">
	    <el-input v-model="ruleForm.productName"  :maxlength="18" placeholder="商品名不能超过18个字符"></el-input>
	  </el-form-item>
	  <el-form-item label="等级" prop="grade">
	    <el-input v-model="ruleForm.grade"></el-input>
	  </el-form-item>
	  <el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="销售单位" prop="sellUnit">
	  				<el-input v-model="ruleForm.sellUnit"></el-input>
	 			 </el-form-item>
				
			</el-col>
			<el-col :span="1">
				<span style="font-size:36px;margin-top:20px;">=</span>
			</el-col>
			<el-col :span="10">
				<el-form-item label=" " prop="matrixingMultiple">
	  				<el-input v-model.number="ruleForm.matrixingMultiple" type="matrixingMultiple"> <template slot="append" v-if="selectProd">{{selectProd.skuProductUnitName}}</template></el-input>
	 			 </el-form-item>
			</el-col>
	    </el-row>
	  <el-form-item label="是否称重" prop="isWeigh">
	    <el-switch v-model="ruleForm.isWeigh"></el-switch><span v-if="!ruleForm.isWeigh &&  selectProd">按照{{ruleForm.matrixingMultiple}}{{selectProd.skuProductUnitName}}结算</span>
	  </el-form-item>
	 
	   <el-form-item label="原价" prop="originalPrice">
	    <el-input v-model.number="ruleForm.originalPrice" type="originalPrice"></el-input>
	  </el-form-item>
	   <el-form-item label="销售价" prop="sellPrice" v-if="!$route.query.id">
	    <el-input v-model.number="ruleForm.sellPrice" type="sellPrice"></el-input>
	  </el-form-item>
	  <el-form-item label="别名" prop="productAlias">
	    <el-input v-model="ruleForm.productAlias"></el-input>
	  </el-form-item>
	  <el-form-item label="储藏方式" prop="storageWay">
	    <el-input v-model="ruleForm.storageWay"></el-input>
	  </el-form-item>
	  <el-form-item label="品类" prop="productThirdCategoryId">
	    	 <el-cascader
	    	 	v-if="categoryList"
			    :options="categoryList"
			    v-model="selectedOptions"
			    :props="props"
			    @change="categoryChange">
			  </el-cascader>

	  </el-form-item>
	   <el-form-item label="保质期" prop="expirationDate">
	    <el-input v-model="ruleForm.expirationDate"></el-input>
	  </el-form-item>
	  <el-form-item label="客户群体" prop="customerProfileId">
	    <el-select v-model="ruleForm.customerProfileId" placeholder="请选择客户群体" :disabled="$route.query.id ? true : false">
	      <el-option :label="c.profileName" :value="c.customerProfileId" :key="index" v-for="(c, index) in customerList"></el-option>
	    </el-select>
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
			  :action="uploadUrl"
			  list-type="picture-card"
			   name= "imgFile"
			  :file-list="minorImageList"
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
</template>
<script>
import salesActionFun from '@f/action/goods/sales'
export default{
	data () {
		return {
			salesAction: salesActionFun(this),
			loading: false,
			ruleForm: {},
			selectedOptions: [],
			props: {
	        	label: 'categoryName',
	        	value: 'productCategoryId',
	        	children: 'childrenList'
	        },
	        uploadUrl: process.env.API_ROOT + 'common/img/uploadSellProduct',
	        minorImageList: [],
	        submitLoading: false,
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
			  ],
			  originalPrice: [
			    { required: true, message: '请输入原价', trigger: 'blur' },
			    { type: 'number', message: '请输入数字类型', trigger: 'blur' }
			  ],
			  sellPrice: [
			    { required: true, message: '请输入销售价', trigger: 'blur' },
			    { type: 'number', message: '请输入数字类型', trigger: 'blur' }
			  ],
			  sellUnit: [
			    { required: true, message: '请输入单位', trigger: 'blur' }
			  ],
			  customerProfileId: [
			    { required: true, message: '请选择客户群体', trigger: 'blur' }
			  ],
			  matrixingMultiple: [
			    { required: true, message: '请输入单位换算', trigger: 'blur' },
			    { type: 'number', message: '请输入数字类型', trigger: 'blur' }
			  ]
			}
		}
	},
	created () {
		this.assignmentForm()
	},
	props: {
		unitList: {
			type: Array,
			default: null
		},
        categoryList: {
			type: Array,
			default: null
		},
        customerList: {
			type: Array,
			default: null
		},
        selectProd: {
			type: Object,
			default: null
		}
	},
	mounted () {
		
	},
	methods: {
		submitForm (formName) {
			if(!this.ruleForm.skuProductId) {
				this.$message('还没有选择商品')
				return false
			}
			if(this.minorImageList[0]) {
				this.ruleForm.minorImage = JSON.stringify(this.minorImageList)
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.submitLoading = true
					this.salesAction.saveProdInfo(0)
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm (formName) {
			this.$refs[formName].resetFields()
		},
		assignmentForm (data) {
			this.ruleForm = {
	         	productFirstCategoryId: data ? data.productFirstCategoryId : null,
	         	productSecondCategoryId: data ? data.productSecondCategoryId : null,
	         	productThirdCategoryId: data ? data.productThirdCategoryId : null,
	         	productName: data ? data.productName : null,
	         	productAlias: data ? data.productAlias : null,
	         	mainImage: data ? data.mainImage : null,
	         	minorImage: data ? data.minorImage : null,
	         	grade: data ? data.grade : null,
	         	expirationDate: data ? data.expirationDate : null,
	         	remark: data ? data.remark : null,
	         	sellUnit: data ? data.sellUnit : null,
	         	sellPrice: data ? data.sellPrice : null,
	         	originalPrice: data ? data.originalPrice : null,
	         	matrixingMultiple: data ?  data.matrixingMultiple : '',
	         	isWeigh: data ? data.isWeigh : false,
	         	customerProfileId: data ? data.customerProfileId : '',
	         	storageWay: data ? data.storageWay : ''
	        }
	        if(data) {
	        	this.selectedOptions = []
	        	this.selectedOptions[0] = data.productFirstCategoryId
 				this.selectedOptions[1] = data.productSecondCategoryId
 				this.selectedOptions[2] = data.productThirdCategoryId
 				if(this.selectProd) {
 					this.selectProd.skuProductUnitName = data.settleUnit
 				}
 				try {
 					this.minorImageList = JSON.parse(data.minorImage)
	         	} catch (e) {}
	        }
	        if(this.$route.query.id) {
	        	this.ruleForm.sellProductId = data.sellProductId
	        }
	        if(data && data.skuProductId) {
	        	this.ruleForm.skuProductId = data.skuProductId
	        }
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
		minorImageSuccess (res, file) {
			this.minorImageList.push({
				name: file.name,
				url: res.data
			})
		},
		handleRemove (file, fileList) {
			this.minorImageList = fileList
		},
		selectProdVal (row) {
			this.assignmentForm(row)
			var form = this.ruleForm
			form.skuProductId = row.skuProductId
			form.isWeigh = row.skuProductUnit.isWeigh
		}
	}
}
</script>
