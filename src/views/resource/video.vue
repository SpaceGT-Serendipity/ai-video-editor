<template>
	<el-tabs model-value="预设视频" class="tabs">
		<el-tab-pane label="预设视频" name="预设视频">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in publicFileList" :key="item.id" :data="item"></resource-sample>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="本地视频" name="本地视频">
			<el-scrollbar v-loading="loadingLocalVideos" element-loading-text="正在加载本地视频,请稍等...">
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
					<div v-for="item in localFileList">
						<resource-sample :data="item"></resource-sample>
					</div>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="视频链接" name="视频链接">
			<el-scrollbar v-loading="loadingLinkVideos" element-loading-text="正在加载远程视频,请稍等...">
				<div class="link-group-button">
					<el-input v-model="link" placeholder="URL"></el-input>
					<el-button @click="addLinkResource">添加</el-button>
				</div>
				<div class="list">
					<div v-for="item in linkFileList">
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
		reactive,
		onMounted
	} from 'vue'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	import VideoResource from '../../bean/VideoResource'
	import {
		reactify
	} from '@vueuse/core'
	import {
		dateFormat
	} from '../../utils/time.js'
	import {
		loadVideo
	} from '../../api/resource.js'
	import {
		upload
	} from '../../api/file.js'
	import {
		useResourceLocalStore,
		useResourceLinkStore
	} from '../../store/resource.js'

	const resourceLocalStore = useResourceLocalStore()
	const resourceLinkStore = useResourceLinkStore()
	const publicFileList = reactive([])
	const localFileList = reactive([])
	const linkFileList = reactive([])
	const link = ref()
	const loadingLocalVideos = ref(false)
	const loadingLinkVideos = ref(false)

	const handleUpload = async (file) => {
		loadingLocalVideos.value = true
		const video = await VideoResource.file(file.raw)
		localFileList.push(video)
		loadingLocalVideos.value = false
		// 上传至服务器
		const res = await upload(file.raw, 'ai-video-editor/source/video')
		video.url = `${import.meta.env.VITE_APP_FILE_SERVER}/download/${res.url}`
		// 加入本地列表
		resourceLocalStore.videos.push({
			name: video.name,
			url: video.url
		})
	}
	const addLinkResource = async () => {
		loadingLinkVideos.value = true
		const video = await VideoResource.url(link.value, dateFormat(new Date()))
		linkFileList.push(video)
		loadingLinkVideos.value = false
		// 加入本地列表
		resourceLinkStore.videos.push({
			name: video.name,
			url: link.value
		})
	}
	const load = async () => {
		const res = await loadVideo()
		for (let i = 0; i < res.length; i++) {
			const video = new VideoResource(res[i])
			publicFileList.push(video)
		}
	}
	const loadLocal = async () => {
		loadingLocalVideos.value = true
		for (let i = 0; i < resourceLocalStore.videos.length; i++) {
			const video =
				await VideoResource.url(resourceLocalStore.videos[i].url, resourceLocalStore.videos[i].name)
			localFileList.push(video)
		}
		loadingLocalVideos.value = false
	}
	const loadLink = async () => {
		loadingLinkVideos.value = true
		for (let i = 0; i < resourceLinkStore.videos.length; i++) {
			const video =
				await VideoResource.url(resourceLinkStore.videos[i].url, resourceLinkStore.videos[i].name)
			linkFileList.push(video)
		}
		loadingLinkVideos.value = false
	}

	onMounted(() => {
		load()
		loadLocal()
		loadLink()
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