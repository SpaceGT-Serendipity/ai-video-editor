<template>
	<el-tabs model-value="预设图片" class="tabs" v-loading="loading">
		<el-tab-pane label="预设图片" name="预设图片">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in imageDataStore.publicData" :key="item.id"
						:data="item"></resource-sample>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="我的图片" name="我的图片">
			<el-scrollbar>
				<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple
					accept=".jpg,.png,.pptx" :on-change="handleUpload">
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
					<div v-for="item in imageDataStore.privateData">
						<resource-sample :data="item"></resource-sample>
					</div>
				</div>
			</el-scrollbar>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup>
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
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
		ppt2image,
		filePath
	} from '../../api/file.js'
	import LayerUnit from '../../bean/LayerUnit.js'
	import ImageSource from '../../bean/source/ImageSource.js'
	import {
		useImageDataStore
	} from '../../store/data/image.js'
	import {
		useLayersDataStore
	} from '../../store/layers.js'

	const layersDataStore = useLayersDataStore()
	const imageDataStore = useImageDataStore()
	const accountStore = useAccountStore()
	const loading = ref(false)

	const handleUpload = async (file) => {
		loading.value = true
		let list = []
		if (file.name.lastIndexOf('.pptx') == file.name.length - 5) {
			const res = await ppt2image(file.raw)
			list = res
		} else {
			const res = await upload(file.raw, 'ai-video-editor/source/image')
			list = [res]
		}
		for (const item of list) {
			await imageDataStore.save({
				name: item.name,
				size: item.size,
				url: item.url,
				cover: item.cover,
				creator: accountStore.id
			})
		}
		await imageDataStore.load()
		loading.value = false
		importScene(list)
	}
	const importScene = (list) => {
		ElMessageBox.confirm(
			'是否导入场景?',
			'上传成功', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'success',
			}
		).then(() => {
			const units = []
			list.forEach((item, index) => {
				const unit = new LayerUnit({
					resource: new ImageSource({
						name: item.name,
						size: item.size,
						url: filePath + item.url,
						cover: filePath + item.cover
					})
				})
				unit.track.x = index * unit.track.w
				units.push(unit)
			})
			layersDataStore.addUnits(units)
		}).catch(() => {})
	}

	onMounted(() => {
		imageDataStore.load()
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