<template>
	<div class="scene"></div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		Sound
	} from '@pixi/sound'
	const {
		Application,
		Assets,
		Container,
		FillGradient,
		Sprite,
		Text,
		TextStyle
	} = PIXI;
	import {
		mountMove,
		unmountMove
	} from './sprite-move.js'
	
	import {
		mountScale,
		unmountScale
	} from './sprite-scale.js'

	const app = new Application();
	const playState = ref(false)
	const currentTime = ref(0)
	const totalTime = ref(0)

	let video = null;

	const playScene = () => {
		playState.value = true
		video.baseTexture.resource.play()
	}

	const pauseScene = () => {
		playState.value = false
		video.baseTexture.resource.pause()
	}

	const load = () => {
		video.baseTexture.resource.currentTime = currentTime.value
	}

	const run = () => {
		const sound = Sound.from('/assets/audio/jin.mp3')
		sound.play({
			start: currentTime.value
		});
	}

	const loadImg = async () => {
		const image = await Assets.load('/assets/image/1.png');
		const sprite = new Sprite(image);
		sprite.interactive = true
		sprite.anchor.set(0.5);
		sprite.x = app.screen.width / 2;
		sprite.y = app.screen.height / 2;
		app.stage.addChild(sprite);
	}
	const loadVideo = async () => {
		video = await Assets.load('/assets/video/xgplayer.mp4');
		totalTime.value = video.baseTexture.resource.duration
		const videoSprite = new Sprite(video);
		videoSprite.anchor.set(0.5);
		videoSprite.x = app.screen.width / 2;
		videoSprite.y = app.screen.height / 2;
		video.baseTexture.resource.currentTime = currentTime.value
		videoSprite.interactive = true
		app.stage.addChild(videoSprite);
		pauseScene()
		mountMove(app, videoSprite)
		mountScale(app, videoSprite)
	}
	const loadBackground = async () => {
		const background = await Assets.load('/assets/image/background.jpg');
		const backgroundSprite = new Sprite(background);
		backgroundSprite.width = app.screen.width
		backgroundSprite.height = app.screen.height
		backgroundSprite.alpha = 0
		app.stage.addChild(backgroundSprite);
	}
	const loadBackgroundText = async () => {
		const style = new TextStyle({
			fontFamily: 'Arial',
			fontSize: app.screen.width / 20,
			fontWeight: 'bold',
			fill: '#999999'
		});
		const basicText = new Text({
			text: 'Editor Background',
			style
		});
		basicText.x = app.screen.width / 2;
		basicText.y = app.screen.height / 2;
		basicText.anchor.set(0.5);
		app.stage.addChild(basicText);
	}

	onMounted(async () => {
		const scene = document.querySelector('.scene')
		await app.init({
			resizeTo: scene,
			background: '#000000'
		});
		app.stage.interactive = true
		scene.appendChild(app.canvas);
		await loadBackground()
		await loadBackgroundText()
		await loadImg()
		await loadVideo()
	})
</script>

<style>
</style>