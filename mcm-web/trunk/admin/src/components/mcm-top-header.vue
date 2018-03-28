<template>
	<div class="header">
		<div class="logo" v-if="logo && logo.length < 8">{{logo}}</div>
		<div class="logo logo-medium" v-if="logo && logo.length >= 8 && logo.length < 14">{{logo}}</div>
		<div class="logo logo-max" v-if="logo && logo.length >= 14">{{logo}}</div>
		<div class="menu">
			<ul>
				<li class="item" :class="active == index ? 'active' : ''" v-for="(n, index) in nars" :key="index" @click="switchNar(index, n)">{{n.rightName}}</li>
			</ul>
			<div class="user">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				active: -1
			}
		},
		props: {
			nars: {
				type: Array,
				default: null
			},
			logo: {
				type: String,
				default: null
			}
		},
		created () {
		},
		methods: {
			switchNar (index, item) {
				this.active = index
				var menus = item.children
				if(menus && menus[0] && menus[0].children[0]) {
					var mark = menus[0].children[0].mark
					if(mark) {
						this.$router.push({
							name: mark
						})
					}
				}
				this.$emit('jumpRouter', item)
			},
			setDefaultActive (active) {
				this.active = active
			}
		}
	}
</script>
<style lang="less" scoped>
	.header {
		position: relative;
		padding: 0;
		.logo {
			position: absolute;
			width: 200px;
			height: 100%;
			line-height: 70px;
			text-align: center;
			font-size: 24px;
		}
		.logo-medium{
			font-size: 18px;
		}
		.logo-max{
			font-size:14px;
		}
		.menu {
			position: relative;
			height: 100%;
			margin-left: 200px;
			line-height: 70px;
			ul {
				display: flex;
			}
			.item {
				flex-wrap: nowrap;
				padding: 0 30px;
				cursor: pointer;
				font-size: 18px;
			}
			
		}
	}
</style>