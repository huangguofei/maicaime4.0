<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>系统设置</el-breadcrumb-item>
			  <el-breadcrumb-item>帐户权限</el-breadcrumb-item>
			  <el-breadcrumb-item>角色管理</el-breadcrumb-item>
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
					      prop="roleName"
					      label="角色名"
					      width="220">
					    </el-table-column>
					    <el-table-column
					      prop="statusText"
					      label="状态"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="creationTime"
					      label="创建时间"
					      >
					    </el-table-column>
					  </el-table>
				</div>

			</mcm-table-area>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import roleActionFun from '@w/action/set/role'
export default{
	data () {
		return {
			roleAction: roleActionFun(this),
			tableData: null
		}
	},
	created () {
		this.roleAction.getRoleList()
	},
	methods: {
		
	}
}
</script>