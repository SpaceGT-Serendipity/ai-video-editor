<template>
	<div class="scene" :style="{'transform':`scale(${viewportStore.scale})`}" v-loading="loading"></div>
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
	// import {
	// 	Sound
	// } from '@pixi/sound'
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
		loadBackground,
		loadBackgroundText
	} from '../../../bean/Scene.js'

	const viewportStore = useViewportStore()
	const layersDataStore = useLayersDataStore()
	const trackStore = useTrackStore()
	const globalStore = useGlobalStore()
	const loading = ref(true)
	const app = new Application();
	viewportStore.app = app

	let loadSceneLoading = false
	const loadScene = async (layers) => {
		if (loadSceneLoading) return;
		loadSceneLoading = true;
		for (let i = 0; i < layers.length; i++) {
			const layer = layers[i]
			for (let j = 0; j < layer.length; j++) {
				const unit = layer.units[j]
				if (!unit.scene.loaded)
					await unit.scene.load(app, unit.resource)
			}
		}
		loadSceneLoading = false
	}
	const render = () => {
		const showUnits = []
		layersDataStore.layersTracks.forEach((layer, layerIndex) => {
			layer.units.forEach(unit => {
				if (unit.scene.loaded) {
					if (layer.display) {
						const currentTime = trackStore.seekerTime - unit.duration.left
						if (trackStore.seekerTime >= unit.duration.left &&
							trackStore.seekerTime <= unit.duration.right) {
							unit.scene.container.zIndex = layersDataStore.layersTracks.length -
								layerIndex
							unit.scene.container.visible = true
							if (viewportStore.playing) {
								if (unit.resource.type == 'video') {
									unit.scene.play()
									unit.scene.muted(layer.muted)
								}
							} else {
								if (unit.resource.type == 'video') {
									unit.scene.pause()
									unit.scene.currentTime((unit.duration.start + currentTime) / 1000)
								}
							}
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
			})
		})
	}
	watch(() => layersDataStore.layersScenes, (layers) => loadScene(layers))
	watch(() => layersDataStore.layersTracks, (value) => render())
	watch(() => trackStore.seekerTime, (value) => render())
	watch(() => viewportStore.playing, (value) => render())

	// const runAudio = () => {
	// 	const sound = Sound.from('/assets/audio/jin.mp3')
	// 	sound.play({
	// 		start: currentTime.value
	// 	});
	// }
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

	onMounted(async () => {
		const scene = document.querySelector('.scene')
		await app.init({
			width: globalStore.width,
			height: globalStore.height,
			background: viewportStore.background
		});
		app.stage.interactive = true
		scene.appendChild(app.canvas);
		await loadBackground(app)
		await loadBackgroundText(app)
		loading.value = false
		handleTicker()
	})
</script>

<style>
</style>