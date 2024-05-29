<template>
	<el-tabs model-value="预设音乐" class="tabs">
		<el-tab-pane label="预设音乐" name="预设音乐">
			<el-scrollbar>
				<div class="list">
					<resource-audio v-for="item in publicFileList" :key="item.id" :data="item"></resource-audio>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="本地音乐" name="本地音乐">
			<el-scrollbar>
				<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple
					accept=".jpg,.png" :on-change="handleUpload">
					<el-button icon="Plus">点击上传本地音乐</el-button>
					<el-tooltip class="box-item" effect="dark" content="支持批量上传文件,单文件不超过10MB" placement="top">
						<el-button link>
							<el-icon>
								<InfoFilled />
							</el-icon>
						</el-button>
					</el-tooltip>
				</el-upload>
				<div class="list">
					<div v-for="item in localFileList">
						<resource-audio :data="item"></resource-audio>
					</div>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="音乐链接" name="音乐链接">
			<el-scrollbar>
				<div class="link-group-button">
					<el-input v-model="link" placeholder="URL"></el-input>
					<el-button @click="addLinkResource">添加</el-button>
				</div>
				<div class="list">
					<div v-for="item in linkFileList">
						<resource-audio :data="item"></resource-audio>
					</div>
				</div>
			</el-scrollbar>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup>
	import ResourceAudio from '../../components/resource-audio.vue'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		reactify
	} from '@vueuse/core'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	import {
		AudioResource
	} from '../../bean/Resource.js'
	import {
		dateFormat
	} from '../../utils/time.js'
	import {
		loadAudios
	} from '../../api/audio.js'
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

	const handleUpload = async (file) => {
		const audio = AudioResource.file(file.raw)
		localFileList.push(audio)
		// 上传至服务器
		const res = await upload(file.raw, 'ai-video-editor/source/audio')
		audio.url = `${import.meta.env.VITE_APP_FILE_API}/download/${res.url}`
		// 加入本地列表
		resourceLocalStore.audios.push({
			name: audio.name,
			url: audio.url
		})
	}
	const addLinkResource = () => {
		const audio = new AudioResource({
			name: dateFormat(new Date()),
			url: link.value
		})
		linkFileList.push(audio)
		// 加入本地列表
		resourceLinkStore.audios.push({
			name: audio.name,
			url: link.value
		})
	}
	const load = async () => {
		const res = await loadAudios()
		for (let i = 0; i < res.length; i++) {
			const audio = new AudioResource(res[i])
			publicFileList.push(audio)
		}
	}
	const loadLocal = async () => {
		for (let i = 0; i < resourceLocalStore.audios.length; i++) {
			const audio = new AudioResource(resourceLocalStore.audios[i])
			localFileList.push(audio)
		}
	}
	const loadLink = async () => {
		for (let i = 0; i < resourceLinkStore.audios.length; i++) {
			const audio = new AudioResource(resourceLinkStore.audios[i])
			linkFileList.push(audio)
		}
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
		flex-direction: column;
		flex-wrap: wrap;
		gap: 10px;
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