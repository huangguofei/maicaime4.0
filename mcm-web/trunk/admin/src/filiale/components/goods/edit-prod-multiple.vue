<!-- 多规格 -->
<template>
<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
	<el-form-item label="商品名称" prop="productName">
	    <el-input v-model="ruleForm.productName"  :maxlength="18" placeholder="商品名不能超过18个字符"></el-input>
	  </el-form-item>
		<el-card class="box-card" :key="index" v-for="(item, index) in ruleForm.items">
			<div class="h">
				<span class="sign">规格{{index + 1}}</span>
				<span class="del el-icon-delete" @click="delItems(index)"></span>
				
			</div>
		  	 <el-form-item label="规格名称" :prop="'items['+index+'].specName'"
		  	 	 :rules="[
				      { required: true, message: '请输入规格名称', trigger: 'blur' }
				    ]"
		  	 	>
			    <el-input v-model="item.specName"></el-input>
			  </el-form-item>
			  <el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="销售单位"  :prop="'items['+index+'].sellUnit'"
						:rules="[
					      { required: true, message: '请输入销售单位', trigger: 'blur' }
					    ]"
					>
		  				<el-input v-model="item.sellUnit"></el-input>
		 			 </el-form-item>
				</el-col>
				<el-col :span="1">
					<span style="font-size:36px;margin-top:20px;">=</span>
				</el-col>
				<el-col :span="10">
					<el-form-item label=" " :prop="'items['+index+'].matrixingMultiple'"
						:rules="[
					      { required: true, message: '请输入单位换算', trigger: 'blur' },
			    		  { type: 'number', message: '请输入数字类型', trigger: 'blur' }
					    ]"
					>
		  				<el-input v-model.number="item.matrixingMultiple" type="matrixingMultiple"> <template slot="append" v-if="selectProd">{{selectProd.skuProductUnitName}}</template></el-input>
		 			 </el-form-item>
				</el-col>
		    </el-row>
			  <el-form-item label="是否称重" prop="isWeigh">
			    <el-switch v-model="item.isWeigh"></el-switch><span v-if="!item.isWeigh &&  selectProd">按照{{item.matrixingMultiple}}{{selectProd.skuProductUnitName}}结算</span>
			  </el-form-item>
			   <el-form-item label="原价" :prop="'items['+index+'].originalPrice'"
			   		:rules="[
					     { required: true, message: '请输入原价', trigger: 'blur' },
			    		{ type: 'number', message: '请输入数字类型', trigger: 'blur' }
				    ]"
			   >
			    <el-input v-model.number="item.originalPrice" type="originalPrice"></el-input>
			  </el-form-item>
			   <el-form-item v-if="!$route.query.id" label="销售价" :prop="'items['+index+'].sellPrice'"
			   		:rules="[
					    { required: true, message: '请输入销售价', trigger: 'blur' },
			    		{ type: 'number', message: '请输入数字类型', trigger: 'blur' }
				    ]"
			   >
			    <el-input v-model.number="item.sellPrice" type="sellPrice"></el-input>
			  </el-form-item>
			  <el-button type="primary" class="up-down" size="mini" @click="upDownEvent(item)">{{item.sellProductStatusId === 1 ? '下架' : '上架'}}</el-button>
		</el-card>
		<el-card class="box-card add-card" >
			<div class="con" @click="addProdSku">
				<i class="icon"></i><span>添加规格</span>
			</div>
		</el-card>
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
	  <el-form-item label="客户群体" prop="customerProfileId" >
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
			  sellUnit: [
			    { required: true, message: '请输入单位', trigger: 'blur' }
			  ],
			  customerProfileId: [
			    { required: true, message: '请选择客户群体', trigger: 'blur' }
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
	methods: {
		submitForm (formName) {
			if(!this.$route.query.id && !this.ruleForm.skuProductId) {
				this.$message('还没有选择商品')
				return false
			}
			if(this.minorImageList[0]) {
				this.ruleForm.minorImage = JSON.stringify(this.minorImageList)
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.submitLoading = true
					this.salesAction.saveProdInfo(1)
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		upDownEvent (item) {
			var mes = ''
			mes = item.sellProductStatusId === 1 ? '下架该商品' : '上架该商品'
			this.$confirm('此操作将' + mes + ', 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			 	this.salesAction.shelvesOffTheShelf(item, () => {
			 	})
			}).catch(() => {
			  	
			})
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
	         	customerProfileId: data ? data.customerProfileId : '',
	         	storageWay: data ? data.storageWay : '',
	         	items: []
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
	         		if(this.$route.query.id) {
	         			var prods = data.products
		         		for (var i in prods) {
		         			var items = this.initItems(prods[i])
		         			items.sellProductId = prods[i].sellProductId
		         			items.sellProductStatusId = prods[i].sellProductStatusId
		         			this.ruleForm.items.push(items)
		         		}
	         		} else {
						this.ruleForm.items.push(this.initItems())
	         		}
	         	} catch (e) {}
	        } else {
	        	this.ruleForm.items.push(this.initItems())
	        }
	        if(this.$route.query.id) {
	        	this.ruleForm.sellProductId = data ? data.sellProductId : ''
	        }
	        if(data && data.skuProductId) {
	        	this.ruleForm.skuProductId = data.skuProductId
	        }
		},
		initItems (data) {
			return {
     			specName: data ? data.specName : '',
     			sellUnit: data ? data.sellUnit : '',
     			sellPrice: data ? data.sellPrice : '',
     			originalPrice: data ? data.originalPrice : '',
     			matrixingMultiple: data ? data.matrixingMultiple : '',
     			isWeigh: data ? data.isWeigh : false
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
			var form = this.ruleForm
			this.assignmentForm(row)
		},
		addProdSku () {
			this.ruleForm.items.push(this.initItems())
		},
		delItems (index) {
			if(this.ruleForm.items.length <= 1) {
				this.$message('最后保留一个')
				return false
			}
			this.ruleForm.items.splice(index, 1)
		}
	}
}
</script>
<style lang="less" scoped>
	@import "../../public/less/config.less";
	.box-card{
		position: relative;
		margin-top: 20px;
		.sign{
			position: relative;
			top: 0;
			background: @mcm-color-primary;
			color:#FFF;
			padding: 8px 20px;
		}
		.del{
			float:right;
		}
		.h{
			height: 35px;
			margin-bottom: 5px;
		}
	}
	.up-down{
		float: right;
	}
	.add-card{
		color: @mcm-color-primary;
		margin: 20px 0;
		cursor: pointer;
		.icon{
			position: absolute;
			display:inline-block;
			width: 30px;
			height: 30px;
			top: 10px;
			background: url(../../images/add-icon.png) no-repeat;
			background-size: cover;
		}
		span{
			display: inline-block;
			margin-left: 35px;
		}
		.con{
			display: block;
		}
	}
</style>
