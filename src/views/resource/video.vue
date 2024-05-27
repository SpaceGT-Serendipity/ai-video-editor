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
			<el-scrollbar>
				<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple accept=".mp4"
					:on-change="handleUpload">
					<el-button icon="Plus">点击上传本地视频</el-button>
					<el-tooltip class="box-item" effect="dark" content="支持批量上传视频,点文件不超过100MB" placement="top">
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
			<el-scrollbar>
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
	import {
		VideoResource
	} from '../../bean/Resource.js'
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

	const publicFileList = reactive([])
	const localFileList = reactive([])
	const linkFileList = reactive([])
	const link = ref()

	const handleUpload = async (file) => {
		const video = VideoResource.file(file.raw)
		localFileList.push(video)
		const res = await upload(file.raw, 'ai-video-editor/source/video')
		video.url = `${import.meta.env.VITE_APP_FILE_API}/download/${res.url}`
	}
	const addLinkResource = async () => {
		const video = await VideoResource.url(link.value, dateFormat(new Date()))
		linkFileList.push(video)
	}
	const load = async () => {
		const res = await loadVideo()
		for (let i = 0; i < res.length; i++) {
			const video = await VideoResource.url(res[i].url, res[i].name)
			publicFileList.push(video)
		}
	}

	onMounted(() => {
		load()
	})
</script>

<style scoped>
	.tabs {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.tabs .el-tabs__header {
		flex: 0 0 0%;
	}

	.tabs .el-tabs__content {
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
		padding: 20px;
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