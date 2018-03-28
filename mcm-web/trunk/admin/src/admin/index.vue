<template>
<el-container class="main-page">
	<el-header class="header" height="70px">
		<mcm-top-header :nars="nars" :logo="logo"></mcm-top-header>
	</el-header>
	<router-view/>
	<!-- <el-container>
		<el-aside width="200px" class="left">Aside</el-aside>
		<el-main>Main</el-main>
	</el-container> -->
</el-container>
</template>
<script>
import mcmTopHeader from '@cp/mcm-top-header'
export default {
  data () {
    return {
    	active: 0,
      logo: '总部系统',
    	nars: [
    		{
    			name: '商品中心',
    			router: 'admin.goods.sales.list'
    		},
    		{
    			name: '分公司',
    			router: ''
    		},
    		{
    			name: '营销中心',
    			router: ''
    		},
    		{
    			name: '报表中心',
    			router: ''
    		},
    		{
    			name: '客户中心',
    			router: ''
    		},
    		{
    			name: '财务中心',
    			router: ''
    		},
    		{
    			name: '系统设置',
    			router: ''
    		}
    	]
    }
  },
  components: {
  	mcmTopHeader
  },
  methods: {
  	switchNar (index) {
  		this.active = index
  	}
  }
}
</script>
<style lang="less">
	@import "./public/less/config.less";
	.main-page{
		height: 100%;
		background: @mcm-background-color-base;
		.header{
			background: @mcm-color-primary;
			color: @mcm-color-white;
			padding:0;
			.menu{
				.active{
					background: @mcm-menu-back-active;
				}
			}
		}
		.left{
			background: @mcm-color-white;
		}
	}
</style>