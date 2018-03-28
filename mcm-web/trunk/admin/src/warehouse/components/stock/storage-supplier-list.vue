<template>
<div >
	<el-table
	    :data="tableData"
	    style="width: 100%"
	    height="350px"
	    >
	   <el-table-column
	      fixed
	      type="index"
	      width="50">
	    </el-table-column>
	    <el-table-column
	      prop="supplierName"
	      label="供应商名"
	      width="160">
	    </el-table-column>
	    <el-table-column
	      prop="principal"
	      label="联系人"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="principalMobile"
	      label="联系电话"
	      width="120"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="auditStatusText"
	      label="审核状态"
	      width="120"
	      >
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="120">
	      <template slot-scope="scope">
	        <el-button
	          @click="selectRow(scope.row)"
	          type="primary"
	          size="small">
	         	选择
	        </el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
</div>
</template>
<script>
import storageActionFun from '@w/action/stock/storage'
export default{
	data () {
		return {
			storageAction: storageActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: wCommon.config.PAGESIZE
			}
		}
	},
	created () {
		this.storageAction.getSupplierList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.storageAction.getSupplierList()
		},
		selectRow (row) {
			this.$emit('selectSupplier', row)
		}
	}
}
</script>
