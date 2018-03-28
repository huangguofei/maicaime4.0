<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>供应商品</el-breadcrumb-item>
			  <el-breadcrumb-item>商品单位</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
			<el-button type="primary" size="medium" class="pull-right" @click="addUnit">添加</el-button>
		</mcm-page-search>
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
					      prop="skuProductUnitId"
					      label="单位编号"
					      width="300">
					    </el-table-column>
					    <el-table-column
					      prop="unitName"
					      label="单位"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="isWeigh"
					      label="是否称重"
					      width="120">
					       <template slot-scope="scope">
					        <span v-if="scope.row.isWeigh">是</span>
					        <span v-else>否</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="statusText"
					      label="状态"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="unitRemark"
					      label="备注"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="creationTime"
					      label="创建时间"
					      >
					    </el-table-column>
					    <el-table-column
					      fixed="right"
					      label="操作"
					      width="120">
					      <template slot-scope="scope">
					        <el-button
					          @click="editRow(scope.row)"
					          type="text"
					          size="small">
					          编辑
					        </el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog
		  :title="diaUnit.title"
		  :visible.sync="diaUnit.show"
		  width="30%"
		  >
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="单位名称" prop="unitName">
			    <el-input v-model="ruleForm.unitName" :disabled="unitNameDisabled()"></el-input>
			  </el-form-item>
			  <el-form-item label="是否称重" >
				    <el-switch
					  v-model="ruleForm.isWeigh">
					</el-switch>
			  </el-form-item>
			  <el-form-item label="备注" prop="unitRemark">
			    <el-input type="textarea" v-model="ruleForm.unitRemark"></el-input>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="diaUnit.show = false">取 消</el-button>
		    <el-button type="primary" @click="confimDialog('ruleForm')">确 定</el-button>
		  </span>
		</el-dialog>

	</mcm-page-area>
</template>
<script>
import unitActionFun from '@f/action/goods/unit'
export default{
	data () {
		return {
			unitAction: unitActionFun(this),
			tabs: [
				{
					name: '商品列表',
					router: ''
				}
			],
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			},
			diaUnit: {
				show: false,
				title: ''
			},
			ruleForm: {
				unitName: '',
				unitRemark: '',
				isWeigh: 0
	        },
			rules: {
			  unitName: [
			    { required: true, message: '请输入单位名称', trigger: 'blur' }
			  ],
			  unitRemark: [
			    { required: true, message: '请输入备注信息', trigger: 'blur' }
			  ]
			}
		}
	},
	created () {
		this.unitAction.getUnitList()
	},
	methods: {
		addUnit () {
			this.ruleForm.skuProductUnitId && (delete this.ruleForm.skuProductUnitId)
			this.diaUnit.show = true
			this.diaUnit.title = '添加商品单位'
		},
		confimDialog (formName) {
			this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	this.unitAction.saveUnitInfo()
	          } else {
	            console.log('error submit!!')
	            return false
	          }
	        })
		},
		editRow (row) {
			var form = this.ruleForm;
			form.skuProductUnitId = row.skuProductUnitId
			form.unitName = row.unitName
			form.isWeigh = row.isWeigh
			form.unitRemark = row.unitRemark
			this.diaUnit.show = true
			this.diaUnit.title = '修改商品单位'
		},
		currentChange (page) {
			this.query.pageNum = page
			this.unitAction.getUnitList()
		},
		unitNameDisabled () {
			if(this.ruleForm.skuProductUnitId) {
				return true
			} 
			return false
		}
	}
}
</script>