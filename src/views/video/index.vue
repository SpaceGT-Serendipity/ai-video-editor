<template>
	<el-dialog v-model="dialogVisible" :title="dialogTitle" top="10vh" width="1100" :before-close="handleClose">
		<div style="padding: 10px;">
			<el-alert title="双击标题可以文件重命名." type="warning" style="margin-bottom: 10px;" />
			<el-alert title="鼠标悬浮视频可操作观看以及删除." type="warning" style="margin-bottom: 20px;" />
			<el-empty v-if="lessonDataStore.privateData.length==0" description="暂无数据" />
			<div style="display: flex; gap: 16px; flex-wrap: wrap; ">
				<el-popover v-for="item in lessonDataStore.privateData" :key="item.id" placement="bottom" width="auto"
					:hide-after="50" trigger="hover">
					<template #reference>
						<resource-sample :key="item.id" :data="item" @load="loadVideos" :down="true"
							:rechange="true" @rename="handleRename"></resource-sample>
					</template>
					<div style="text-align: center;">
						<el-button size="small" icon="Delete" text type="danger" @load="loadVideos"
							@click="handleDel(item.id)"> 删除视频
						</el-button>
					</div>
				</el-popover>
			</div>
		</div>
		<div style="margin-top: 20px;  display: flex; justify-content: center;">
			<el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
				layout="total, sizes, prev, pager, next" :total="pageTotle"
				@size-change="loadVideos" @current-change="loadVideos" />
		</div>
	</el-dialog>
</template>

<script setup>
	import {
		ElNotification,
		ElMessageBox
	} from 'element-plus'
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	import {
		del,
		listCount
	} from '../../api/video.js'
	import {
		filePath
	} from '../../api/file.js'
	import {
		useAccountStore
	} from '../../store/account.js'
	import ResourceSample from '../../components/resource-sample.vue'
	import {
		useLessonDataStore
	} from '../../store/data/lesson.js'
	import {
		rename
	} from '../../api/video.js'
	
	const lessonDataStore = useLessonDataStore()
	const accountStore = useAccountStore()
	const dialogVisible = ref(false)
	const dialogTitle = ref('我的视频(0)')
	const currentPage = ref(1)
	const pageSize = ref(30)
	const pageTotle = ref(0)

	const handleDel = async (id) => {
		const res = await del(id, accountStore.id)
		await loadVideos()
	}
	
	const loadVideos = async () => {
		if (!accountStore.account) {
			return;
		}
		lessonDataStore.load()
		pageTotle.value = await listCount()
		dialogTitle.value = '我的视频(' + pageTotle.value + ')'
	}

	const open = () => {
		dialogVisible.value = true
		loadVideos()
	}

	const handleClose = () => {
		dialogVisible.value = false
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
						loadVideos()
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

	onMounted(() => {
		loadVideos()
	})

	defineExpose({
		open
	})
</script>
<style>
	.video-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.video-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.video-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 200px;
		height: 150px;
		text-align: center;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 17px;
		justify-content: start;
	}
</style>