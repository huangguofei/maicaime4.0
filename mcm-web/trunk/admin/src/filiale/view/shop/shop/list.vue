<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>店铺中心</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table
					    :data="tableData"
					    style="width: 100%"
					    >
					     <el-table-column
					      fixed
					      type="index"
					      width="50">
					    </el-table-column>
					    <el-table-column
					      prop="shopName"
					      label="店铺名"
					      width="200">
					    </el-table-column>
					    <el-table-column
					      prop="shopAlias"
					      label="别名"
					      min-width="160"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="shopTypeText"
					      label="类型"
					      width="120">
					    </el-table-column>
					     <el-table-column
					      prop="remark"
					      label="描述"
					      >
					    </el-table-column>
					    <el-table-column
					      label="营业时间"
					      width="150">
					       <template slot-scope="scope">
					       		{{scope.row.startBusinessHours}}-{{scope.row.endBusinessHours}}
					       </template>
					    </el-table-column>
					    <el-table-column
					      prop="distributionAmountLimit"
					      label="起送价"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="statusText"
					      label="状态"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="creationTime"
					      label="创建时间"
					      width="160">
					    </el-table-column>
					    <el-table-column
					      fixed="right"
					      label="操作"
					      width="240">
					      <template slot-scope="scope" fixed="right">
					        <el-button
					          @click="editRow(scope.row)"
					          type="text"
					          size="small">
					          编辑
					        </el-button>
					        <el-button
					          @click="setProd(scope.row)"
					          type="text"
					          size="small">
					          设置商品
					        </el-button>
					         <el-button
					          @click="jumpDetail(scope.row)"
					          type="text"
					          size="small">
					          详情
					        </el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog
			  title="编辑店铺"
		  :visible.sync="dialogShop"
		  width="30%"
		  :before-close="handleCloseShop">
		  <el-form :model="shopForm" :rules="rules" ref="shopForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="店铺名称" prop="shopName">
			    <el-input v-model="shopForm.shopName" ></el-input>
			  </el-form-item>
			  <el-form-item label="店铺别名" prop="shopAlias">
			    <el-input v-model="shopForm.shopAlias" ></el-input>
			  </el-form-item>
			  <el-form-item label="营业时间" prop="endBusinessHours">
			    <el-time-picker
				    is-range
				    arrow-control
				    v-model="dateVals"
				    value-format="HH:mm:ss"
				    range-separator="至"
				    start-placeholder="开始时间"
				    end-placeholder="结束时间"
				    placeholder="选择时间范围">
				  </el-time-picker>
			  </el-form-item>
			   <el-form-item label="起送价(元)" prop="distributionAmountLimit">
			    <el-input v-model.number="shopForm.distributionAmountLimit" ></el-input>
			  </el-form-item>
			  <el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model="shopForm.remark"></el-input>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogShop = false">取 消</el-button>
		    <el-button type="primary" @click="confimDialog('shopForm')">确 定</el-button>
		  </span>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
import shopActionFun from '@f/action/shop/shop'
export default{
	data () {
		return {
			shopAction: shopActionFun(this),
			tableData: null,
			total: 0,
			dialogShop: false,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			},
			shopForm: {},
			dateVals: null,
			rules: {
			  shopName: [
			    { required: true, message: '请输入店铺名称', trigger: 'blur' }
			  ],
			  shopAlias: [
			    { required: true, message: '请输入店铺别名', trigger: 'blur' }
			  ],
			  startBusinessHours: [
			    { required: true, message: '请选择营业开始时间', trigger: 'blur' }
			  ],
			  endBusinessHours: [
			    { required: true, message: '请选择营业结束时间', trigger: 'blur' }
			  ],
			  distributionAmountLimit: [
			    { required: true, message: '请输入起送价', trigger: 'blur' },
			    { type: 'integer', message: '请输入正确金额', trigger: 'blur' }
			  ]
			}
		}
	},
	created () {
		this.initShopForm()
		this.shopAction.getShopList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.shopAction.getShopList()
		},
		handleCloseShop () {
			this.dialogShop = false
		},
		editRow (row) {
			this.dialogShop = true
			this.initShopForm(row)
		},
		setProd (row) {
			this.$router.push({
				name: 'filiale.shop.shop.set.goods',
				query: {
					id: row.shopId
				}
			})
		},
		initShopForm (data) {
			this.shopForm = {
				shopId: data ? data.shopId : '',
				shopName: data ? data.shopName : '',
				shopAlias: data ? data.shopAlias : '',
				remark: data ? data.remark : '',
				startBusinessHours: data ? data.startBusinessHours : '',
				endBusinessHours: data ? data.endBusinessHours : '',
				distributionAmountLimit: data ? data.distributionAmountLimit : ''
			}
			if(data) {
				this.dateVals = []
				this.dateVals.push(data.startBusinessHours)
				this.dateVals.push(data.endBusinessHours)
			}
		},
		confimDialog (formName) {
			if(!this.dateVals || this.dateVals.length < 2) {
				this.$message('请选择营业时间')
				return false
			}
			
			var form = this.shopForm;
			form.startBusinessHours = this.dateVals[0]
			form.endBusinessHours = this.dateVals[1]
			this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	 this.shopAction.saveShopInfo()
	          } else {
	            console.log('error submit!!')
	            return false
	          }
	        })
		},
		jumpDetail (row) {
			this.$router.push({
				name: 'filiale.shop.shop.detail',
				query: {
					id: row.shopId
				}
			})
		}
		
	}
}
</script>