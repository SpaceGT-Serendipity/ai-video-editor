<template>
	<div class="scene" :style="{'transform':`scale(${sceneStore.scale})`}"></div>
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

	watch(() => editorDataStore.layersScenes, (layers) => {
		Render(layers)
	})

	const Render = async (layers) => {
		for (let i = 0; i < layers.length; i++) {
			const layer = layers[i]
			for (let j = 0; j < layer.length; j++) {
				const unit = layer.units[j]
				if (!unit.scene.loaded) {
					await unit.scene.load(unit.resource)
					loadVideo(app, unit.scene)
				}
			}
		}
	}


	// const playScene = () => {
	// 	playState.value = true
	// 	video.source.resource.play()
	// }

	// const pauseScene = () => {
	// 	playState.value = false
	// 	video.source.resource.pause()
	// }

	// const load = () => {
	// 	video.source.resource.currentTime = currentTime.value
	// }

	// const run = () => {
	// 	const sound = Sound.from('/assets/audio/jin.mp3')
	// 	sound.play({
	// 		start: currentTime.value
	// 	});
	// }
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
		emit('load')
	})
</script>

<style>
</style>