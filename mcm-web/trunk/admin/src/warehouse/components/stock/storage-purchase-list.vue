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
		      prop="productCount"
		      label="商品数量"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="productTotalQuantity"
		      label="总供量"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="remark"
		      label="备注"
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
		this.storageAction.getPurchaseList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.storageAction.getPurchaseList()
		},
		selectRow (row) {
			this.$emit('selectPurchase', row)
		}
	}
}
</script>
