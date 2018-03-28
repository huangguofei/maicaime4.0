----------------------------------------------------------------------------------
---- 买菜么运营系统平台

---- 版本号 3.1.0
----------------------------------------------------------------------------------

----src工作目录介绍

	｜---api    		接口——java数据API(主要所有系统公共接口)
	｜
	｜---components  	组件库——所有系统公共组件
	｜
	｜---admin			买菜么总部运营系统
	｜
	｜   ---main.js        总部运营系统入口文件
	｜
	｜   ---view           页面库——采用SPA开发模式，view目录下是为父组件，可想象成页面
	｜
	｜   ---router         路由处理中心——访问地址，懒加载，地址拦截，登录状态处理等
	｜
	｜   ---store          VUEX状态管理中心——集中式存储管理应用的所有组件状态
	｜
	｜   ---images         图片库（包括图标）
	｜
	｜   ---api            当前系统接口
	｜
	｜   ---action         业务功能块——复杂组件业务处理时，在组件内显得臃肿，将复杂的业务分配到action中
	｜
	｜   ---public         公共脚本——公共的JS和公共的LESS文件
	｜
	｜   ---router         当前系统路由处理中心——访问地址，懒加载，地址拦截，登录状态处理等
	｜
	｜---filiale		买菜么分公司系统
	｜
	｜   ---               子目录介绍参考admin
	｜
	｜---warehouse      买菜么中心仓系统
	｜
	｜   ---           	   子目录介绍参考admin
	｜
	｜---common			所有系统公共脚本——公共的JS和公共的LESS文件
	｜
	｜---main.js        开发环境入口文件
	｜

----static目录介绍
	｜
	｜---admin-ele-theme  		总部运营系统UI主题
	｜
	｜---filiale-ele-theme		分公司系统UI主题
	｜
	｜---warehouse-ele-theme    中心仓系统UI主题
	｜
	｜

----搭建环境
	
	1: 安装NodeJS   版本4.0.0以上

	2：打开命令输入 npm install (安装项目根目录下package.json插件)  安装在成功后可运行打包  

----技术
    
    1: Vue 技术框架  版本2.5.2

    2: webpack    模块化打包  版本3.6.0

    3：axios      请求API     版本0.18.0

    4：vue-router 路由        版本3.0.1

    5：vuex       组件状态管理器  版本3.0.1

    6：less       css预处理器   版本3.0.1

    7：支持ES6写法

    8：eslint     代码检查器   版本4.15.0

    9：element-ui UI框架       版本2.2.0

----打包运行
	
	打开命令输入以下
	1: npm run dev  开发环境运行

	2: npm run build  生产环境打包，生成dist目录，将dist目录上传正式服务器（如:nginx）运行

	3: npm run prod  生产环境打包，生成dist目录, 拆分三个系统（总部、分公司、中心仓）
