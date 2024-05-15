<template>
	<div class="scene"></div>
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
		Sound
	} from '@pixi/sound'
	import {
		useEditorDataStore
	} from '../../../store/editor.js'
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

	watch(() => editorDataStore.layersSimplify, (newList, oldList, added, removed) => {
		Render()
	})

	const Render = () => {
		editorDataStore.layersSimplify.forEach(layer => {
			layer.units.forEach(unit => {
				console.log(unit.scene.sprite)
			})
		})
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
			width: 1920,
			height: 1080,
			background: '#000000'
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