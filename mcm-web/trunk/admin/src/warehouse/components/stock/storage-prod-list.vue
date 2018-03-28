<template>
<div class="supplier-prod-list clear-float">
	<div class="left set-item">
		<h4>选择供应商品</h4>
		<el-table
		    :data="tableData"
		    style="width: 100%"
		    height="400px"
		    >
		    <el-table-column
			      fixed
			      type="index"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="mainImage"
			      label="商品图片"
			      width="100"
			      >
			       <template slot-scope="scope">
			        <img :src="scope.row.mainImage">
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="productName"
			      label="商品名称"
			      width="240">
			    </el-table-column>
			    <el-table-column
			      prop="skuProductUnitName"
			      label="单位"
			      >
			    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="120">
		      <template slot-scope="scope">
		        <el-button
		         v-if="!scope.row.active"
		          @click="selectRow(scope.row)"
		          type="primary"
		          size="small">
		         	选择
		        </el-button>
		        <span v-else>已选择</span>
		      </template>
		    </el-table-column>
		  </el-table>
		  <mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
	</div>
	 <div class="center"></div>
	<div class="left set-item">
		<h4>已选择的供应商品</h4>
		<el-table
		    :data="selectTableData"
		    style="width: 100%"
		    height="400px"
		    >
		    <el-table-column
			      fixed
			      type="index"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="mainImage"
			      label="商品图片"
			      width="100"
			      >
			       <template slot-scope="scope">
			        <img :src="scope.row.mainImage">
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="productName"
			      label="商品名称"
			      width="240">
			    </el-table-column>
			    <el-table-column
			      prop="skuProductUnitName"
			      label="单位"
			      >
			    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="120">
		      <template slot-scope="scope">
		        <el-button
			          @click="delRow(scope.row, scope.$index)"
			          type="danger"
			          size="mini">
			          移除
			        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
	</div>
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
				pageSize: wCommon.config.PAGESIZE,
				supplierId: this.supplierId
			},
			selectTableData: []
		}
	},
	props: {
		supplierId: {
			type: String,
			default: null
		}
	},
	created () {
		this.storageAction.getSupplierProdList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.storageAction.getSupplierProdList()
		},
		selectRow (row) {
			row.active = true
			this.selectTableData.push(row)
		},
		delRow (row, index) {
			this.selectTableData.splice(index, 1)
			var prodData = this.tableData, skuProductId = row.skuProductId
			for(var p in prodData) {
				var sId = prodData[p].skuProductId
				sId === skuProductId && (prodData[p].active = false)
			}
		},
		returnSupplierProds () {
			if(this.selectTableData.length > 0) {
				this.$emit('selectSupplierProd', this.selectTableData)
			} else {
				this.$message('还没有选择商品')
			}
		}
	}
}
</script>
<style lang="less" scoped>
	@import "../../public/less/config.less";
	.supplier-prod-list{
		.set-item {
			width:400px;
			height:420px; 
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.07);
			border-radius: 4px ;
			float:left;
			padding: 12px;
			h4{
				text-align:center;
				border-bottom: 1px solid @mcm-border-color-base;
				padding-bottom: 12px;
				font-size: 16px;
				color:@mcm-color-text-primary;
			}
			img{
				width:30px;
				height: 30px;
			}
		}
		.center{
			height:420px; 
			width: 60px;
			float:left;
		}
		.event{
			.btn-confim{
				margin-left: 425px;
				padding: 8px 45px;
			}
		}
		.prod-img{
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
		.back{
			float: right;
		}
	}

</style>
