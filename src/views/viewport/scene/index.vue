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
	const emit = defineEmits(['load'])
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
				if (!unit.scene.loaded) {
					await unit.scene.load(unit.resource)
					await loadVideo(app, unit.scene)
					if (unit.resource.type == 'video') pause(unit)
					unit.scene.container.visible = false
				}
			}
		}
		loadSceneLoading = false
	}
	const render = () => {
		const showUnits = []
		editorDataStore.layersTracks.forEach(layer => {
			layer.units.forEach(unit => {
				if (unit.scene.loaded) {
					if (layer.display) {
						if (trackStore.seekerTime > unit.duration.left &&
							trackStore.seekerTime < unit.duration.right) {
							showUnits.push(unit)
						} else {
							unit.scene.container.visible = false
						}
					} else {
						unit.scene.container.visible = false
					}
				}
			})
		})
		for (const unit of showUnits) {
			const currentTime = trackStore.seekerTime - unit.duration.left
			if (unit.resource.type == 'video') {
				load(unit, currentTime)
			}
			unit.scene.container.visible = true
		}
	}
	watch(() => editorDataStore.layersScenes, (layers) => {
		loadScene(layers)
	})
	watch(() => editorDataStore.layersTracks, (value) => {
		render()
	})
	watch(() => trackStore.seekerTime, (value) => {
		render()
	})

	const play = (unit) => {
		unit.scene.texture.source.resource.play()
	}

	const pause = (unit) => {
		unit.scene.texture.source.resource.pause()
	}

	const load = (unit, currentTime) => {
		unit.scene.texture.source.resource.currentTime = currentTime  / 1000 
	}

	// const runAudio = () => {
	// 	const sound = Sound.from('/assets/audio/jin.mp3')
	// 	sound.play({
	// 		start: currentTime.value
	// 	});
	// }
	const handleTicker = () => {
		app.ticker.add((ticker) => {
			if (sceneStore.playing) {
				console.log(ticker)
				trackStore.seekerTime += parseInt(ticker.deltaMS)
			}
		});
	}

	onMounted(async () => {
		const scene = document.querySelector('.scene')
		await app.init({
			// resizeTo: scene,
			width: sceneStore.width,
			height: sceneStore.height,
			background: sceneStore.background
		});
		app.stage.interactive = true
		scene.appendChild(app.canvas);
		await loadBackground(app)
		await loadBackgroundText(app)
		loading.value = false
		emit('load')
		handleTicker()
	})
</script>

<style>
</style>