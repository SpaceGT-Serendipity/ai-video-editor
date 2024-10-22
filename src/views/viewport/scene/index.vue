<template>
	<div class="scene" :style="{ 'transform': `scale(${viewportStore.scale})` }" v-loading="loading"></div>
</template>

<script setup>
const {
	Application,
	Assets,
	Container,
	Sprite,
	Text,
	TextStyle
} = PIXI;
import {
	ref,
	reactive,
	onMounted,
	watch
} from 'vue'
import {
	reactifyObject,
	watchArray
} from '@vueuse/core'
import {
	useLayersDataStore
} from '../../../store/layers.js'
import {
	useViewportStore
} from '../../../store/viewport.js'
import {
	useTrackStore
} from '../../../store/track.js'
import {
	useGlobalStore
} from '../../../store/global.js'
import {
	useSubtitleDataStore
} from '../../../store/data/subtitle.js'
import {
	loadBackground,
	loadBackgroundText
} from '../../../bean/Scene.js'

const subtitleDataStore = useSubtitleDataStore()
const viewportStore = useViewportStore()
const layersDataStore = useLayersDataStore()
const trackStore = useTrackStore()
const globalStore = useGlobalStore()
const loading = ref(true)
const app = new Application();
const background = ref(null)
const backgroundText = ref(null)
viewportStore.app = app

const loadScene = async () => {
	for (let i = 0; i < layersDataStore.layers.length; i++) {
		const layer = layersDataStore.layers[i]
		for (let j = 0; j < layer.length; j++) {
			const unit = layer.get(j)
			if (!unit.scene.initialized)
				await unit.scene.init(app, unit.resource)
		}
	}
}
const loadSubtitle = async () => {
	for (const key in subtitleDataStore.data) {
		const one = subtitleDataStore.data[key]
		subtitleDataStore.loadTextContainers(app, one)
	}
}
const renderUnit = (layer, layerIndex, unit) => {
	// 确保场景已加载
	if (['text', 'image', 'video', 'figure'].includes(layer.type)) {
		if (unit.scene.container) {
			if (unit.scene.initialized) {
				if (layer.display && unit.display) {
					const currentTime = trackStore.seekerTime - unit.duration.left
					if (trackStore.seekerTime >= unit.duration.left &&
						trackStore.seekerTime <= unit.duration.right) {
						unit.scene.container.zIndex = layersDataStore.layersTracks.length - layerIndex
						unit.scene.container.visible = true
						if (viewportStore.playing) {
							if (unit.resource.type == 'video') {
								unit.scene.play()
								unit.scene.muted(layer.muted || unit.muted)
							}
						} else {
							if (unit.resource.type == 'video') {
								unit.scene.pause()
								unit.scene.currentTime((unit.duration.start + currentTime) / 1000)
							}
						}
						unit.scene.frame(unit.track.active)
					} else {
						unit.scene.container.visible = false
						if (unit.resource.type == 'video') {
							unit.scene.pause()
							unit.scene.currentTime(unit.duration.start / 1000)
						}
					}
				} else {
					unit.scene.container.visible = false
					if (unit.type == 'video') unit.scene.pause()
				}
			}
		}
	}
}
const renderSubtitle = () => {
	subtitleDataStore.data.map(item => {
		if (item.textContainers) {
			if (item.startTime <= trackStore.seekerTime && trackStore.seekerTime <= item.endTime && subtitleDataStore.visible) {
				item.textContainers.visible = true
			} else {
				item.textContainers.visible = false
			}
		}
	})
}
// 只聆听音频文件，视频文件声音渲染时管理。
const listenUnit = (layer, layerIndex, unit) => {
	if (['audio', 'figure'].includes(layer.type)) {
		if (!layer.muted && !unit.muted) {
			const currentTime = trackStore.seekerTime - unit.duration.left
			if (trackStore.seekerTime >= unit.duration.left &&
				trackStore.seekerTime <= unit.duration.right) {
				if (viewportStore.playing) {
					if (unit.resource.play) unit.resource.play(currentTime)
				} else {
					if (unit.resource.pause) unit.resource.pause()
				}
			} else {
				if (unit.resource.pause) unit.resource.pause()
			}
		} else {
			if (unit.resource.pause) unit.resource.pause()
		}
	}
}
const render = () => {
	layersDataStore.layers.forEach((layer, layerIndex) => {
		layer.units.forEach(unit => {
			if (layer.visible) renderUnit(layer, layerIndex, unit)
			if (layer.visible) renderSubtitle()
			if (layer.audible) listenUnit(layer, layerIndex, unit)
		})
	})
}
watch(() => layersDataStore.layersScenes, () => loadScene())
watch(() => [subtitleDataStore.stringify], () => loadSubtitle())
watch(() => [
	layersDataStore.layersScenes,
	layersDataStore.layersTracks,
	trackStore.seekerTime,
	viewportStore.playing,
	subtitleDataStore.visible
], () => render())
watch(() => ({
	width: globalStore.width,
	height: globalStore.height
}), async ({
	width,
	height
}) => {
	app.renderer.resize(width, height);
	if (background.value) background.value.destroy()
	background.value = await loadBackground(app)
	if (backgroundText.value) backgroundText.value.destroy()
	// backgroundText.value = await loadBackgroundText(app)
})


const handleTicker = () => {
	let totalDeltaMS = 0
	let seekerPlayingStartTime = 0
	app.ticker.add((ticker) => {
		if (viewportStore.playing) {
			totalDeltaMS += ticker.deltaMS
			trackStore.seekerTime = parseInt(seekerPlayingStartTime + totalDeltaMS)
		} else {
			totalDeltaMS = 0;
			seekerPlayingStartTime = trackStore.seekerTime;
		}
	});
}

const init = async () => {
	const scene = document.querySelector('.scene')
	await app.init({
		width: globalStore.width,
		height: globalStore.height,
		background: viewportStore.background
	});
	app.stage.interactive = true
	scene.appendChild(app.canvas);
	background.value = await loadBackground(app)
	// backgroundText.value = await loadBackgroundText(app)
	loading.value = false
	handleTicker()
}

onMounted(() => {
	init()
})
</script>

<style></style>