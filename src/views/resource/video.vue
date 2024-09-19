<template>
	<el-tabs model-value="预设视频" class="tabs">
		<el-tab-pane label="预设视频" name="预设视频">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in videoDataStore.publicData" :key="item.id" :data="item"></resource-sample>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="我的视频" name="我的视频">
			<el-scrollbar v-loading="loadingVideos" element-loading-text="正在加载视频,请稍等...">
				<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple accept=".mp4"
					:on-change="handleUpload">
					<el-button icon="Plus">点击上传本地视频</el-button>
					<el-tooltip class="box-item" effect="dark" content="支持批量上传文件,单文件不超过100MB" placement="top">
						<el-button link>
							<el-icon>
								<InfoFilled />
							</el-icon>
						</el-button>
					</el-tooltip>
				</el-upload>

				<div class="list">
					<div v-for="item in videoDataStore.privateData">
						<resource-sample :data="item"></resource-sample>
					</div>
				</div>
			</el-scrollbar>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup>
	import ResourceSample from '../../components/resource-sample.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useAccountStore
	} from '../../store/account.js'
	import {
		upload,
	} from '../../api/file.js'
	import {
		useVideoDataStore
	} from '../../store/data/video.js'

	const videoDataStore = useVideoDataStore()
	const accountStore = useAccountStore()
	const loadingVideos = ref(false)

	const handleUpload = async (file) => {
		loadingVideos.value = true
		const res = await upload(file.raw, 'ai-video/source/video')
		await videoDataStore.save({
			name: res.name,
			size: res.size,
			url: res.url,
			cover: res.cover,
			duration: res.duration * 1000,
			creator: accountStore.id
		})
		loadingVideos.value = false
	}

	onMounted(() => {
		videoDataStore.load()
	})
</script>

<style scoped>
	.tabs {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.tabs:deep(.el-tabs__header) {
		flex: 0 0 0%;
	}

	.tabs:deep(.el-tabs__content) {
		flex: 1 1 0%
	}

	.tabs .el-tab-pane {
		height: 100%;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: start;
	}

	.upload {
		margin-bottom: 10px;
	}

	.link-group-button {
		display: flex;
		gap: 5px;
		margin-bottom: 10px;
	}
</style>