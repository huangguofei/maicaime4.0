<template>
<div class="sales-prod-list clear-float">
	<div class="search">
		今天:
		 <el-time-picker
		 	class="form-date" size="small"
		    is-range
		    arrow-control
		    v-model="dateVals"
		    value-format="HH:mm:ss"
		    range-separator="至"
		    start-placeholder="开始时间"
		    end-placeholder="结束时间"
		    placeholder="选择时间范围">
		  </el-time-picker>
		<el-button type="primary" size="small" class="form-btn" @click="searchSalesOrder">搜索</el-button>
	</div>
	<div class="left set-item">
		<h4>选择销售商品</h4>
		<el-table
		    :data="tableData"
		    style="width: 100%"
		    height="400"
		    >
		    <el-table-column
		      label="商品名称"
		      width="240">
		       <template slot-scope="scope">
		       	<p>{{scope.row.productName}}{{scope.row.specName?'('+scope.row.specName+')':''}}</p>
		       	 </template>
		    </el-table-column>
		    <el-table-column
		      prop="settleUnit"
		      label="单位"
		      >
		    </el-table-column>
		     <el-table-column
		         fixed="right"
		         width="70"
		          label="操作"
		        >
		        <template slot-scope="scope">
			        <el-button
			          v-if="!scope.row.active"
			          @click="addSales(scope.row)"
			          type="primary"
			          size="mini">
			          添加
			        </el-button>
			        <span v-else>已选择</span>
		      </template>
		      </el-table-column>
	  </el-table>
	  <mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
	</div>
	 <div class="center"></div>
	<div class="right set-item">
		<h4>确定销售的商品</h4>
			<el-table
		      :data="selectTableData"
		      height="400"
		      style="width: 100%">
		      <el-table-column
		        prop="productName"
		        label="商品名"
		        >
		      </el-table-column>
		      <el-table-column
		        prop="sellUnit"
		        label="单位"
		       >
		      </el-table-column>
		      <el-table-column
		        prop="address"
		         fixed="right"
		         label="操作"
		         width="70"
		        >
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
import taskActionFun from '@w/action/sorting/task'
export default{
	data () {
		return {
			taskAction: taskActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: wCommon.config.PAGESIZE
			},
			selectTableData: [],
			dateVals: ['00:00:00', '23:59:59']
		}
	},
	props: {
		supplierId: {
			type: String,
			default: null
		}
	},
	created () {
		this.taskAction.getSalesOrderProd()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.taskAction.getSalesOrderProd()
		},
		addSales (row) {
			row.active = true
			this.selectTableData.push(row)
		},
		delRow (row, index) {
			this.selectTableData.splice(index, 1)
			var prodData = this.tableData, sellProductId = row.sellProductId
			for(var p in prodData) {
				var sId = prodData[p].sellProductId
				sId === sellProductId && (prodData[p].active = false)
			}
		},
		returnSelctSalesOrder () {
			var sellProductIds = [], data = this.selectTableData
			for(var i in data) {
				sellProductIds[i] = data[i].sellProductId
			}
			this.$emit('selectSalesProd', sellProductIds, 'order')
		},
		clearSelectData () {
			this.selectTableData = []
			var resultList = this.tableData
			for (var i in resultList) {
 				var item = resultList[i]
 				item.active = false
 			}
		},
		searchSalesOrder () {
			this.taskAction.getSalesOrderProd()
		}
	}
}
</script>
<style lang="less" scoped>
	@import "../../public/less/config.less";
	.sales-prod-list{
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
		.search{
			height: 45px;
			width: 480px;
			.form-data{
				width: 200px;
				margin-right: 20px;
			}
			.form-btn{
				float:right;
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
