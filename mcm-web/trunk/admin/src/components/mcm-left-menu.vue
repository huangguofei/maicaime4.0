<template>
<el-menu
	:default-active="defaultActive"
	class="el-menu-vertical"
	:unique-opened="true"
	@open="handleOpen"
	@close="handleClose">
	<el-submenu :index="firstIndex(index)" v-for="(m, index) in menus" :key="index">
		<template slot="title">
			<i class="el-icon-location"></i>
			<span class="first">{{m.rightName}}</span>
		</template>
		<el-menu-item-group v-for="(i, key) in m.children" :key="key">
			<el-menu-item :index="lastIndex(index, key)" @click="selectMenu(i)" :disabled="i.mark ? false : true">{{i.rightName}}</el-menu-item>
		</el-menu-item-group>
	</el-submenu>
</el-menu>
</template>
<script>
export default {
	data () {
		return {
			defaultActive: '1-1'
		}
	},
	props: {
		menus: {
			type: Array,
			default: null
		}
	},
	mounted ()  {
		this.selectFirstMenus()
	},
    methods: {
		handleOpen (key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose (key, keyPath) {
			console.log(key, keyPath)
		},
		firstIndex (index) {
			return (index + 1).toString()
		},
		lastIndex (index, key) {
			return (index + 1) + '-' + (key + 1)
		},
		selectMenu (item) {
			item && item.mark && (this.$router.push({
				name: item.mark
			}))
		},
		setDefaultActive (val) {
			if(val) {
				this.defaultActive = val
			} else {
				var routerName = this.$route.name
				var menus = this.menus, count = 0
				for (var i in menus) {
					let tMenu = menus[i].children
					for (var n in tMenu) {
						var three = tMenu[n]
						if(three && three.mark && routerName === three.mark) {
							this.defaultActive = (parseInt(i) + 1) + '-' + (parseInt(n) + 1)
							++count
							break
						}
					}
					if(count) {
						break
					}
				}
			}
		},
		selectFirstMenus () {
			var menus = this.menus
			if(menus && menus[0] && menus[0].children[0]) {
				var mark = menus[0].children[0].mark
				mark && (this.$router.push({
					name: mark
				}))
			}
		}
    }
}
</script>
<style lang="less">
@import "../common/less/config.less";
.el-menu-vertical{
	.first{
		color: @mcm-color-text-placeholder;
		font-size: 16px;
		margin-left: -10px;
	}
	.el-menu-item-group__title{
		padding:0;
	}
	.el-menu-item{
		position: relative;
		font-size: 16px;
		text-indent: 6px;
	}
	.el-menu-item-group{
		.is-active:after{
			position: absolute;
			content: "";
			width: 3px;
			height: 25px;
			left: 0;
			top: 12px;
		}
	}
	.el-submenu{
		border-bottom:1px solid @mcm-border-line-color;
	}
	
}
</style>
