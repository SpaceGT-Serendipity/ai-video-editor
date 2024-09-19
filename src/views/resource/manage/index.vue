<template>
	<el-dialog v-model="dialogVisible" title="公共资源" top="10vh" width="1100" :before-close="handleClose">
		<div v-loading="loading" element-loading-text="正在处理,请勿操作..." style="padding: 10px;">

			<div style="margin-bottom: 20px;display: flex; justify-content: space-between; align-items: center;">
				<div>
					<el-radio-group v-model="type" @change="load">
						<el-radio-button value="video">视频</el-radio-button>
						<el-radio-button value="image">图片</el-radio-button>
						<el-radio-button value="bgm">音乐</el-radio-button>
					</el-radio-group>
				</div>
				<div>
					<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple
						accept=".jpg,.png,.pptx,.mp3,.mp4" :on-change="handleUpload" :disabled="!accountStore.account">
						<el-button icon="Platform" type="success" @click="uploadClick">上传资源</el-button>
					</el-upload>
				</div>
			</div>
			<div v-loading="loading" element-loading-text="正在加载视频,请稍等..." style="display: flex; gap: 16px; flex-wrap: wrap; ">
				<el-popover v-if="type==='video'" v-for="item in videoDataStore.publicData" :key="item.id"
					placement="bottom" width="auto" :hide-after="50" trigger="hover">
					<template #reference>
						<resource-sample :key="item.id" :data="item" @load="load" :rechange="true"></resource-sample>
					</template>
					<div style="text-align: center;">
						<el-button size="small" icon="Delete" text type="danger" @load="load"
							@click="handleDel(item.id)"> 删除视频
						</el-button>
					</div>
				</el-popover>
				<el-popover v-else-if="type==='image'" v-for="item in imageDataStore.publicData" :key="item.id"
					placement="bottom" width="auto" :hide-after="50" trigger="hover">
					<template #reference>
						<resource-sample :key="item.id" :data="item" @load="load" :rechange="true"></resource-sample>
					</template>
					<div style="text-align: center;">
						<el-button size="small" icon="Delete" text type="danger" @load="load"
							@click="handleDel(item.id)"> 删除图片
						</el-button>
					</div>
				</el-popover>
				<el-popover v-else v-for="item in bgmDataStore.publicData" :key="item.id" placement="bottom" width="auto"
					:hide-after="50" trigger="hover">
					<template #reference>
						<div class="bgm-list">
							<resource-audio :data="item"></resource-audio>
						</div>
					</template>
					<div style="text-align: center;">
						<el-button size="small" icon="Delete" text type="danger" @load="load"
							@click="handleDel(item.id)"> 删除音频
						</el-button>
					</div>
				</el-popover>
			</div>
		</div>
		<el-empty v-show="pageTotle==0" description="暂无数据" />
		<div style="margin-top: 20px;  display: flex; justify-content: center;">
			<el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
				layout="total, sizes, prev, pager, next" :total="pageTotle" @size-change="load"
				@current-change="load" />
		</div>
	</el-dialog>
</template>

<script setup>
	import ResourceAudio from '../../../components/resource-audio.vue'
	import FileUpload from '../../../components/file-upload.vue'
	import {
		ElNotification
	} from 'element-plus'
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	import {
		count,
		del,
		save
	} from '../../../api/resource.js'
	import {
		filePath,
		upload,
		ppt2image
	} from '../../../api/file.js'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import ResourceSample from '../../../components/resource-sample.vue'
	import {
		useImageDataStore
	} from '../../../store/data/image.js'
	import {
		useBgmDataStore
	} from '../../../store/data/bgm.js'
	import {
		useVideoDataStore
	} from '../../../store/data/video.js'

	const imageDataStore = useImageDataStore()
	const bgmDataStore = useBgmDataStore()
	const videoDataStore = useVideoDataStore()
	const accountStore = useAccountStore()
	const loading = ref(false)
	const dialogVisible = ref(false)
	const currentPage = ref(1)
	const pageSize = ref(30)
	const pageTotle = ref(0)
	const type = ref('video')

	const uploadClick = () => {
		if (!accountStore.account) {
			ElNotification({
				title: '请登录后重试。',
				type: 'warning',
			})
			return;
		}
	}

	const handleUpload = async (e) => {
		loading.value = true
		if (e.name.lastIndexOf('.pptx') == e.name.length - 5) {
			let list = []
			const res = await ppt2image(e.raw)
			list = res
			for (const item of list) {
				await imageDataStore.save({
					name: item.name,
					size: item.size,
					url: item.url,
					cover: item.cover,
					creator: null
				})
			}
		}  else if (e.name.lastIndexOf('.mp4') == e.name.length - 4) {
			const res = await upload(e.raw, 'ai-video/source/video')
			await videoDataStore.save({
				name: res.name,
				size: res.size,
				url: res.url,
				cover: res.cover,
				duration: res.duration * 1000,
				creator: null
			})
		} else if (e.name.lastIndexOf('.mp3') == e.name.length - 4) {
			const res = await upload(e.raw, 'ai-video/source/audio')
			await bgmDataStore.save({
				name: res.name,
				size: res.size,
				url: res.url,
				duration: res.duration * 1000,
				creator: null
			})
		} else {
			const res = await upload(e.raw, 'ai-video-editor/source/image')
			await imageDataStore.save({
				name: res.name,
				size: res.size,
				url: res.url,
				cover: res.cover,
				creator: null
			})
		}
		loading.value = false
	}

	const handleDel = async (id) => {
		const res = await del(id)
		load()
	}

	const load = async () => {
		if(type.value == 'video') {
			await videoDataStore.load(currentPage.value, pageSize.value)
			const videoLength = await count('video')
			pageTotle.value = videoLength
		} else if(type.value == 'image') {
			await imageDataStore.load(currentPage.value, pageSize.value)
			const imageLength = await count('image')
			pageTotle.value = imageLength
		} else {
			await bgmDataStore.load(currentPage.value, pageSize.value)
			const bgmLength = await count('bgm')
			pageTotle.value = bgmLength
		}
	}

	const open = () => {
		dialogVisible.value = true
		load()
	}

	const handleClose = () => {
		dialogVisible.value = false
	}

	onMounted(() => {
		load()
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


	.bgm-list {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: start;
		width: 250px;
	}
</style>