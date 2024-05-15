<template>
	<div class="viewport" ref="viewportRef">
		<div class="adaptive-size" ref="adaptiveSizeRef">
			<Scene ref="sceneRef" @load="handleSceneLoad"></Scene>
		</div>
		<div class="options">
			<div style="padding: 10px; box-sizing: border-box;">
				<el-slider v-model="currentTime" :max="totalTime" :step="0.01" @input="onLoadScene" />
				<div class="group-option">
					<div class="left-option">
						<span class="current-time"> {{dateFormat(currentTime*1000,'hh:mm:ss.SS')}} </span> |
						{{dateFormat(totalTime*1000,'hh:mm:ss.SS')}}
					</div>
					<div class="center-option">
						<el-button v-if="!playState" link @click="onPlayScene">
							<el-icon size="26">
								<VideoPlay />
							</el-icon>
						</el-button>
						<el-button v-else link @click="onPauseScene">
							<el-icon size="26">
								<VideoPause />
							</el-icon>
						</el-button>
					</div>
					<div class="right-option">
						<select-scene-size></select-scene-size>
						<select-scene-speed></select-scene-speed>
						<el-button v-if="!isFullscreen" text @click="enter()">
							<el-icon size="20">
								<font-awesome-icon icon="expand" />
							</el-icon>
						</el-button>
						<el-button v-else text @click="exit()">
							<el-icon size="20">
								<font-awesome-icon icon="compress" />
							</el-icon>
						</el-button>
					</div>
				</div>
			</div>
		</div>
		<el-alert title="轨道中的数字人仅支持预览动态形象，合成后可查看口型效果" type="info" show-icon />
	</div>
</template>

<script setup>
	import SelectSceneSize from '../../components/select-scene-size.vue'
	import SelectSceneSpeed from '../../components/select-scene-speed.vue'
	import {
		useFullscreen,
		useElementSize
	} from '@vueuse/core'
	import Scene from './scene/index.vue'
	import {
		ref,
		onMounted,
		watch
	} from 'vue'
	import {
		dateFormat
	} from '../../utils/time.js'
	import {
		useEditorDataStore
	} from '../../store/editor.js'
	import {
		useSceneStore
	} from '../../store/scene.js'

	const editorDataStore = useEditorDataStore()
	const sceneStore = useSceneStore()
	const playState = ref(false)
	const adaptiveSizeRef = ref()
	const currentTime = ref(0)
	const totalTime = ref(0)
	const sceneRef = ref()
	const viewportRef = ref()
	const {
		isFullscreen,
		enter,
		exit,
		toggle
	} = useFullscreen(viewportRef)
	const adaptiveSize = useElementSize(adaptiveSizeRef)

	watch(() => ({
		width: adaptiveSize.width.value,
		height: adaptiveSize.height.value
	}), ({
		width,
		height
	}) => {
		const widthScale = width / sceneStore.width
		const heightScale = height / sceneStore.height
		if (widthScale < heightScale) sceneStore.scale = widthScale
		else sceneStore.scale = heightScale
	})

	const speed = ref()


	const onPlayScene = () => {

	}
	const onPauseScene = () => {

	}
	const onLoadScene = () => {

	}
	const handleSceneLoad = () => {

	}
	onMounted(() => {})
</script>

<style scoped>
	.viewport {
		position: relative;
		padding: 20px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.adaptive-size {
		overflow: hidden;
		flex: 1 1 0%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.scene {
		display: flex;
		text-align: center;
		justify-content: center;
	}

	.options {
		height: 80px;
		flex-shrink: 0;
	}

	.options .group-option {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}


	.options .group-option .left-option {
		width: 200px;
		font-size: 12px;
		letter-spacing: 1px;
	}

	.options .group-option .left-option .current-time {
		color: #3583fb;
	}

	.options .group-option .right-option {
		width: 200px;
		display: flex;
		gap: 10px;
	}

	.el-alert {
		position: absolute;
		top: 30px;
		width: 460px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 20px;
	}
</style>