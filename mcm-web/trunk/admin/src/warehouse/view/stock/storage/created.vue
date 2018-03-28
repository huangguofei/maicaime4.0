<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>入库单</el-breadcrumb-item>
			  <el-breadcrumb-item>入库列表</el-breadcrumb-item>
			  <el-breadcrumb-item>创建入库单</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		
		<mcm-page-content class="stock-storage">
			<mcm-page-search>
				    <el-form :inline="true" :model="cForm" class="demo-form-inline" size="small">
					  <el-form-item label="供应商：" size="small">
					  		 <label>{{cForm.supplierName}}</label>
					    	 <el-button type="primary" @click="selectSupplierDiaLog" size="small">{{cForm.supplierId ? '重新选择供应商' : '选择供应商'}}</el-button>
					  </el-form-item>
					   <el-form-item label="采购单：" size="small">
					  		 <label v-if="cForm.purchaseOrderId">{{cForm.purchaseOrderId}}({{cForm.creationTime}})</label>
					    	 <el-button type="primary" @click="selectPurchaseDiaLog" size="small">{{cForm.purchaseOrderId ? '重新选择采购单' : '选择采购单'}}</el-button>
					  </el-form-item>
					  <el-form-item size="small" style="float: right">
					    <el-button type="primary"  size="small" @click="selectProdDiaLog">添加商品</el-button>
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
					      label="数量"
					      width="200">
					     	 <template slot-scope="scope">
					      		<el-input-number v-model="scope.row.stockInQuantity" controls-position="right"  :min="0" ></el-input-number>
					      	 </template>
					    </el-table-column>
					     <el-table-column
					      label="备注"
					      width="240">
					       <template slot-scope="scope">
					      		<el-input v-model="scope.row.remark" placeholder="请输入备注"></el-input>
					      	 </template>
					    </el-table-column>
					  </el-table>
				</div>

			</mcm-table-area>
			<el-row class="bottom">
			  <el-col :span="4"><el-input v-model="remark" placeholder="请输入备注"></el-input></el-col>
			  <el-col :span="6" class="event"><el-button type="primary" size="small" @click="createStorage">创建入库单</el-button></el-col>
			</el-row>
		</mcm-page-content>
		<el-dialog
		  title="供应商列表"
		  :visible.sync="dialogSupplier"
		  width="40%"
		  :before-close="handleSupplier">
			<storage-supplier-list @selectSupplier="selectSupplier"></storage-supplier-list>
		</el-dialog>

		<el-dialog
		  title="采购单列表"
		  :visible.sync="dialogPurchase"
		  width="40%"
		  :before-close="handlePurchase">
				<storage-purchase-list @selectPurchase="selectPurchase"></storage-purchase-list>
		</el-dialog>

		<el-dialog
		  title="供应商品列表"
		  :visible.sync="dialogSupplerProd"
		  width="1000px"
		  :before-close="handleSupplerProd">
				<storage-prod-list  ref="supplierProds" @selectProd="selectProd" :supplierId="cForm.supplierId" @selectSupplierProd="selectSupplierProd"></storage-prod-list>
				<span slot="footer" class="dialog-footer" >
				    <el-button @click="dialogSupplerProd = false">取 消</el-button>
				    <el-button type="primary" @click="confimSupplierProd">确 定</el-button>
				  </span>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
import storageActionFun from '@w/action/stock/storage'
import storageSupplierList from '@w/components/stock/storage-supplier-list'
import storagePurchaseList from '@w/components/stock/storage-purchase-list'
import storageProdList from '@w/components/stock/storage-prod-list'
export default{
	data () {
		return {
			storageAction: storageActionFun(this),
			dialogSupplier: false,
			dialogPurchase: false,
			dialogSupplerProd: false,
			cForm: {
				supplierId: '',
				supplierName: '',
				purchaseOrderId: '',
				creationTime: ''
			},
			supllierList: [],
			sTotal: 0,
			purchaseList: [],
			pTotal: 0,
			recordData: [],
			remark: ''
		}
	},
	created () {

	},
	components: {
		'storage-supplier-list': storageSupplierList,
		'storage-purchase-list': storagePurchaseList,
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
		handlePurchase () {
			this.dialogPurchase = false
		},
		handleSupplerProd () {
			this.dialogSupplerProd = false
		},
		selectSupplierDiaLog () {
			this.dialogSupplier = true
		},
		selectPurchaseDiaLog () {
			this.dialogPurchase = true
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
		selectPurchase (row) {
			var form = this.cForm
			form.purchaseOrderId = row.purchaseOrderId
			form.creationTime = row.creationTime
			this.dialogPurchase = false
		},
		selectProd (row) {
			this.recordData.push({
				skuProductId: row.skuProductId,
				productName: row.productName,
				skuProductUnitName: row.skuProductUnitName,
				stockInQuantity: 0,
				remark: ''
			})
		},
		createStorage () {
			this.storageAction.saveStorageInfo()
		},
		confimSupplierProd () {
			this.$refs.supplierProds.returnSupplierProds()
		},
		selectSupplierProd (prodList) {
			if(!prodList) return false
			for(var p in prodList) {
				var prod = prodList[p]
				this.selectProd(prod)
			}
			this.handleSupplerProd()
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
