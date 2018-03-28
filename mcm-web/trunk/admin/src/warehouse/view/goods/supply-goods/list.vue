<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>商品</el-breadcrumb-item>
				<el-breadcrumb-item>供应商品</el-breadcrumb-item>
				<el-breadcrumb-item>商品列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-tab :tabs="tabs"></mcm-page-tab>
		<mcm-page-search>搜索区域</mcm-page-search>
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column prop="productName" label="商品名" width="120">
						</el-table-column>
						<el-table-column prop="skuProductUnitName" label="单位" width="120">
						</el-table-column>
						<el-table-column prop="productAlias" label="别名" width="120">
						</el-table-column>
						<el-table-column prop="mainImage" label="主图">
							<template slot-scope="scope">
								<img :src="scope.row.mainImage">
							</template>
						</el-table-column>
						<el-table-column prop="expirationDate" label="保质期">
						</el-table-column>
						<el-table-column prop="skuProductStatusText" label="状态">
						</el-table-column>
						<el-table-column prop="creationTime" label="创建时间">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click="detailRow(scope.row)" type="text" size="small">
									详情
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
		<el-dialog title="商品详情" :visible.sync="detailShow" width="50%" class="dialog-detail">
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">商品名：</span><span class="val">{{selectRow.productName}}</span></el-col>
				<el-col :span="6"><span class="name">别名：</span><span class="val">{{selectRow.productAlias}}</span></el-col>
				<el-col :span="6"><span class="name">单位：</span><span class="val">{{selectRow.skuProductUnitName}}</span></el-col>
				<el-col :span="6"><span class="name">保质期：</span><span class="val">{{selectRow.expirationDate}}</span></el-col>
			</el-row>
			<el-row :gutter="20" class="item">
				<el-col :span="6"><span class="name">商品状态：</span><span class="val">{{selectRow.skuProductStatusText}}</span></el-col>
				<el-col :span="6"><span class="name">创建时间：</span><span class="val">{{selectRow.creationTime}}</span></el-col>
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
	import supplierGoodsAction from '@w/action/goods/supplygoods'
	export default {
		data () {
			return {
				tabs: [],
				tableData: [],
				total: 0,
				supplierGoodsAction: supplierGoodsAction(this),
				detailShow: false,
				selectRow: {},
				query: {
					pageNum: 1,
					pageSize: 20,
					sellProductId: '',
					companyId: '',
					productFirstCategoryId: '',
					productSecondCategoryId: '',
					productThirdCategoryId: '',
					parentId: '',
					isListFirstTier: '',
					skuProductId: '',
					sellProductType: '',
					productName: '',
					productAlias: '',
					specName: '',
					sellUnit: '',
					sellProductStatus: '',
					newestSellPriceStatus: '',
					isExistSellPrice: ''
				}
			}
		},
		created () {
			this.initPage();
		},
		methods: {
			initPage () {
				this.loadList();
			},
			loadList () {
				this.supplierGoodsAction.getGoodsList();
			},
			currentChange () {
				this.query.pageNum = page
				this.initPage();
			},
			detailRow (row) {
				this.detailShow = true
				this.selectRow = row
				try {
					var imgs = JSON.parse(row.minorImage)
					this.selectRow.minorImages = imgs
				} catch(e) {}
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