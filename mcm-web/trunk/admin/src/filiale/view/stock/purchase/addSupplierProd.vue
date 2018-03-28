<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>进货</el-breadcrumb-item>
			  <el-breadcrumb-item>进货单</el-breadcrumb-item>
			  <el-breadcrumb-item>采购单</el-breadcrumb-item>
			  <el-breadcrumb-item>创建采购单</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
				<el-button type="primary" size="small" @click="addSupplierProd">添加供货商品需求</el-button>
			   <!--  <el-button type="primary" size="small">从订单拉取需求</el-button> -->
		</mcm-page-search>
		<mcm-page-content class="stock-purchase">
			<mcm-table-area>
				<div slot="table-con">
					<el-table
					    :data="recordSkus"
					    style="width: 100%"
					    >
					   <el-table-column
					      fixed
					      type="index"
					      width="50">
					    </el-table-column>
					    <el-table-column
					      prop="productName"
					      label="商品名"
					      width="160">
					    </el-table-column>
					    <el-table-column
					      prop="skuProductUnitName"
					      label="单位"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="supplierName"
					      label="供应商"
					      width="160">
					    </el-table-column>
					    <el-table-column
					      prop="settlePrice"
					      label="当前供应商报价"
					      width="140">
					    </el-table-column>
					    <el-table-column
					      prop="todayAmount"
					      label="商品总需求量"
					      width="200"
					      >
					    </el-table-column>
					    <el-table-column
					      label="单供应量"
					      width="200"
					      >
					      <template slot-scope="scope">
					      		<el-input-number v-model="scope.row.purchaseQuantity" controls-position="right" width="120"  :min="0" ></el-input-number>
					      </template>
					    </el-table-column>
					     <el-table-column
					      label="备注"
					      min-width="120"
					      >
					      <template slot-scope="scope">
					      		<el-input v-model="scope.row.remark" placeholder="请输入备注"></el-input>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>
				
			</mcm-table-area>
			<el-row class="bottom">
			  <el-col :span="7">
			  		 仓库： <el-select v-model="warehouseId" placeholder="请选择仓库">
					    <el-option
					      v-for="item in warehouseList"
					      :key="item.warehouseId"
					      :label="item.warehouseName"
					      :value="item.warehouseId">
					    </el-option>
					  </el-select>
			  </el-col>
			  <el-col :span="5"><el-input v-model="remark" placeholder="请输入备注"></el-input></el-col>
			  <el-col :span="6" class="event"><el-button type="primary" size="small" @click="createPurchase">创建并发送给供应商</el-button></el-col>
			</el-row>
			<!-- <mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination> -->
		</mcm-page-content>
		<el-dialog
		  title="添加供货商品需求"
		  :visible.sync="dialogSupplier"
		   width="1000px"
		  :before-close="handleSupplier">
		  <div class="prod-info detail-info">
		  	<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">供应商品：</span><el-button type="primary" size="small" @click="selectSkuProd">选择SKU商品</el-button>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">名称：</span><span class="value" v-if="skuInfo">{{skuInfo.productName}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">结算单位：</span><span class="value" v-if="skuInfo">{{skuInfo.skuProductUnitName}}</span>
				</el-col>
			</el-row>
			<el-row class="row-item">
				<el-col :span="12">
					<span class="tit">等级：</span><span class="value" v-if="skuInfo">{{skuInfo.grade}}</span>
				</el-col>
				<el-col :span="12">
					<span class="tit">今天已发出单量：</span><span class="value" v-if="skuInfo">{{skuInfo.todayAmount}}</span>
				</el-col>
			</el-row>

		  </div>
		  <h2 class="h-header" style="padding: 10px 0;">供应商品:</h2>
			 <el-table
			    :data="skuInfo.supplierInfos"
			    width="1000px"
			    height="200px"
			    v-if="skuInfo"
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
			      prop="settlePrice"
			      label="当前报价"
			      width="120">
			      <template slot-scope="scope">
			      		{{!scope.row.settlePrice && scope.row.settlePrice !== 0 ? '无报价' : (scope.row.settlePrice * 1).toFixed(2)}}
		      	  </template>
			    </el-table-column>
			     <el-table-column
			      prop="todayAmount"
			      label="今日已派单量"
			      width="120">
			    </el-table-column>
			     <el-table-column
			      label="要求供货数"
			      width="200">
			     	 <template slot-scope="scope">
			      		<el-input-number v-model="scope.row.purchaseQuantity" controls-position="right"  :min="0" ></el-input-number>
			      	 </template>
			    </el-table-column>
			     <el-table-column
			      label="备注"
			      min-width="120"
			      >
			       <template slot-scope="scope">
			      		<el-input v-model="scope.row.remark" placeholder="请输入备注"></el-input>
			      	 </template>
			    </el-table-column>
			  </el-table>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogSupplier = false">取 消</el-button>
			    <el-button type="primary" @click="recordProdInfo">确 定</el-button>
			  </span>
		</el-dialog>

		<el-dialog
		  title="供货商品列表"
		  :visible.sync="dialogProd"
		  width="60%"
		  :before-close="handleProd">
				<el-table
				    :data="supplierProds"
				    style="width: 100%"
				    height="350px"
				    >
				   <el-table-column
				      fixed
				      type="index"
				      width="50">
				    </el-table-column>
				     <el-table-column
				      prop="mainImage"
				      label="主图"
				      width="80"
				      >
				       <template slot-scope="scope">
				        <img :src="scope.row.mainImage">
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="productName"
				      label="商品名"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="skuProductUnitName"
				      label="单位"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="skuProductStatusText"
				      label="状态"
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
				  <mcm-pagination :total="supplierTotal" @currentChange="currentChangeProd"></mcm-pagination>
		</el-dialog>

	</mcm-page-area>
</template>
<script>
import purchaseActionFun from '@f/action/stock/purchase'
export default{
	data () {
		return {
			purchaseAction: purchaseActionFun(this),
			tableData: null,
			selectedOptions: [],
			categoryList: [],
			total: 0,
			sQuery: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE
			},
			dialogSupplier: false,
			dialogProd: false,
			supplierProds: null,
			supplierTotal: 0,
			skuInfo: null,
			recordSkus: [],
			remark: '',
			warehouseId: '',
			warehouseList: []
		}
	},
	created () {
		this.purchaseAction.getPurchaseList()
		this.purchaseAction.getWarehouse()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.purchaseAction.getPurchaseList()
		},
		addSupplierProd () {
			this.skuInfo = null
			this.dialogSupplier = true
		},
		handleSupplier () {
			this.dialogSupplier = false
		},
		handleProd () {
			this.dialogProd = false
		},
		selectSkuProd () {
			if(!this.supplierProds) {
				this.purchaseAction.getSupplierPordList()
			} 
			this.dialogProd = true
		},
		currentChangeProd (page) {
			this.sQuery.pageNum = page
			this.purchaseAction.getSupplierPordList()
		},
		selectRow (row) {
			var recordSkus = this.recordSkus, count = 0
			if(recordSkus.length) {
				for (var i in recordSkus) {
					if(recordSkus[i].skuProductId === row.skuProductId) {
						++count
					}
				}
			}
			if(count) {
				this.$message('该商品已添加过')
			} else {
				this.purchaseAction.getSupplierSkuProdData(row.skuProductId)
			}
		},
		recordProdInfo () {
			var skuInfo = this.skuInfo
			if (skuInfo) {
				var supplierInfos = skuInfo.supplierInfos, count = 0
				for (var i in supplierInfos) {
					if (supplierInfos[i].purchaseQuantity === 0) {
						++count
					}
				}
				if(count === supplierInfos.length) {
					this.$message('至少要填写一家供应商供货数')
				} else {
					for (var n in supplierInfos) { 
						var item = supplierInfos[n], purchaseQuantity = supplierInfos[n].purchaseQuantity;
						if(purchaseQuantity > 0) {
							this.recordSkus.push({
								supplierId: item.supplierId,
								skuProductId: skuInfo.skuProductId,
								purchaseQuantity: item.purchaseQuantity,
								productName: skuInfo.productName,
								skuProductUnitName: skuInfo.skuProductUnitName,
								settlePrice: item.settlePrice,
								todayAmount: item.todayAmount,
								remark: item.remark,
								supplierName: item.supplierName
							})
						}
					}
					this.dialogSupplier = false
				}
			}
		},
		createPurchase () {
			this.purchaseAction.savePurchaseInfo()
		}
	}
}
</script>
<style lang="less" scoped>
.stock-purchase{
	.bottom{
		margin-top: 20px;
	}
	.event{
		float: right;
		text-align: right;
	}
}
</style>
