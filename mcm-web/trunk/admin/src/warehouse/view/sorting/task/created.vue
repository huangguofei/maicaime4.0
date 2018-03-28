<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>分拣</el-breadcrumb-item>
			  <el-breadcrumb-item>分拣</el-breadcrumb-item>
			  <el-breadcrumb-item>创建分拣任务</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content class="task-created">
			<mcm-page-search>
			    <el-button type="primary" size="small" @click="openDialogSalesProd">从销售商品拉数据</el-button>
			    <el-button type="primary" size="small" @click="openDialogSalesOrder">从销售单拉数据</el-button>
			</mcm-page-search>
					<el-table
				    :data="taskProds"
				    style="width: 100%"
				    >
				    <el-table-column
				      fixed
				      type="index"
				      width="50">
				    </el-table-column>
				    <el-table-column
				      fixed
				      label="销售商品全称"
				      width="150">
				      <template slot-scope="scope">
				      		{{scope.row.sellProduct.productName}}
			      		</template>
				    </el-table-column>
				    <el-table-column
				      label="销售单位"
				      width="120">
				      <template slot-scope="scope">
				      		{{scope.row.sellProduct.sellUnit}}
				      		(={{scope.row.sellProduct.matrixingMultiple}}{{scope.row.skuProduct.skuProductUnitName}})
			      		</template>
				    </el-table-column>
				    <el-table-column
				      label="供应商品名"
				      width="120">
				       <template slot-scope="scope">
				      		{{scope.row.skuProduct.productName}}
			      		</template>
				    </el-table-column>
				    <el-table-column
				      label="结算单位"
				      width="120">
				      <template slot-scope="scope">
				      		{{scope.row.skuProduct.skuProductUnitName}}
			      		</template>
				    </el-table-column>
				    <el-table-column
				      label="下单总量"
				      width="120">
				       <template slot-scope="scope">
				      		{{scope.row.orderQuantity || 0}}
			      		</template>
				    </el-table-column>
				    <el-table-column
				      label="已计划数"
				      width="120">
				       <template slot-scope="scope">
				      		{{scope.row.todayQuantity || 0}}
			      		</template>
				    </el-table-column>
				     <el-table-column
				      label="分拣计划数"
				      width="120">
				       <template slot-scope="scope">
				      		<el-input-number v-model="scope.row.plannedQuantity" controls-position="right" width="120"  :min="0" ></el-input-number>
				      	 </template>
				    </el-table-column>
				     <el-table-column
				      label="供应总存库"
				      width="120">
				       <template slot-scope="scope">
				      		{{scope.row.totalStock || 0}}
			      		</template>
				    </el-table-column>
				     <el-table-column
				      label="预计消耗总库存"
				      width="160">
				       <template slot-scope="scope">
				      		{{(scope.row.totalStock/scope.row.sellProduct.matrixingMultiple) || 0}}
			      		</template>
				    </el-table-column>
				     <el-table-column
				      label="备注"
				      width="120"
				     >
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
				  <el-row class="bottom">
					  <el-col :span="4"><el-input v-model="remark" placeholder="请输入备注"></el-input></el-col>
					  <el-button type="primary" size="small" @click="submitTask">提交分拣任务</el-button>
				  </el-row>
		</mcm-page-content>

		<el-dialog
		  title="销售商品列表"
		  width="1000px"
		  :visible.sync="dialogSalesProd"
		  :before-close="handleSalesProd">
		  <sales-prod-list ref="salesProd" @selectSalesProd="selectSalesProd"></sales-prod-list>
		   <span slot="footer" class="dialog-footer" >
		    <el-button @click="dialogSalesProd = false">取 消</el-button>
		    <el-button type="primary" @click="confimSalesProd">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog
		  title="销售单列表"
		   width="1000px"
		  :visible.sync="dialogSalesOrder"
		  :before-close="handleSalesOrder">
		  <sales-order-list ref="salesOrder" @selectSalesProd="selectSalesProd"></sales-order-list>
		  <span slot="footer" class="dialog-footer" >
		    <el-button @click="dialogSalesOrder = false">取 消</el-button>
		    <el-button type="primary" @click="confimSalesOrder">确 定</el-button>
		  </span>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
import taskActionFun from '@w/action/sorting/task'
import salesProdList from '@w/components/sorting/sales-prod-list'
import salesOrderList from '@w/components/sorting/sales-order-list'
export default{
	data () {
		return {
			taskAction: taskActionFun(this),
			dialogSalesProd: false,
			dialogSalesOrder: false,
			taskProds: [],
			remark: ''
		}
	},
	created () {

	},
	components: {
		'sales-prod-list': salesProdList,
		'sales-order-list': salesOrderList
	},
	methods: {
		handleSalesProd () {
			this.dialogSalesProd = false
		},
		handleSalesOrder () {
			this.dialogSalesOrder = false
		},
		openDialogSalesProd () {
			this.dialogSalesProd = true
			setTimeout(() => {
				this.$refs.salesProd.clearSelectData()
			}, 500)
		},
		openDialogSalesOrder () {
			this.dialogSalesOrder = true
		},
		confimSalesProd () {
			this.$refs.salesProd.returnSelctSalesProd()
		},
		confimSalesOrder () {
			this.$refs.salesOrder.returnSelctSalesOrder()
		},
		selectSalesProd (data, type) {
			if(!data.length) {
				this.$message('还没有添加销售商品')
			} else {
				var sellProductIds = data.toString()
				this.taskAction.getProdsBySellProductIds(sellProductIds, type)
			}
		},
		deleteRow (index) {
			this.taskProds.splice(index, 1)
		},
		submitTask () {
			this.taskAction.saveTask()
		}
	}
}
</script>
<style lang="less">
.task-created{
	.el-input-number{
		width: 110px;
	}
	.bottom{
		margin-top: 10px;
		text-align: right;
	}
}

</style>
