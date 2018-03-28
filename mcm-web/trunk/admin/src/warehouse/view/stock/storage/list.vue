<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>商品中心</el-breadcrumb-item>
			  <el-breadcrumb-item>入库单</el-breadcrumb-item>
			  <el-breadcrumb-item>入库列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<mcm-page-search>
			    <el-button type="primary" @click="createdStorage" size="small">创建入库单</el-button>
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
					      prop="productCount"
					      label="商品数量"
					      width="220">
					    </el-table-column>
					    <el-table-column
					      prop="productTotalQuantity"
					      label="总供量"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="remark"
					      label="备注"
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
					      </template>
					    </el-table-column>
					  </el-table>
				</div>

			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
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
				pageSize: wCommon.config.PAGESIZE
			}
		}
	},
	created () {
		this.storageAction.getStorageList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.storageAction.getStorageList()
		},
		detailRow (row) {
			this.$router.push({
				name: 'warehouse.stock.storage.detail',
				query: {
					id: row.stockInId
				}
			})
		},
		createdStorage () {
			this.$router.push({
				name: 'warehouse.stock.storage.created'
			})
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
			img{
				max-width: 100%;
			}
		}
	}
</style>