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
					<el-tooltip class="box-item" effect="dark" content="支持批量上传图片,点文件不超过10MB" placement="top">
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
	import {
		ImageResource
	} from '../../bean/Resource.js'
	import {
		dateFormat
	} from '../../utils/time.js'

	const publicFileList = reactive([])
	const localFileList = reactive([])
	const linkFileList = reactive([])
	const link = ref()

	const handleUpload = (file) => {
		const image = ImageResource.file(file.raw)
		localFileList.push(image)
	}
	const addLinkResource = () => {
		const image = new ImageResource({
			name: dateFormat(new Date()),
			url: link.value
		})
		linkFileList.push(image)
	}
	const load = () => {
		for (let i = 0; i < 20; i++) {
			const image = new ImageResource({
				name: '带妆上阵' + i,
				url: 'https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg'
			})
			publicFileList.push(image)
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