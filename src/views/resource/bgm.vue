<template>
	<el-tabs model-value="预设音乐" class="tabs">
		<el-tab-pane label="预设音乐" name="预设音乐">
			<el-scrollbar>
				<div class="list">
					<resource-audio v-for="item in bgmDataStore.publicData" :key="item.id"
						:data="item"></resource-audio>
				</div>
			</el-scrollbar>
		</el-tab-pane>
		<el-tab-pane label="我的音乐" name="我的音乐">
			<el-scrollbar v-loading="loading" element-loading-text="正在加载音频,请稍等...">
				<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple accept=".mp3"
					:on-change="handleUpload">
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
					<div v-for="item in bgmDataStore.privateData">
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
	import AudioSource from '../../bean/source/AudioSource.js'
	import {
		useAccountStore
	} from '../../store/account.js'
	import {
		useBgmDataStore
	} from '../../store/data/bgm.js'
	import {
		upload
	} from '../../api/file.js'

	const bgmDataStore = useBgmDataStore()
	const accountStore = useAccountStore()
	const loading = ref(false)

	const handleUpload = async (file) => {
		loading.value = true
		const res = await upload(file.raw, 'ai-video/source/audio')
		await bgmDataStore.save({
			name: res.name,
			size: res.size,
			url: res.url,
			duration: res.duration * 1000,
			creator: accountStore.id
		})
		loading.value = false
	}
	onMounted(() => {
		bgmDataStore.load()
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