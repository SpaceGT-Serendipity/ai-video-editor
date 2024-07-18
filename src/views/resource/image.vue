<template>
	<el-tabs model-value="预设图片" class="tabs">
		<el-tab-pane label="预设图片" name="预设图片">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in publicFileList" :key="item.id" :data="item"></resource-sample>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="本地图片" name="本地图片">
			<el-scrollbar>
				<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple
					accept=".jpg,.png" :on-change="handleUpload">
					<el-button icon="Plus">点击上传本地图片</el-button>
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
						<resource-sample :data="item"></resource-sample>
					</div>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="图片链接" name="图片链接">
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
		reactify
	} from '@vueuse/core'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	import ImageResource from '../../bean/ImageResource'
	import {
		dateFormat
	} from '../../utils/time.js'
	import {
		loadImage
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

	const handleUpload = async (file) => {
		const image = ImageResource.file(file.raw)
		localFileList.push(image)
		// 上传至服务器
		const res = await upload(file.raw, 'ai-video-editor/source/image')
		image.url = `${import.meta.env.VITE_APP_FILE_SERVER}/download/${res.url}`
		// 加入本地列表
		resourceLocalStore.images.push({
			name: image.name,
			url: image.url
		})
	}
	const addLinkResource = () => {
		const image = new ImageResource({
			name: dateFormat(new Date()),
			url: link.value
		})
		linkFileList.push(image)
		// 加入本地列表
		resourceLinkStore.images.push({
			name: image.name,
			url: link.value
		})
	}
	const load = async () => {
		const res = await loadImage()
		for (let i = 0; i < res.length; i++) {
			const image = new ImageResource({
				name: res[i].name,
				url: res[i].url
			})
			publicFileList.push(image)
		}
	}
	const loadLocal = async () => {
		for (let i = 0; i < resourceLocalStore.images.length; i++) {
			const image = new ImageResource({
				name: resourceLocalStore.images[i].name,
				url: resourceLocalStore.images[i].url
			})
			localFileList.push(image)
		}
	}
	const loadLink = async () => {
		for (let i = 0; i < resourceLinkStore.images.length; i++) {
			const image = new ImageResource({
				name: resourceLinkStore.images[i].name,
				url: resourceLinkStore.images[i].url
			})
			linkFileList.push(image)
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