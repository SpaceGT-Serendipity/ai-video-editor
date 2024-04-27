<template>
	<div class="track">
		<toolbar v-if="haveResources"></toolbar>
		<div class="view">
			<div class="controller-group" v-if="haveResources">
				<controller-layer v-for="i in 1"></controller-layer>
			</div>
			<div class="timeline-group">
				<timeline-ruler v-if="haveResources"></timeline-ruler>
				<div v-if="haveResources" class="timeline-layers">
					<timeline-layer v-for="i in 1"></timeline-layer>
				</div>
				<el-empty v-else :image-size="80" description="暂无内容,点击左侧资源栏素材到此处" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import Toolbar from './toolbar.vue'
	import ControllerLayer from './controller/layer.vue'
	import TimelineLayer from './timeline/layer.vue'
	import TimelineRuler from './timeline/ruler.vue'
	import {
		ref
	} from 'vue'

	const haveResources = ref(true)
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

	.track .layer {
		height: var(--track-layer);
		margin-top: 10px;
	}

	.track .layer:first-child {
		margin-top: 0px;
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
	}

	.timeline-group {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.timeline-group .timeline.ruler {
		height: var(--track-timeline-ruler-height);
	}

	.timeline-group .timeline-layers {
		flex: 1 1 0%;
	}
</style>