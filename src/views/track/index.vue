<template>
	<div class="track" :style="{
		'--controller-group-width':`${trackStore.controllerGroupWidth}px`,
		'--track-layer-height':`${trackStore.layerHeight}px`,
		'--track-timeline-ruler-height':`${trackStore.rulerHeight}px`
	}">
		<toolbar ref="toolbarRef"></toolbar>
		<div class="view" ref="dropZoneRef"
			:style="{'position':isOverDropZone||resourceDragStore.data?'relative':'initial'}">
			<div v-show="haveResources" class="controller-group" ref="controllerGroupRef">
				<controller-layer v-for="item in layersDataStore.layers" :key="item.id" :data="item"></controller-layer>
			</div>
			<div v-show="haveResources" class="scrollbar" ref="scrollbarRef">
				<div class="debug float">
					Scrollbar Mouse X : {{scrollbar.scrollbarMouseX}}
				</div>
				<div class="timeline-group">
					<timeline-ruler ref="timelineRulerRef" :time="trackStore.rulerDefultTime"
						:scale-width="trackStore.rulerScaleWidth"
						:scale-time="trackStore.rulerScaleTime"></timeline-ruler>
					<layer-centre ref="timelineLayersRef" v-model="layersDataStore.layers"
						@on-drag="handleTimelineLayersOnDrag"></layer-centre>
					<timeline-seeker></timeline-seeker>
					<layer-unit-virtual-location :drag-data="dragData"></layer-unit-virtual-location>
				</div>
			</div>
			<el-empty v-show="!haveResources" :image-size="80" description="暂无内容,请选择左侧资源栏素材到此处" />
			<div v-show="isOverDropZone||resourceDragStore.data" class="upload-drag_tip" ref="uploadDragTipRef">
				加载资源到轨道
			</div>
		</div>
	</div>
</template>

<script setup>
	import Toolbar from './toolbar/index.vue'
	import ControllerLayer from './controller/layer.vue'
	import LayerCentre from './layer/index.vue'
	import LayerUnitVirtualLocation from './layer/unit-virtual-location.vue'
	import TimelineRuler from './ruler/index.vue'
	import TimelineSeeker from './seeker/index.vue'
	import LayerUnit from '../../bean/LayerUnit.js'
	import Layer from '../../bean/Layer.js'
	import {
		TextResource,
		ImageResource,
		VideoResource
	} from '../../bean/Resource.js'
	import {
		useDropZone,
		useMouse
	} from '@vueuse/core'
	import {
		ref,
		reactive,
		nextTick,
		computed,
		watch,
		onMounted,
		onBeforeUnmount
	} from 'vue'
	import {
		useResourceDragStore
	} from '../../store/resource.js'
	import {
		useTrackStore
	} from '../../store/track.js'
	import {
		useLayersDataStore
	} from '../../store/layers.js'

	const trackStore = useTrackStore()
	const layersDataStore = useLayersDataStore()
	const resourceDragStore = useResourceDragStore()
	const toolbarRef = ref()
	const timelineRulerRef = ref()
	const timelineLayersRef = ref()
	const dropZoneRef = ref()
	const controllerGroupRef = ref()
	const uploadDragTipRef = ref()
	const dragData = ref(null)
	const haveResources = computed(() => layersDataStore.layers.length > 0)
	const scrollbarRef = ref()
	const scrollbar = reactive({
		paddingLeft: trackStore.trackTimelineScrollbarPaddingLeft,
		scrollbarMouseX: 0,
		scrollbarMouse: useMouse({
			target: scrollbarRef,
			type: (event) => [event.x, event.y]
		})
	})
	watch(() => scrollbar.scrollbarMouse.x, (value) => {
		scrollbar.scrollbarMouseX = value -
			scrollbarRef.value.offsetLeft -
			scrollbar.paddingLeft +
			scrollbarRef.value.scrollLeft
	})

	/* 本地文件拖拽 */
	const {
		isOverDropZone
	} = useDropZone(dropZoneRef, {
		onDrop(files) {
			files.forEach(file => {
				layersDataStore.layers.push(
					Layer.list(new LayerUnit({
						resource: new ImageResource({
							name: file.name,
							url: URL.createObjectURL(file)
						})
					}))
				)
			})
		},
		dataTypes: ['image/jpeg', 'image/png']
	})

	const handleTimelineLayersOnDrag = (event) => {
		dragData.value = event
		const last_position = event.x + event.w
		timelineRulerRef.value.resize(last_position)
	}
	/* 拖拽资源到面板添加元素  */
	function handleDragResourceToUploadDragTip(event) {
		if (resourceDragStore.data) {
			const resource = resourceDragStore.data
			resourceDragStore.data = null
			nextTick(() => {
				const unit = new LayerUnit({
					resource: resource.clone()
				})
				// 元素坐标
				const x =
					// 鼠标位置
					event.pageX +
					// 滚动调位置
					scrollbarRef.value.scrollLeft -
					// 图层区域左侧距离（轨道区左侧距离+控制区域宽度）
					(dropZoneRef.value.offsetLeft + trackStore.controllerGroupWidth) -
					// 单元宽度的一半，指针指向中间
					(unit.track.w / 2)
				unit.track.x = x;
				layersDataStore.layers.push(Layer.list(unit))
				// 主动触发单元点击事件
				nextTick(() => unit.track.onMousedown(event))
			})
		}
	}
	/*  轨道图层管理和图层编辑滚动条同步 */
	function handleScrollbarSynchronization(event) {
		timelineLayersRef.value.$el.scrollTop = event.target.scrollTop
		controllerGroupRef.value.scrollTop = event.target.scrollTop
	}
	/* 点击 scrollbar 设置 seeker 位置，以及点击空白区域取消元素的激活状态 */
	function handleScrollbarMouseDown(event) {
		const unit = layersDataStore.getUnitUnderMouse(event)
		if (unit == null) {
			trackStore.setSeeker(scrollbar.scrollbarMouseX)
			layersDataStore.setUnitActive(null)
		}
	}

	onMounted(() => {
		uploadDragTipRef.value.addEventListener('mouseenter', handleDragResourceToUploadDragTip)
		controllerGroupRef.value.addEventListener('scroll', handleScrollbarSynchronization)
		timelineLayersRef.value.$el.addEventListener('scroll', handleScrollbarSynchronization)
		scrollbarRef.value.addEventListener('mousedown', handleScrollbarMouseDown)
	})
	onBeforeUnmount(() => {
		uploadDragTipRef.value.removeEventListener('mouseenter', handleDragResourceToUploadDragTip)
		controllerGroupRef.value.removeEventListener('scroll', handleScrollbarSynchronization)
		timelineLayersRef.value.$el.removeEventListener('scroll', handleScrollbarSynchronization)
		scrollbarRef.value.removeEventListener('mousedown', handleScrollbarMouseDown)
	})
</script>

<style scoped>
	.track {
		display: flex;
		flex-direction: column;
	}

	.track .view {
		display: flex;
		flex: 1 1 0%;
		overflow: hidden;
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
		background-color: var(--el-empty-bg);
		border: 1px dashed #505057;
		border-radius: 4px;
		width: 100%;
	}

	.controller-group {
		flex: 0 0 150px;
		margin-top: var(--track-timeline-ruler-height);
		overflow-y: auto;
		overflow-x: hidden;
		padding-bottom: calc(var(--track-layer-height) + 8px);
	}

	.controller-group::-webkit-scrollbar {
		width: 1px;
	}

	.controller-group .controller.layer {
		padding: 0 20px;
		height: var(--track-layer-height);
		margin-bottom: 12px;
	}

	.controller-group .controller.layer:first-child {
		margin-top: 12px;
	}

	.controller-group .controller.layer:last-child {
		margin-bottom: 0;
	}


	.timeline-group {
		position: relative;
		display: flex;
		flex-direction: column;
		width: max-content;
		min-width: 200vw;
		height: 100%;
	}

	.timeline-group .timeline.ruler {
		flex: 0 0 var(--track-timeline-ruler-height);
	}

	.timeline-group .timeline-layers {
		flex: 1 1 0%;
		overflow-y: auto;
	}

	.timeline-group .timeline-layers::-webkit-scrollbar {
		width: 0px;
	}

	.scrollbar {
		height: 100%;
		overflow-y: hidden;
		overflow-x: auto;
		padding-left: 5px;
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
		height: 8px;
	}

	.scrollbar:hover::-webkit-scrollbar {
		height: 8px;
		background-color: var(--scrollbar-background-color);
		cursor: pointer;
	}
</style>