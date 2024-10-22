<template>
	<div>
		<h2 class="title">
			{{dialogTitle}}
		</h2>
		<el-empty v-if="lessonDataStore.privateData.length==0" description="暂无微课" />
		<div style="display: flex; gap: 16px; flex-wrap: wrap; ">
			<div v-for="item in lessonDataStore.privateData" :key="item.id" placement="bottom" width="auto"
				:hide-after="50" trigger="hover">
				<resource-sample :key="item.id" :data="item" @load="load" :rechange="true"
					:delFlag="true" @rename="handleRename" @remove="handleDel"></resource-sample>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		ElNotification,
		ElMessageBox
	} from 'element-plus'
	import ResourceSample from '../../../components/resource-sample.vue'
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		del as delOne,
		listCount,
		rename
	} from '../../../api/video.js'
	import {
		useLessonDataStore
	} from '../../../store/data/lesson.js'

	const lessonDataStore = useLessonDataStore()
	const accountStore = useAccountStore()
	const dialogTitle = ref('我的微课(0)')
	const pageTotle = ref(0)

	const load = async () => {
		if (!accountStore.account) {
			return;
		}
		lessonDataStore.load()
		pageTotle.value = await listCount()
		dialogTitle.value = '我的微课(' + pageTotle.value + ')'
	}

	const handleRename = (id) => {
		ElMessageBox.prompt('请输入新文件名', '重命名', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({
				value
			}) => {
				if (value) {
					rename(id, value).then(res => {
						ElNotification({
							title: '消息',
							message: '修改成功',
							type: 'success',
						})
						lessonDataStore.load()
					})
				} else {
					ElNotification({
						title: '消息',
						message: '新文件名不得为空',
						type: 'warning',
					})
				}
			})
			.catch(() => {})
	}

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
					lessonDataStore.load()
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

	onMounted(() => {
		load()
	})
</script>

<style scoped>
</style>