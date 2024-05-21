<template>
	<div class="scene" :style="{'transform':`scale(${sceneStore.scale})`}" v-loading="loading"></div>
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
		useEditorDataStore
	} from '../../../store/editor.js'
	import {
		useSceneStore
	} from '../../../store/scene.js'
	import {
		useTrackStore
	} from '../../../store/track.js'
	import {
		loadAssets,
		loadImg,
		loadVideo,
		loadBackground,
		loadBackgroundText
	} from '../../../bean/Scene.js'

	const app = new Application();
	const editorDataStore = useEditorDataStore()
	const sceneStore = useSceneStore()
	const trackStore = useTrackStore()
	const loading = ref(true)

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
		editorDataStore.layersTracks.forEach((layer, layerIndex) => {
			layer.units.forEach(unit => {
				if (unit.scene.loaded) {
					if (layer.display) {
						if (trackStore.seekerTime >= unit.duration.left &&
							trackStore.seekerTime <= unit.duration.right) {
							unit.scene.container.zIndex =
								editorDataStore.layersTracks.length - layerIndex
							unit.scene.container.visible = true
							if (unit.resource.type == 'video') {
								if (sceneStore.playing) {
									unit.scene.play()
								} else {
									const currentTime = trackStore.seekerTime - unit.duration.left
									unit.scene.currentTime((unit.duration.start + currentTime) / 1000)
									unit.scene.pause()
								}
							}

						} else {
							unit.scene.container.visible = false
							if (unit.resource.type == 'video') unit.scene.currentTime(0)
						}
					} else {
						unit.scene.container.visible = false
						if (unit.resource.type == 'video') unit.scene.currentTime(0)
					}
				}
			})
		})
	}
	watch(() => editorDataStore.layersScenes, (layers) => loadScene(layers))
	watch(() => editorDataStore.layersTracks, (value) => render())
	watch(() => trackStore.seekerTime, (value) => render())
	watch(() => sceneStore.playing, (value) => render())

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
			if (sceneStore.playing) {
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
			width: sceneStore.width,
			height: sceneStore.height,
			background: sceneStore.background
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