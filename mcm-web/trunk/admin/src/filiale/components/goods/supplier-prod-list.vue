<template>
<div >
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
	      prop="mainImage"
	      label="商品图"
	      >
	       <template slot-scope="scope">
	        <img :src="scope.row.mainImage">
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="productName"
	      label="商品名"
	      width="240">
	    </el-table-column>
	    <el-table-column
	      prop="skuProductUnitName"
	      label="单位"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="productAlias"
	      label="别名"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="skuProductStatusText"
	      label="状态"
	      >
	    </el-table-column>
	     <el-table-column
	      fixed="right"
	      label="操作"
	      width="120">
	      <template slot-scope="scope">
	        <el-button
	          type="primary"
	          @click="editRow(scope.row)"
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
import supplierActionFun from '@f/action/goods/supplier'
export default{
	data () {
		return {
			supplierAction: supplierActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			},
			detailShow: false,
			selectRow: {}
		}
	},
	created () {
		this.supplierAction.getSupplierList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.supplierAction.getSupplierList()
		},
		detailRow (row) {
			this.detailShow = true
			this.selectRow = row
			var imgs = row.minorImage.split(',')
			this.selectRow.minorImages = imgs
		},
		editRow (row) {
			this.$emit('selectSkuProd', row);
		}
	}
}
</script>
