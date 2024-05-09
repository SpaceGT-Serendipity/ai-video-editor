<template>
	<div class="track">
		<toolbar v-if="haveResources" ref="toolbarRef" @change-scale="handleToolberChangeScale"></toolbar>
		<div class="view" ref="dropZoneRef"
			:style="{'position':isOverDropZone||resourceDragStore.data?'relative':'initial'}">
			<div class="controller-group" v-if="haveResources">
				<controller-layer v-for="i in 2"></controller-layer>
			</div>
			<div v-if="haveResources" class="scrollbar" ref="scrollbarRef">
				<div class="timeline-group">
					<timeline-ruler ref="timelineRulerRef" :scale="scale" :time="1000 * 60 * 10" :scale-width="200"
						:scale-time="1000 * 10"></timeline-ruler>
					<layer-centre ref="timelineLayersRef" v-model="layers" :scale="scale"
						@on-drag="handleTimelineLayersOnDrag"></layer-centre>
				</div>
			</div>
			<el-empty v-else :image-size="80" description="暂无内容,点击左侧资源栏素材到此处" />
			<div v-show="isOverDropZone||resourceDragStore.data" class="upload-drag_tip" ref="uploadDragTipRef">
				加载资源到轨道
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		LayerUnit
	} from '../../bean/LayerUnit.js'
	import {
		TextResource,
		ImageResource,
		VideoResource
	} from '../../bean/Resource.js'
	import Toolbar from './toolbar/index.vue'
	import ControllerLayer from './controller/layer.vue'
	import LayerCentre from './layer/index.vue'
	import TimelineRuler from './ruler/index.vue'
	import {
		useDropZone
	} from '@vueuse/core'
	import {
		ref,
		onMounted,
		nextTick
	} from 'vue'
	import {
		useResourceDragStore
	} from '../../store/resource-drag.js'

	const resourceDragStore = useResourceDragStore()
	const toolbarRef = ref()
	const timelineRulerRef = ref()
	const timelineLayersRef = ref()
	const dropZoneRef = ref()
	const uploadDragTipRef = ref()
	const scrollbarRef = ref()
	const haveResources = ref(true)
	const scale = ref(1)
	const layers = ref([
		[
			new LayerUnit(new TextResource('心若向阳，无畏悲伤。让阳光洒满每个角落，点亮我们的人生之旅。'), 0, 200),
			new LayerUnit(new TextResource('把所有的温柔和可爱都设置成了仅你可见。'), 300, 100),
			new LayerUnit(new TextResource('梦想是一盏明灯，照亮我们前行的路，无论风雨多大，我们都要坚持不懈。'), 500, 200),
		],
		[
			new LayerUnit(new ImageResource('Image',
				'https://oss.file.yigee.cn/video/cover/690715a2-002e-4049-88b5-47c37cdf7bf2.png'), 200, 300),
			new LayerUnit(new VideoResource('Video', 'https://xxxx',
					'https://mobvoi-digitalhuman-public.weta365.com/d6936343496645138d2f525685fed91e.png'),
				600, 400),
		]
	])

	/* 本地文件拖拽 */
	const {
		isOverDropZone
	} = useDropZone(dropZoneRef, {
		onDrop(files) {
			files.forEach(file => {
				layers.value.push([new LayerUnit(new ImageResource(file.name, URL.createObjectURL(file)),
					0,
					300)])
			})
		},
		dataTypes: ['image/jpeg', 'image/png']
	})
	const handleToolberChangeScale = (data) => {
		scale.value = data.toFixed(2) * 1
	}
	const handleTimelineLayersOnDrag = (event) => {
		const last_position = event.x + event.w
		timelineRulerRef.value.resize(last_position)
	}

	const dragResourceToUploadDragTip = () => {
		uploadDragTipRef.value.addEventListener('mouseenter', (event) => {
			console.log(event)
			if (resourceDragStore.data) {
				const resource =
					new ImageResource(resourceDragStore.data.name, resourceDragStore.data.cover)
				resourceDragStore.data = null
				nextTick(() => {
					const unit_w = 300;
					const unit = new LayerUnit(resource,
						event.pageX +
						scrollbarRef.value.scrollLeft -
						scrollbarRef.value.offsetLeft -
						(unit_w / 2), unit_w)
					layers.value.push([unit])
					// 主动触发单元点击事件
					nextTick(() => unit.instance.exposed.onMousedown(event))
				})
			}
		})
	}

	onMounted(() => {
		dragResourceToUploadDragTip()
	})
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

	.track .view .upload-drag_tip {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #fff4;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 4px dashed #2266;
		box-sizing: border-box;
		font-size: 24px;
		color: var(--el-text-color-regular);
	}

	.track .el-empty {
		height: calc(100% - 40px);
		margin: 20px;
		background-color: #2e2e35;
		border: 1px dashed #505057;
		border-radius: 4px;
		width: 100%;
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