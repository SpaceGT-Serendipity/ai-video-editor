<template>
	<div class="viewport">
		<Scene></Scene>
		<div class="options">
			<div style="padding: 10px; box-sizing: border-box;">
				<el-slider v-model="currentTime" :max="totalTime" :step="0.01" @input="onLoadScene" />
				<div class="group-option">
					<div class="left-option">
						<span class="current-time"> {{dateFormat(currentTime*1000,'hh:mm:ss.SS')}} </span> |
						{{dateFormat(totalTime*1000,'hh:mm:ss.SS')}}
					</div>
					<div class="center-option">
						<el-button v-if="!playState" text @click="onPlayScene">
							<el-icon size="26">
								<VideoPlay />
							</el-icon>
						</el-button>
						<el-button v-else text @click="onPauseScene">
							<el-icon size="26">
								<VideoPause />
							</el-icon>
						</el-button>
					</div>
					<div class="right-option">
						<el-button>21:9</el-button>
						<el-button>2.0x</el-button>
						<el-button text>
							<el-icon size="20">
								<FullScreen />
							</el-icon>
						</el-button>
					</div>
				</div>
				<!-- <div style=" bottom: 0; width: 100%; padding: 20px; box-sizing: border-box;">
					<el-button @click="load">加载</el-button>
					<el-button @click="run">运行</el-button>
					<el-button @click="playVideo">播放</el-button>
					<el-button @click="pauseVideo">暂停</el-button>
				</div> -->
			</div>
		</div>
		<el-alert title="轨道中的数字人仅支持预览动态形象，合成后可查看口型效果" type="info" show-icon />
	</div>
</template>

<script setup>
	import Scene from './scene.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		dateFormat
	} from '../../utils/time.js'

	const playState = ref(false)
	const currentTime = ref(0)
	const totalTime = ref(0)


	const onPlayScene = () => {

	}
	const onPauseScene = () => {

	}
	const onLoadScene = () => {

	}
</script>

<style scoped>
	.viewport {
		position: relative;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.scene {
		height: 100%;
		display: flex;
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