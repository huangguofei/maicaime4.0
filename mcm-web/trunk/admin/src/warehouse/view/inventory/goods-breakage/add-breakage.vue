<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>库存</el-breadcrumb-item>
			  <el-breadcrumb-item>商品报损</el-breadcrumb-item>
			  <el-breadcrumb-item>录入报损</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		
		<mcm-page-content class="stock-storage">
			<mcm-page-search>
				    <el-form :inline="true" :model="cForm" class="demo-form-inline" size="small">
					  <el-form-item label="供应商：" size="small">
					  		 <label>{{cForm.supplierName}}</label>
					    	 <el-button type="primary" @click="selectSupplierDiaLog" size="small">{{cForm.supplierId ? '重新选择供应商' : '选择供应商'}}</el-button>
					  </el-form-item>
					  <el-form-item size="small" style="float: right">
					    <el-button type="primary"  size="small" @click="selectProdDiaLog">添加报损商品</el-button>
					  </el-form-item>
					</el-form>
			</mcm-page-search>
			<mcm-table-area>
				<div slot="table-con">
					<el-table
					    :data="recordData"
					    style="width: 100%"
					    >
					    <el-table-column
					      fixed
					      type="index"
					      width="50">
					    </el-table-column>
					    <el-table-column
					      prop="productName"
					      label="商品名称"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="skuProductUnitName"
					      label="单位"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="usableStock"
					      label="可用库存"
					      width="120">
					    </el-table-column>
					     <el-table-column
					      label="报损数量"
					      width="200">
					     	 <template slot-scope="scope">
					      		<el-input-number v-model="scope.row.breakageQuantity" controls-position="right" width="120"   :min="0" :max="scope.row.usableStock"></el-input-number>
					      	 </template>
					    </el-table-column>
					     <el-table-column
					      label="备注"
					      width="240">
					       <template slot-scope="scope">
					      		<el-input v-model="scope.row.remark" placeholder="请输入备注"></el-input>
					      	 </template>
					    </el-table-column>
					    <el-table-column
					      fixed="right"
					      label="操作"
					      width="120">
					      <template slot-scope="scope">
					        <el-button
					          @click="deleteRow(scope.$index)"
					          type="text"
					          size="small">
					          移除
					        </el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>

			</mcm-table-area>
			<el-row class="bottom">
			  <el-col :span="4"><el-input v-model="cForm.remark" placeholder="请输入备注"></el-input></el-col>
			  <el-col :span="6" class="event"><el-button type="primary" size="small" @click="createStorage">录入报损</el-button></el-col>
			</el-row>
		</mcm-page-content>
		<el-dialog
		  title="供应商列表"
		  :visible.sync="dialogSupplier"
		  width="600px"
		  :before-close="handleSupplier">
			<storage-supplier-list @selectSupplier="selectSupplier"></storage-supplier-list>
		</el-dialog>
		<el-dialog
		  title="供应商品列表"
		  :visible.sync="dialogSupplerProd"
		  width="1000px"
		  :before-close="handleSupplerProd">
				<storage-prod-list ref="supplierProds" @selectProd="selectProd" :supplierId="cForm.supplierId" @selectSupplierProd="selectSupplierProd"></storage-prod-list>
				<span slot="footer" class="dialog-footer" >
				    <el-button @click="dialogSupplerProd = false">取 消</el-button>
				    <el-button type="primary" @click="confimSupplierProd" :loading="submitLoading">确 定</el-button>
				  </span>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
import breakageActionFun from '@w/action/inventory/breakage'
import storageSupplierList from '@w/components/stock/storage-supplier-list'
import storageProdList from '@w/components/stock/storage-prod-list'
export default{
	data () {
		return {
			breakageAction: breakageActionFun(this),
			dialogSupplier: false,
			dialogPurchase: false,
			dialogSupplerProd: false,
			cForm: {
				supplierId: '',
				supplierName: '',
				purchaseOrderId: '',
				creationTime: '',
				remark: ''
			},
			supllierList: [],
			sTotal: 0,
			purchaseList: [],
			pTotal: 0,
			recordData: [],
			remark: '',
			submitLoading: false
		}
	},
	created () {

	},
	components: {
		'storage-supplier-list': storageSupplierList,
		'storage-prod-list': storageProdList
	},
	methods: {
		currentChangeSuppler (page) {
			this.query.pageNum = page
			this.storageAction.getSupplierList()
		},
		detailRow (row) {
			this.detailShow = true
			this.selectRow = row
		},
		handleSupplier () {
			this.dialogSupplier = false
		},
		handleSupplerProd () {
			this.dialogSupplerProd = false
		},
		selectSupplierDiaLog () {
			this.dialogSupplier = true
		},
		selectProdDiaLog () {
			if(this.cForm.supplierId) {
				this.dialogSupplerProd = true
			} else {
				this.$message('请选择供应商')
			}
		},
		selectSupplier (row) {
			var form = this.cForm
			form.supplierId = row.supplierId
			form.supplierName = row.supplierName
			this.dialogSupplier = false
		},
		selectProd (row) {
			this.recordData.push({
				skuProductId: row.skuProductId,
				productName: row.productName,
				skuProductUnitName: row.skuProductUnitName,
				usableStock: row.usableStock,
				breakageQuantity: 0,
				remark: ''
			})
		},
		createStorage () {
			this.breakageAction.addBreakage()
		},
		confimSupplierProd () {
			this.submitLoading = true
			this.recordData = []
			var that = this
			setTimeout(() => {
				that.$refs.supplierProds.returnSupplierProds()
			}, 100)
		},
		selectSupplierProd (prodList) {
			if(!prodList) return false
			var prodIds = [], that = this
			for(var p in prodList) {
				prodIds.push(prodList[p].skuProductId)
			}
			this.breakageAction.getInventoryByProdIds(prodIds.toString(), (result) => {
				for(var i in prodList) {
					var prod = prodList[i], count = 0
					var skuProductId = prod.skuProductId
					for (var n in result) {
						var item = result[n]
						if(item.skuProductId === skuProductId) {
							prod.usableStock = item.totalStock - item.lockStock
							++count
						}
					}
					if(!count) {
						prod.usableStock = 0
					}
					that.selectProd(prod);
				}
				that.submitLoading = false
				that.handleSupplerProd()
			})
		},
		deleteRow (index) {
			this.recordData.splice(index, 1)
		}
	}
}
</script>
<style lang="less" scoped>
.stock-storage{
	.bottom{
		margin-top: 20px;
	}
	.event{
		float: right;
		text-align: right;
	}
}
</style>
