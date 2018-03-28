<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>分拣</el-breadcrumb-item>
			  <el-breadcrumb-item>分拣</el-breadcrumb-item>
			  <el-breadcrumb-item>分拣任务列表</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
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
					      prop="sortingId"
					      label="单据编号"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="productCount"
					      label="销售商品种数"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="productTotalQuantity"
					      label="预计销售商品分拣量"
					      >
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
import predictActionFun from '@w/action/sorting/predict'
export default{
	data () {
		return {
			predictAction: predictActionFun(this),
			tableData: null,
			total: 0,
			query: {
				pageNum: 1,
				pageSize: wCommon.config.PAGESIZE
			}
		}
	},
	created () {
		this.predictAction.getPredictList()
	},
	methods: {
		currentChange (page) {
			this.query.pageNum = page
			this.predictAction.getPredictList()
		},
		detailRow (row) {
			this.$router.push({
				name: 'warehouse.sorting.predict.detail',
				query: {
					id: row.sortingDataId
				}
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