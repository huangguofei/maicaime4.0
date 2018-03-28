<template>
	<div class="page-step">
		<slot></slot>
	</div>
</template>
<style lang="less">
	@import "../common/less/config.less";
	.page-step{
		background: #FFF;
		padding: 10px 0 6px 0;
		.el-steps--simple{
		    background: none;
		    border-top: 1px solid @mcm-border-color-base;
		    padding: 13px 20px !important;
		    .el-step{
		    	flex-basis: 240px !important;
		    }
		}
	}
</style>