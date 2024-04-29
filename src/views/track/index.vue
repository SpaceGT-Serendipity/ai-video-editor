<template>
	<div class="track">
		<toolbar v-if="haveResources" ref="toolbarRef" @change-scale="handleToolberChangeScale"></toolbar>
		<div class="view">
			<div class="controller-group" v-if="haveResources">
				<controller-layer v-for="i in 2"></controller-layer>
			</div>
			<div class="scrollbar">
				<div class="timeline-group">
					<timeline-ruler v-if="haveResources" ref="timelineRulerRef" :scale="scale" :time="1000 * 60 * 10"
						:scale-width="200" :scale-time="1000 * 10"></timeline-ruler>
					<timeline-layers v-if="haveResources" :scale="scale"
						@on-drag="handleTimelineLayersOnDrag"></timeline-layers>
					<el-empty v-else :image-size="80" description="暂无内容,点击左侧资源栏素材到此处" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import Toolbar from './toolbar/index.vue'
	import ControllerLayer from './controller/layer.vue'
	import TimelineLayers from './timeline/layers.vue'
	import TimelineRuler from './timeline/ruler.vue'

	import {
		ref
	} from 'vue'

	const toolbarRef = ref()
	const timelineRulerRef = ref()
	const haveResources = ref(true)
	const scale = ref(1)

	const handleToolberChangeScale = (data) => {
		scale.value = data.toFixed(2) * 1
	}
	const handleTimelineLayersOnDrag = (event) => {
		const last_position = event.position.x + event.position.w
		timelineRulerRef.value.resize(last_position)
	}
</script>

<style scoped>
	.track {
		--track-timeline-ruler-height: 40px;
		--track-layer: 50px;
		display: flex;
		flex-direction: column;
	}

	.track .view {
		display: flex;
		height: 100%;
		
	}

	.track .el-empty {
		height: calc(100% - 40px);
		margin: 20px;
		background-color: #2e2e35;
		border: 1px dashed #505057;
		border-radius: 4px;
	}

	.controller-group {
		flex: 0 0 100px;
		display: flex;
		flex-direction: column;
		padding-top: var(--track-timeline-ruler-height);
		border-right: 1px solid var(--el-border-color-lighter);

	}

	.controller-group .controller.layer {
		padding: 0 20px;
		height: var(--track-layer);
	}

	.timeline-group {
		display: flex;
		flex-direction: column;
		width: max-content;
		min-width: 200vw;
	}

	.timeline-group .timeline.ruler {
		height: var(--track-timeline-ruler-height);
	}

	.timeline-group .timeline-layers {
		flex: 1 1 0%;
		
	}

	.scrollbar {
		overflow: auto;
	}

	.scrollbar::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px var(--scrollbar-background-color);
		border-radius: 4px;
		background-color: var(--scrollbar-background-color);
		cursor: pointer;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background-color: var(--scrollbar-foreground-color);
		border-radius: 4px;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		height: 14px;
		border-radius: 4px;
		background-color: var(--scrollbar-foreground-color);
		cursor: pointer;
	}

	.scrollbar::-webkit-scrollbar {
		height: 2px;
	}

	.scrollbar:hover::-webkit-scrollbar {
		height: 8px;
		background-color: var(--scrollbar-background-color);
		cursor: pointer;
	}
</style>