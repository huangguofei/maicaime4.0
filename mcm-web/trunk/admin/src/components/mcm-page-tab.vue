<template>
	<el-tabs v-model="activeName" class="page-tab" @tab-click="handleClick">
		<el-tab-pane :label="t.name" :name="'tab' + index" :key="index" v-for="(t, index) in tabs"></el-tab-pane>
	</el-tabs>
</template>
<script>
	export default {
		data () {
			return {
				activeName: 'tab0'
			}
		},
		props: {
			tabs: {
				type: Array,
				default: null
			}
		},
		created: function () {
			var _that = this;
			if(this.tabs.length > 1) {
				this.tabs.forEach((v, k) => {
					if(v.active) {
						_that.activeName = 'tab' + k;
					}
				})
			}
		},
		methods: {
			handleClick (tab, event) {
				this.$router.push({
					name: this.tabs[tab.index].router
				});
			}
		}
	}
</script>
<style lang="less">
	@import "../common/less/config.less";
	.page-tab {
		background: #FFF;
		padding: 0px 20px;
		.el-tabs__item {
			font-size: 16px;
		}
		.el-tabs__header {
			margin-bottom: 5px;
		}
	}
</style>