<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>销售商品</el-breadcrumb-item>
			  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
				<el-form :inline="true" :model="query" class="demo-form-inline" size="small">
				  <el-form-item label="商品品类" size="small">
				    	 <el-cascader
				    	 	clearable
						    :options="categoryList"
						    v-model="selectedOptions"
						    :props="props"
						    change-on-select
						    @change="categoryChange">
						  </el-cascader>
				  </el-form-item>
				  <el-form-item label="客户群体" size="small">
				  		 <el-select v-model="query.customerProfileId" clearable placeholder="请选择客户群体">
					      <el-option :label="c.profileName" :value="c.customerProfileId" :key="index" v-for="(c, index) in customerList"></el-option>
					    </el-select>
				  </el-form-item>
				  <el-form-item size="small">
				    <el-button type="primary" @click="SearchData" size="small">查询</el-button>
				  </el-form-item>
				</el-form>
		</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
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
					      label="主图"
					      >
					       <template slot-scope="scope">
					        <img :src="scope.row.mainImage">
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="productName"
					      label="商品名"
					      width="220">
					    </el-table-column>
					    <el-table-column
					      prop="sellUnit"
					      label="单位"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="productAlias"
					      label="别名"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="sellPrice"
					      label="销售价"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="newestSellPrice"
					      label="最新报价"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="expirationDate"
					      label="保质期"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="newestSellPriceStatusText"
					      label="最新报价状态"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="sellProductStatusText"
					      label="状态"
					      >
					      <template slot-scope="scope">
					      		<span  v-if="scope.row.sellProductStatusId === 1">上架</span>
					      		<span  v-if="scope.row.sellProductStatusId === 2">下架</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="sellProductTypeText"
					      label="类型"
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
					      width="160">
					      <template slot-scope="scope">
					        <el-button
					          @click="detailRow(scope.row)"
					          type="text"
					          size="small">
					          详情
					        </el-button>
					        <el-button
					          @click="editRow(scope.row)"
					          type="text"
					          size="small">
					          编辑
					        </el-button>
					         <el-button
					         v-if="scope.row.sellProductStatusId === 1"
					          @click="upDownRow(scope.row)"
					          type="text"
					          size="small">
					          下架
					        </el-button>
					         <el-button
					          v-if="scope.row.sellProductStatusId === 2"
					          @click="upDownRow(scope.row)"
					          type="text"
					          size="small">
					          上架
					        </el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>

			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog
		  title="商品详情"
		  :visible.sync="detailShow"
		  width="50%"
		  class="dialog-detail"
		  >
		  <el-row :gutter="20" class="item">
			  <el-col :span="6"><span class="name">商品名：</span><span class="val">{{selectRow.productName}}</span></el-col>
			  <el-col :span="6"><span class="name">别名：</span><span class="val">{{selectRow.productAlias}}</span></el-col>
			  <el-col :span="6"><span class="name">单位：</span><span class="val">{{selectRow.skuProductUnitName}}</span></el-col>
			  <el-col :span="6"><span class="name">保质期：</span><span class="val">{{selectRow.expirationDate}}</span></el-col>
		  </el-row>
		  <el-row :gutter="20" class="item">
			  <el-col :span="6"><span class="name">商品状态：</span><span class="val">{{selectRow.skuProductStatusText}}</span></el-col>
			  <el-col :span="6"><span class="name">存储方式：</span><span class="val">{{selectRow.storageWay}}</span></el-col>
		  </el-row>
		  <el-row :gutter="20" class="item">
			  <el-col :span="12"><span class="name">创建时间：</span><span class="val">{{selectRow.creationTime}}</span></el-col>
		  </el-row>
		   <el-row :gutter="20" class="item">
			  <el-col :span="20"><span class="name">备注：</span><span class="val">{{selectRow.remark}}</span></el-col>
		  </el-row>
		  <el-row :gutter="20" class="item">
		  	<el-col class="name">主图：</el-col>
			  <el-col :span="20"><span class="val img">
			  	<img :src="selectRow.mainImage">
			</span></el-col>
		  </el-row>
		  <el-row :gutter="20" class="item">
		  		<el-col class="name">副图：</el-col>
			  <el-col :span="20">
				  <span class="val img" :key="index" v-for="(img, index) in selectRow.minorImages">
					  	<img :src="img.url">
				  </span>
			</el-col>
		  </el-row>
		</el-dialog>
	</mcm-page-area>
</template>
<script>
import salesActionFun from '@f/action/goods/sales'
export default{
	data () {
		return {
			salesAction: salesActionFun(this),
			tableData: null,
			selectedOptions: [],
			categoryList: [],
			customerList: [],
			total: 0,
			query: {
				pageNum: 1,
				pageSize: fCommon.config.PAGESIZE,
				productFirstCategoryId: '',
				productSecondCategoryId: '',
				productThirdCategoryId: '',
				customerProfileId: ''
			},
			detailShow: false,
			selectRow: {},
			props: {
	        	label: 'categoryName',
	        	value: 'productCategoryId',
	        	children: 'childrenList'
	        }
		}
	},
	created () {
		this.salesAction.getSalesList()
		this.salesAction.getCategoryList()
		this.salesAction.getCustomerList()
	},
	methods: {
		currentChange (page) {
			this.tableData = null;
			this.query.pageNum = page
			this.salesAction.getSalesList()
		},
		detailRow (row) {
			this.detailShow = true
			this.selectRow = row
			try {
				var imgs = JSON.parse(row.minorImage)
				this.selectRow.minorImages = imgs
			} catch (e) {}
		},
		editRow (row) {
			this.$router.push({
				name: 'filiale.goods.sales.add',
				query: {
					id: row.sellProductId
				}
			})
		},
		upDownRow (row) {
			var mes = ''
			mes = row.sellProductStatusId === 1 ? '下架该商品' : '上架该商品'
			this.$confirm('此操作将' + mes + ', 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			 	this.salesAction.shelvesOffTheShelf(row)
			}).catch(() => {
			  	
			})
		},
		categoryChange (value) {
			var form = this.query
			form.productFirstCategoryId = value[0] ? value[0] : ''
			form.productSecondCategoryId = value[1] ? value[1] : ''
			form.productThirdCategoryId = value[2] ? value[2] : ''
		},
		SearchData () {
			this.currentChange(1)
		}
	}
}
</script>
<style lang="less" scoped>
	.dialog-detail{
		.item{
			padding: 10px 0;
		}
		.img{
			display: inline-block;
			width: 120px;
			height: 120px;
			margin-right: 20px;
			border-radius:50%;
			overflow:hidden;
			img{
				width:100%;
				height:100%;
				margin:auto;
			}
		}
	}
</style>