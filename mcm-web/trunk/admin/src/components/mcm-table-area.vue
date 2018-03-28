<template>
	<div class="table-area">
		<div class="t-header" v-if="header">
			<slot name="table-header"></slot>
		</div>
		<div class="table-content">
			<slot name="table-con"></slot>
		</div>
		<div class="t-footer" v-if="footer">
			<slot name="table-footer"></slot>
		</div>
	</div>
</template>
<script>
export default{
	data () {
		return {

		}
	},
	props: {
		header: {
			type: Boolean,
			default: false
		},
		footer: {
			type: Boolean,
			default: false
		}
	}
}
</script>
<style lang="less" scoped>
@import "../common/less/config.less";
.table-area{
	padding:0 20px;
	background: @mcm-color-white;
	.t-header,.t-footer{
		padding:12px 0;
	}
}
</style>