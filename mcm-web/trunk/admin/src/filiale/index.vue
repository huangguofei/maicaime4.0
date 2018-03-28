<template>
	<el-container class="main-page">
		<el-header class="header" height="70px">
			<mcm-top-header 
				ref="mcmTopHeader"
				:nars="userRights" 
				@jumpRouter="jumpRouter" 
				:logo="logo">
				<p class="title" @click="isShow=!isShow">个人中心<i :class="{show:isShow}"></i></p>
				<div class="nav" v-show="isShow">
					<a href="javascript:;" class="user-info" @click="goEditUserInfo">个人资料</a>
					<a href="javascript:;" class="edit-psw" @click="goPsw">修改密码</a>
					<a href="javascript:;" class="logout" @click="logout">注销</a>
				</div>
			</mcm-top-header>
		</el-header>
		<!-- <router-view/> -->
		<el-container>
			<el-aside width="200px" class="left" v-show="menus.length">
				<mcm-left-menu ref="mcmLeftMenu" :menus="menus"></mcm-left-menu>
			</el-aside>
			<el-main class="main-area">
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
	import mcmTopHeader from '@cp/mcm-top-header'
	import loginActionFun from '@f/action/login/login'
	import mcmLeftMenu from '@cp/mcm-left-menu'
	export default {
		data () {
			return {
				active: 0,
				logo: '分公司系统',
				isShow: false,
				loginAction: loginActionFun(this),
				nars: [{
						name: '商品中心',
						router: 'filiale.goods.supplier.list'
					},
					{
						name: '客户中心',
						router: 'filiale.customer.purchaser.list'
					},
					{
						name: '订单中心',
						router: 'filiale.order.sales.list'
					},
					{
						name: '营销中心',
						router: 'filiale.marketing.coupon.list'
					},
					{
						name: '店铺中心',
						router: 'filiale.shop.shop.list'
					},
					{
						name: '进货',
						router: 'filiale.stock.purchase.list'
					},
					{
						name: '系统设置',
						router: 'filiale.set.account.list'
					},
					{
						name: '表报中心',
						router: 'filiale.report.deduction.list'
					}
				],
				stairNars: [],
				menus: [],
				userRights: []
			}
		},
		components: {
			mcmTopHeader,
			mcmLeftMenu
		},
		created () {
			try {
				let userInfo = cJs.getCookie(fCommon.config.USERINFO)
				userInfo = JSON.parse(userInfo)
				this.logo = userInfo.companyName;
				document.title = userInfo.companyName;
			} catch(e) {}
		},
		mounted () {
			var userRights = localStorage.getItem(fCommon.config.USERRIGHTS)
			try{
				userRights = JSON.parse(userRights)
				this.userRights = userRights
			} catch(e) {}
			this.refreshRestoreMenuStatus()
		},
		methods: {
			switchNar (index) {
				this.active = index
			},
			logout () {
				this.loginAction.logout()
			},
			refreshRestoreMenuStatus () {
				var routerName = this.$route.name, that = this
				var userRights = this.userRights, fActice = -1
				for (var i in userRights) {
					let first = userRights[i]
					if(first && first.mark && routerName.indexOf(first.mark, 0) > -1) {
						fActice = i
						break
					}
				}
				if(fActice > -1) {
					this.$refs.mcmTopHeader.setDefaultActive(fActice)
					this.jumpRouter(userRights[fActice])
					setTimeout(() => {
						that.$refs.mcmLeftMenu.setDefaultActive()
					}, 100)
				}
			},
			goEditUserInfo () {
				this.$router.push({
					name: 'filiale.set.user.info'
				});
			},
			jumpRouter (item) {
				if(item && item.children) {
					this.menus = item.children
				} else {
					this.menus = []
				}
				setTimeout(() => {
					this.$refs.mcmLeftMenu.setDefaultActive('1-1')
				}, 100)
			},
			goPsw () {
				this.$router.push({
					name: 'filiale.set.user.amendpsw'
				})
			}
		}
	}
</script>
<style lang="less">
	@import "./public/less/config.less";
	.main-page {
		height: 100%;
		min-width: 1280px;
		background: @mcm-background-color-base;
		.header {
			background: @mcm-color-primary;
			color: @mcm-color-white;
			padding: 0;
			.menu {
				.active {
					background: @mcm-menu-back-active;
				}
			}
		}
		.left {
			background: @mcm-color-white;
		}
	}
</style>