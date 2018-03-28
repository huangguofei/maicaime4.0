<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>系统设置</el-breadcrumb-item>
			  <el-breadcrumb-item>帐户权限</el-breadcrumb-item>
			  <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
		    <el-button type="primary" @click="addAccount" size="small" style="float:right;">添加帐号</el-button>
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
					      label="姓名"
					      width="100">
					      	<template slot-scope="scope">
						       {{scope.row.user.realName}}
						      </template>
						</el-table-column>
						<el-table-column
						      label="昵称"
						    >
					       <template slot-scope="scope">
						       {{scope.row.user.nickName}}
						      </template>
					    </el-table-column>
					    <el-table-column
					      label="手机号"
					      width="120">
					       <template slot-scope="scope">
						       {{scope.row.user.mobile}}
						      </template>
					    </el-table-column>
					    <el-table-column
					      label="角色"
					      >
					      	<template slot-scope="scope">
					      		<span class="role-name" :key="index" v-for="(r, index) in scope.row.roles">{{r.roleName}}</span><br/>
						      </template>
					    </el-table-column>
					    <el-table-column
					      label="状态"
					      >
							<template slot-scope="scope">
								<span  v-if="scope.row.statusId === 1">正常</span>
								<span  v-if="scope.row.statusId === 0">禁用</span>
							</template>
					    </el-table-column>
					    <el-table-column
					      prop="remark"
					      label="描述"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="creationTime"
					      label="创建时间"
					      >
					    </el-table-column>
					    <el-table-column
					      fixed="right"
					      label="操作"
					      width="160">
					      <template slot-scope="scope">
					        <el-button
					          @click="editRow(scope.row)"
					          type="text"
					          size="small">
					          编辑角色
					        </el-button>
					         <el-button
					         v-if="scope.row.statusId === 1"
					          @click="upDownRow(scope.row)"
					          type="text"
					          size="small">
					          禁用
					        </el-button>
					         <el-button
					          v-if="scope.row.statusId === 0"
					          @click="upDownRow(scope.row)"
					          type="text"
					          size="small">
					          启用
					        </el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>

		<el-dialog
		  :title="diaAccount.title"
		  :visible.sync="diaAccount.show"
		  width="30%"
		  >
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="姓名" prop="realName">
			    <el-input v-model="ruleForm.realName" placeholder="真实姓名"  auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="昵称" prop="nickName">
			    <el-input v-model="ruleForm.nickName"  placeholder="昵称"  auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="编号">
			    <el-input v-model="ruleForm.userSn" placeholder="可不填"  auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号" prop="mobile">
			    <el-input v-model="ruleForm.mobile" placeholder="登录用户名" maxLength="11"  auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="userPassword">
			    <el-input type="password" v-model="ruleForm.userPassword"  auto-complete="off" placeholder="登录密码"></el-input>
			  </el-form-item>
			  <el-form-item label="角色" prop="roleIds">
				    <el-checkbox-group v-model="ruleForm.roleIds">
				      <el-checkbox :label="r.roleId" name="roleIds" :key="index" v-for="(r, index) in roleList">{{r.roleName}}</el-checkbox>
				    </el-checkbox-group>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="diaAccount.show = false">取 消</el-button>
		    <el-button type="primary" @click="confimDialog('ruleForm')">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog
		  title="编辑角色"
		  :visible.sync="diaRule"
		  width="30%"
		  >
		    <el-checkbox-group v-model="editRole.roleIds">
		      <el-checkbox :label="r.roleId" name="roleIds" :key="index" v-for="(r, index) in roleList">{{r.roleName}}</el-checkbox>
		    </el-checkbox-group>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="diaRule = false">取 消</el-button>
		    <el-button type="primary" @click="confimRule()">确 定</el-button>
		  </span>
		</el-dialog>

	</mcm-page-area>
</template>
<script>
import accountActionFun from '@w/action/set/account'
export default{
	data () {
		return {
			accountAction: accountActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: wCommon.config.PAGESIZE
			},
			diaAccount: {
				show: false,
				title: ''
			},
			diaRule: false,
			ruleForm: {
				roleIds: [],
				userSn: '',
				mobile: '',
				userPassword: '',
				realName: '',
				nickName: ''
	        },
	        roleList: [],
	        editRole: {
	        	userId: '',
	        	roleIds: []
	        },
			rules: {
			  realName: [
			    { required: true, message: '请输入姓名', trigger: 'blur' }
			  ],
			  nickName: [
			    { required: true, message: '请输入昵称', trigger: 'blur' }
			  ],
			  mobile: [
			    {required: true, message: '请输入手机号', trigger: 'blur'},
			    {pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '手机号格式不正确'}
			  ],
			  userPassword: [
			    { required: true, message: '请输入密码', trigger: 'blur' }
			  ],
			  roleIds: [
			    { required: true, message: '请选择角色', trigger: 'blur' }
			  ]
			}
		}
	},
	created () {
		this.accountAction.getAccountList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.salesAction.getSalesList()
		},
		editRow (row) {
			var roles = row.roles, editRole = this.editRole
			editRole.userId = ''
			editRole.roleIds = []
			for (var i in roles) {
				editRole.roleIds.push(roles[i].roleId)
			}
			editRole.userId = row.userId
			!this.roleList.length && this.accountAction.getRoleList()
			this.diaRule = true
		},
		upDownRow (row) {
			var mes = ''
			mes = row.statusId === 1 ? '禁用该帐号' : '启用该帐号'
			this.$confirm('此操作将' + mes + ', 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			 	this.accountAction.shelvesOffTheShelf(row)
			}).catch(() => {
			  	
			})
		},
		addAccount () {
			this.diaAccount.title = '添加帐户'
			this.diaAccount.show = true
			!this.roleList.length && this.accountAction.getRoleList()
		},
		confimDialog (formName) {
			this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	this.accountAction.saveAccount()
	          } else {
	            console.log('error submit!!')
	            return false
	          }
	        })
		},
		resetForm (formName) {
	        this.$refs[formName].resetFields();
	    },
	    confimRule () {
	    	if(this.editRole.roleIds.length) {
	    		this.accountAction.updateRoles()
	    	} else {
	    		this.$message('请选择角色')
	    	}
	    }
	}
}
</script>