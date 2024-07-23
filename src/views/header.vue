<template>
	<el-page-header icon="ArrowLeft" @back="onBack">
		<template #content>
			<span> AI 视频编辑器 </span>
			<slot></slot>
		</template>
	</el-page-header>
	<div class="project-name">
		<el-button v-if="editTitle==false" text @click="editTitle = true">
			{{globalStore.title}}
			<el-icon>
				<Edit />
			</el-icon>
		</el-button>
		<el-input v-else v-model="globalStore.title" @change="onTitleChange">
			<template #suffix>
				<el-icon>
					<Edit />
				</el-icon>
			</template>
		</el-input>
	</div>
	<div class="button-group">
		<SwitchTheme></SwitchTheme>
		<el-button type="primary" icon="Monitor" @click="compound">合成视频</el-button>
	</div>
</template>

<script setup>
	import SwitchTheme from '../components/switch-theme.vue'
	import {
		ref
	} from 'vue'
	import {
		useWebNotification
	} from '@vueuse/core'
	import {
		useGlobalStore
	} from '../store/global.js'
	import {
		useLayersDataStore
	} from '../store/layers.js'
	import {
		job
	} from '../api/batch.js'

	const globalStore = useGlobalStore()
	const layersDataStore = useLayersDataStore()
	const options = {
		title: 'AI 编辑器 开始合成视频!',
		body: '点击查看详情',
		icon: '/favicon.ico',
		dir: 'auto',
		lang: 'en',
		renotify: true,
		tag: 'spacegt',
	}
	const {
		isSupported,
		show,
		onClick
	} = useWebNotification(options)

	onClick((event) => {
		window.open(import.meta.env.VITE_APP_WEB_NOTIFICATION)
	})

	const editTitle = ref(false)

	const onBack = () => {
		window.location.href = import.meta.env.VITE_APP_BACK_PATH
	}
	const onTitleChange = () => {
		editTitle.value = false
	}
	const compound = () => {
		show()
		const options = {
			"samplingRate": 44100,
			"codeRate": "192k",
			"width": 1920,
			"height": 1080,
			"codec": "libx264",
			"fps": 25,
		}
		const audios = []
		const videos = []
		const figures = []
		if (layersDataStore.mainAudioLayer) {
			let time = 0
			layersDataStore.mainAudioLayer.units.forEach(unit => {
				if (time < unit.duration.left) {
					audios.push({
						"type": "blank",
						"duration": unit.duration.left - time
					})
				}
				audios.push({
					"type": "audio",
					"url": unit.resource.url,
					"start": unit.duration.start,
					"end": unit.duration.end,
					"duration": unit.duration.duration
				})
				time = unit.duration.right
			})
			if (time < layersDataStore.videoTotalDuration) {
				audios.push({
					"type": "blank",
					"duration": layersDataStore.videoTotalDuration - time
				})
			}
		}
		if (layersDataStore.mainVideoLayer) {
			let time = 0
			layersDataStore.mainVideoLayer.units.forEach(unit => {
				if (time < unit.duration.left) {
					videos.push({
						"type": "blank",
						"duration": unit.duration.left - time
					})
				}
				videos.push({
					"type": unit.type,
					"url": unit.resource.url,
					"start": unit.duration.start,
					"end": unit.duration.end,
					"duration": unit.duration.duration,
					"scale": {
						"x": unit.scene.scale.x,
						"y": unit.scene.scale.y
					},
					"overlay": {
						"x": unit.scene.position.x,
						"y": unit.scene.position.y
					}
				})
				time = unit.duration.right
			})
			if (time < layersDataStore.videoTotalDuration) {
				videos.push({
					"type": "blank",
					"duration": layersDataStore.videoTotalDuration - time
				})
			}
		}
		layersDataStore.layers.forEach(layer => {
			if (layer.type == 'figure') {
				layer.units.forEach(unit => {
					figures.push({
						"type": "picture",
						"avatar": unit.resource.url,
						"audio": unit.resource.audio.url,
						"anchor": unit.duration.left,
						"scale": {
							"x": unit.scene.scale.x,
							"y": unit.scene.scale.y
						},
						"overlay": {
							"x": unit.scene.position.x,
							"y": unit.scene.position.y
						}
					})
				})
			}
		})
		options.audios = audios;
		options.videos = videos;
		options.figures = figures;
		job('channel-synthesis-job', globalStore.title , options)
	}
</script>

<style scoped>
	.el-page-header {
		color: var(--el-text-color-primary);
	}


	.project-name .el-button:hover .el-icon {
		opacity: 1;
	}

	.project-name .el-button .el-icon {
		opacity: 0;
		transition: opacity 0.2s;
	}

	.button-group {
		display: flex;
		gap: 10px;
		justify-content: end;
	}

	.button-group .switch-theme {
		margin-right: 20px;
	}
</style>