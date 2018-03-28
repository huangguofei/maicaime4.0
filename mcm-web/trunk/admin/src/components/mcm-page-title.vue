<template>
	<div class="page-title">
		<slot></slot>
	</div>
</template>
<style lang="less" scoped>
@import "../common/less/config.less";
.page-title{
	padding: 20px;
	background: @mcm-color-white;
	color: @mcm-color-text-primary;
	font-size: 18px;
}
</style>