<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>营销中心</el-breadcrumb-item>
				<el-breadcrumb-item>优惠券</el-breadcrumb-item>
				<el-breadcrumb-item>派发记录</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<mcm-table-area>
				<div slot="table-con">
					<el-table :data="recordData" style="width: 100%">
						<el-table-column fixed type="index" width="50">
						</el-table-column>
						<el-table-column label="商户名称">
							<template slot-scope="scope">
								{{scope.row.buyer.buyerName}}
							</template>
						</el-table-column>
						<el-table-column prop="buyerId" label="商户编号">
						</el-table-column>
						<el-table-column prop="couponId" label="优惠券编号">
						</el-table-column>
						<el-table-column prop="coupon.title" label="优惠券">
						</el-table-column>
						<el-table-column prop="quantity" label="派发数量">
						</el-table-column>
						<el-table-column prop="sendTime" label="派发时间">
						</el-table-column>
						<el-table-column prop="user.realName" label="派发人">
						</el-table-column>
						<el-table-column prop="sendTime" label="派发时间">
						</el-table-column>
						<!--<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click="detailRow(scope.row)" type="text" size="small">
									详情
								</el-button>
							</template>
						</el-table-column>-->
					</el-table>
				</div>
			</mcm-table-area>
			<mcm-pagination :total="total" @currentChange="currentChange"></mcm-pagination>
		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import couponActionFun from '@f/action/marketing/coupon'
	export default {
		data () {
			return {
				couponAction: couponActionFun(this),
				recordData: null,
				total: 0,
				query: {
					pageNum: 1,
					pageSize: 10
				}
			}
		},
		created () {
			this.couponAction.getPayoutRecord()
		},
		methods: {
			detailRow (row) {

			},
			currentChange (page) {
				this.query.pageNum = page
				this.couponAction.getPayoutRecord();
			}
		}
	}
</script>