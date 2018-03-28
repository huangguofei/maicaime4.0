<template>
	<div class="mcm-pagination">
		<slot name="left"></slot>
		<el-pagination
		    layout="prev, pager, next"
		    :page-size="pageSize"
		    :total="total"
		    @current-change="currentChange">
		</el-pagination>
		<slot name="right"></slot>
	</div>
</template>
<script>
export default {
	props: {
		total: {
			type: Number,
			default: 0
		},
		pageSize: {
			type: Number,
			default: 20
		}
	},
	methods: {
		currentChange (page) {
			this.$emit('currentChange', page)
		}
	}
}
</script>
<style lang="less" scoped>
.mcm-pagination{
	background: #FFF;
	padding: 12px 0;
	text-align:center;
}
</style>