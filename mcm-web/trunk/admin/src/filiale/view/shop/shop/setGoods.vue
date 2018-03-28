<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>店铺中心</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-content class="set-goods">
			<header>{{detailInfo.shopName}}<el-button size="small" onclick="history.back(-1)" class="back">返回</el-button></header>
			<div class="set-con clear-float">
				<div class="left set-item">
					<h4>选择销售商品</h4>
					<div class="search">
						<el-input v-model="query.productName" placeholder="商品名称" class="form-ctrl" size="small"></el-input>
						<el-button type="primary" size="small" class="form-btn" @click="searchSalesProd">搜索</el-button>
					</div>
					<div class="prod-wrap">
						<el-table
					      :data="tableData"
					      height="350"
					      style="width: 100%">
					      <el-table-column
					        prop="date"
					        label="商品图"
					        width="80"
					        >
					         <template slot-scope="scope">
						        <img :src="scope.row.mainImage" class="prod-img" />
						      </template>
					      </el-table-column>
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
				</div>
				<div class="center"></div>
				<div class="right set-item">
					<h4>确定销售的商品</h4>
					<div class="search">
						<el-input v-model="selectQuery.sellProductName" placeholder="商品名称" class="form-ctrl" size="small"></el-input>
						<el-button type="primary" size="small" class="form-btn" @click="searchSlectProd">搜索</el-button>
					</div>
					<div class="prod-wrap">
						<el-table
					      :data="selectTableData"
					      height="350"
					      style="width: 100%">
					      <el-table-column
					        prop="date"
					        label="商品图"
					        width="80"
					        >
					         <template slot-scope="scope">
						        <img :src="scope.row.mainImage" class="prod-img" />
						      </template>
					      </el-table-column>
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
			</div>
			<div class="event">
				<el-button type="primary" size="small" class="btn-confim" @click="confimShopProd">完成</el-button>
			</div>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
import shopActionFun from '@f/action/shop/shop'
export default{
	data () {
		return {
			shopAction: shopActionFun(this),
			leftQuery: {
				prodName: ''
			},
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE,
				productName: '',
				customerProfileId: ''
			},
			selectQuery: {
				pageNum: 1,
				pageSize: 10000,
				shopId: this.$route.query.id,
				sellProductName: ''
			},
			total: 0,
			tableData: [],
			selectTableData: [],
			selectQueryData: [],
			detailInfo: {},
			delSelectProds: [],
			selectProds: []
		}
	},
	created () {
		this.shopAction.detailInfo((result) => {
			var customer = result.shopCustomerProfileRelations
			if(customer) {
				this.query.customerProfileId = customer[0].customerProfileId
				this.shopAction.selectSalesProds()
			}
		})
	},
	methods: {
		addSales (row) {
			row.active = true
			this.selectTableData.push(row)
			var sellProductId = row.sellProductId
			if (!row.ssrId) {
				this.selectProds.indexOf(sellProductId) === -1 && this.selectProds.push(sellProductId)
			}
		},
		delRow (row, index) {
			this.selectTableData.splice(index, 1)
			var prodData = this.tableData, sellProductId = row.sellProductId
			for(var p in prodData) {
				var sId = prodData[p].sellProductId
				sId === sellProductId && (prodData[p].active = false)
			}
			var ssrId = row.ssrId
			if(ssrId) {
				this.delSelectProds.indexOf(ssrId) === -1 && this.delSelectProds.push(ssrId)
			} else {
				var selectProds = this.selectProds
				for (var i in selectProds) {
					selectProds[i] === sellProductId && (selectProds.splice(i, 1))
				}
			}
		},
		confimShopProd () {
			var prods = this.selectProds, delProds = this.delSelectProds
			if(prods.length || delProds.length) {
				this.shopAction.saveShopProds(prods.toString(), this.delSelectProds.toString())
			} else {
				this.$message('还没有操作销售商品')
			}
		},
		searchSlectProd () {
			this.selectQuery.pageNum = 1
			this.shopAction.selectQueryProds()
		},
		searchSalesProd () {
			this.query.pageNum = 1
			this.shopAction.getSalesList()
		},
		currentChange (page) {
			this.query.pageNum = page
			this.shopAction.getSalesList()
		}
	}
}
</script>
<style lang="less" scoped>
	@import "../../../public/less/config.less";
	.set-goods{
		padding: 20px;
		header{
			font-size: 20px;
			color: @mcm-color-text-primary;
			border-bottom:1px solid @mcm-border-color-base;
			padding: 0px 0 10px 0;
		}
		.set-con{
			padding: 20px;
		}
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
		}
		.center{
			height:420px; 
			width: 80px;
			float:left;
		}
		.search{
			height: 45px;
			.form-ctrl{
				float: left;
				width: 140px;
				margin-right: 20px;
				margin-top: 10px;
			}
			.form-btn{
				margin-top: 10px;
				float:right;
			}
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