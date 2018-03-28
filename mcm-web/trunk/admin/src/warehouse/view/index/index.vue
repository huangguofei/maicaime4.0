<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  created () {
  	var msg = '欢迎进入中心仓库系统...'
  	var len = msg.length
  	var time = setInterval(() => {
  		if(this.msg.length === len) {
  			this.msg = ''
  		} else {
  			this.msg += msg.substring(this.msg.length, this.msg.length + 1)
  		}
  	}, 300)
  }
}
</script>
<style lang="less" scoped>
.hello{
	h1{
		position: absolute;
		top: 35%;
		width: 100%;
		margin:auto;
		text-align: center;
		font-size: 38px;
	}
}
</style>