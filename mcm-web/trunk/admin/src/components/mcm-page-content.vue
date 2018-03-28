<template>
	<div class="page-content">
		<div class="content" v-if="type === 'form'">
			<div class="form-con">
				<slot></slot>
			</div>
		</div>
		<div class="content" v-else>
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'wrap'
		}
	}
}
</script>
<style lang="less" scoped>
.page-content{
	padding: 12px;
	.content{
		background: #FFF !important;
		padding: 12px;
		.form-con{
			max-width: 620px;
		}
	}
	
}
</style>