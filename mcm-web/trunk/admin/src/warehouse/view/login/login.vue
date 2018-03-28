<template>
	<div class="login">
		<div class="main">
			<div class="pull-left logo">
				<div class="login_bg"></div>
				<div class="login_main">
					<img src="../../images/logo1 copy.png" />
					<h2>中心仓运营管理系统</h2>
					<p class="call">
						客服电话<br> 400-8082-836
					</p>
				</div>
			</div>
			<div class="pull-left form">
				<form>
					<div class="item">
						<img src="../../../filiale/images/login_mobile.png" />
						<input type="text" v-model="form.userName" class="moblie" value="" placeholder="请输入手机号" />
					</div>
					<div class="item">
						<img src="../../../filiale/images/login_secret.png" />
						<input type="password" v-model="form.password" name="" class="psw" value="" placeholder="请输入密码" />
					</div>
				</form>
				<a href="javascript:;">忘记密码</a>
				<button class="sub_btn" type="button" @click="submitForm">登录</button>
			</div>
		</div>
	</div>
</template>

<script>
import loginActionFun from '@w/action/login/login'
export default {
		data () {
			return {
				form: {
					userName: '',
					password: ''
				},
				loginAction: loginActionFun(this)
			}
		},
		mounted () {},
		methods: {
			submitForm () {
				if(!this.form.userName) {
					this.$message.error('手机号不能为空！')
					return false
				}
				if(!this.form.password) {
					this.$message.error('密码不能为空！')
					return false
				}
				this.loginAction.loginInfo(this.form)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import "../../../common/less/common.css";
	.login {
		width: 100%;
		height: 100%;
		background: url(../../images/login_bg.png) no-repeat;
		padding: 10% 0;
		background-size: cover;
		box-sizing: border-box;
		.main {
			width: 860px;
			height: 480px;
			margin: 0 auto;
			box-shadow: 0 0 20px #000;
			.logo {
				position: relative;
				width: 360px;
				height: 100%;
				text-align: center;
				.login_bg {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: #1EC551;
					opacity: .8;
				}
				.login_main {
					z-index: 2;
					position: relative;
					img {
						width: 140px;
						height: auto;
						margin: 100px 0 15px;
					}
					h2 {
						font-size: 28px;
						color: #fff;
						margin-bottom: 140px;
					}
					.call {
						width: 240px;
						height: 68px;
						line-height: 34px;
						border: 1px solid #fff;
						color: #fff;
						font-size: 24px;
						margin: 0 auto;
					}
				}
			}
			.form {
				width: 500px;
				height: 100%;
				background: #fff;
				padding: 60px;
				box-sizing: border-box;
				form {
					.item {
						border: 1px solid #EBEEF5;
						height: 68px;
						border-radius: 5px;
						margin-bottom: 30px;
						display: flex;
						align-items: center;
						padding-left: 20px;
						img {
							width: 30px;
							height: auto;
							margin-right: 15px;
							vertical-align: middle;
						}
						input {
							border: 0;
							font-size: 25px;
							color: #1C2C43;
							height: 40px;
							line-height: 40px;
							outline: none;
						}
					}
				}
				a {
					display: block;
					color: #606266;
					font-size: 18px;
				}
				.sub_btn {
					width: 380px;
					height: 70px;
					line-height: 70px;
					border-radius: 5px;
					display: block;
					margin: 40px auto;
					text-align: center;
					background: #1EC551;
					font-size: 24px;
					color: #fff;
					outline: none;
					border: 0;
				}
			}
		}
	}
</style>