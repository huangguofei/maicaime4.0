<template>
	<mcm-page-area>
		<mcm-page-title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>仓库设置</el-breadcrumb-item>
				<el-breadcrumb-item>基础信息</el-breadcrumb-item>
			</el-breadcrumb>
		</mcm-page-title>
		<!-- <mcm-page-search>搜索区域</mcm-page-search> -->
		<mcm-page-content>
			<el-form ref="form" :model="warehouseData" label-width="180px" style="width: 1000px;">
				<el-form-item label="仓库名称">
					<p>{{warehouseData.warehouseName}}</p>
				</el-form-item>
				<el-form-item label="状态">
					<p>{{warehouseData.statusText}}</p>
				</el-form-item>
				<el-form-item label="仓库负责人">
					<p>{{warehouseData.contactName}}</p>
				</el-form-item>
				<el-form-item label="联系电话">
					<p>{{warehouseData.mobile}}</p>
				</el-form-item>
				<el-form-item label="地址">
					<p>{{warehouseData.province}}{{warehouseData.city}}{{warehouseData.area}}{{warehouseData.address}}</p>
				</el-form-item>
				<el-form-item label="备注">
					<p>{{warehouseData.remark}}</p>
				</el-form-item>
				<el-form-item label="创建时间">
					<p>{{warehouseData.creationTime}}</p>
				</el-form-item>
			</el-form>

		</mcm-page-content>
	</mcm-page-area>
</template>
<script>
	import warehouseActionFun from '@w/action/set/warehouse'
	export default {
		data () {
			return {
				warehouseAction: warehouseActionFun(this),
				previousData: '',
				total: 0,
				warehouseData: '',
				type: 'show'
			}
		},
		created () {
			this.loadWarehouse();
		},
		methods: {
			onSubmit: function () {
				this.warehouseAction.warehouseSet();
			},
			loadWarehouse: function () {
				this.warehouseAction.getWarehouseInfo();
			},
			cancel () {
				this.type = 'show';
				this.warehouseData = JSON.parse(JSON.stringify(this.previousData));
			}
		}
	}
</script>