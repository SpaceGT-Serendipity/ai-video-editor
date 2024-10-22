<template>
	<div>
		<h2 class="title">
			我的数字人形象
		</h2>
		<el-segmented v-model="value" :options="options" />
		<div v-if="value=='全部'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.privateData" :key="item.id"
						:data="item" :delFlag="true" @remove="handleDel"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.privateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='静态'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.picturePrivateData" :key="item.id"
						:data="item" :delFlag="true" @remove="handleDel"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.picturePrivateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='视频'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.videoPrivateData" :key="item.id"
						:data="item" :delFlag="true" @remove="handleDel"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.videoPrivateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='动态'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.dynamicPrivateData" :key="item.id"
						:data="item" :delFlag="true" @remove="handleDel"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.dynamicPrivateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='我的'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.privateData" :key="item.id"
						:data="item" :delFlag="true" @remove="handleDel"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.privateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup>
	import ResourceSample from '../../../components/resource-sample.vue'
	import {
		ref,
		onMounted,
		watch
	} from 'vue'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		useFigureDataStore
	} from '../../../store/data/figure.js'
	import {
		del as delOne
	} from '../../../api/avatar.js'

	const value = ref('全部')

	const options = ['全部', '静态', '视频', '动态', '我的']
	const figureDataStore = useFigureDataStore()
	const accountStore = useAccountStore()

	const handleDel = async (id) => {
		ElMessageBox.confirm(
				'确定删除吗？',
				'警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					draggable: true,
					overflow: true,
				}
			)
			.then(() => {
				delOne(id, accountStore.id).then(res => {
					ElNotification({
						title: '消息',
						message: '删除成功',
						type: 'succeed',
					})
					figureDataStore.load()
				})
			})
			.catch(() => {
				ElNotification({
					title: '消息',
					message: '删除失败',
					type: 'warning',
				})
			})
	}

	watch(() => accountStore.id, () => {
		figureDataStore.load()
	})

	onMounted(() => {
		figureDataStore.load()
	})
</script>

<style scoped>
	.el-segmented {
		--el-border-radius-base: 16px;
	}
</style>