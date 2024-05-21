<template>
	<!-- 图层 -->
	<div class="timeline layer container" ref="containerRef">
		<layer-unit v-for="(item,index) in modelValue.units" :key="item.id" :data="item"
			@on-drag="emits('onDrag', $event)">
			<div class="view" v-html="item.view"></div>
		</layer-unit>
	</div>
	<!-- 图层间隙，插入元素 -->
	<div class="timeline layer-gap" ref="layerGapRef" :class="{'last':last}">
		<div v-if="last">插入新的时间线</div>
	</div>
</template>

<script setup>
	import LayerUnit from './unit.vue'
	import {
		ref,
		watch,
		computed,
		onMounted,
		onBeforeUnmount
	} from 'vue'

	const emits = defineEmits(['onDrag', 'onDrop'])
	const props = defineProps({
		modelValue: Object,
		dropData: Object,
		last: Boolean
	})
	const containerRef = ref()
	const layerGapRef = ref()

	function handleContainerMouseenter(event) {
		if (props.dropData && props.dropData.track.dragging) {
			containerRef.value.classList.add('graggle')
		} else {
			containerRef.value.classList.remove('graggle')
		}
	}

	function handleContainerMouseup(event) {
		if (containerRef.value.classList.contains('graggle')) {
			emits('onDrop', {
				dropData: props.dropData,
				dropMode: 'appendUnit'
			})
		}
		containerRef.value.classList.remove('graggle')
	}

	function handleContainerMouseleave(event) {
		containerRef.value.classList.remove('graggle')
	}

	function handleLayerGapMouseenter(event) {
		if (props.dropData && props.dropData.track.dragging) {
			layerGapRef.value.classList.add('graggle')
		} else {
			layerGapRef.value.classList.remove('graggle')
		}
	}

	function handleLayerGapMouseup(event) {
		if (layerGapRef.value.classList.contains('graggle')) {
			emits('onDrop', {
				dropData: props.dropData,
				dropMode: 'newLayer'
			})
		}
		layerGapRef.value.classList.remove('graggle')
	}

	function handleLayerGapMouseleave(event) {
		layerGapRef.value.classList.remove('graggle')
	}

	onMounted(() => {
		props.modelValue.instance = containerRef.value
		// 拖拽至追加位置
		containerRef.value.addEventListener('mouseenter', handleContainerMouseenter);
		containerRef.value.addEventListener('mouseup', handleContainerMouseup);
		containerRef.value.addEventListener('mouseleave', handleContainerMouseleave);
		// 拖拽至新增位置
		layerGapRef.value.addEventListener('mouseenter', handleLayerGapMouseenter);
		layerGapRef.value.addEventListener('mouseup', handleLayerGapMouseup);
		layerGapRef.value.addEventListener('mouseleave', handleLayerGapMouseleave);
	})

	onBeforeUnmount(() => {
		containerRef.value.removeEventListener('mouseenter', handleContainerMouseenter);
		containerRef.value.removeEventListener('mouseup', handleContainerMouseup);
		containerRef.value.removeEventListener('mouseleave', handleContainerMouseleave);
		layerGapRef.value.removeEventListener('mouseenter', handleLayerGapMouseenter);
		layerGapRef.value.removeEventListener('mouseup', handleLayerGapMouseup);
		layerGapRef.value.removeEventListener('mouseleave', handleLayerGapMouseleave);
	})
</script>

<style scoped>
	.timeline.layer {
		position: relative;
		background-color: var(--layer-bg);
		height: var(--track-layer-height);
	}

	.timeline.layer.graggle {
		background-color: var(--layer-graggle-bg);
	}

	.timeline.layer-gap {
		height: 4px;
		margin: 3px 0;
	}

	.timeline.layer-gap.graggle {
		background-color: var(--el-color-warning);
		opacity: 0.6;
	}

	.timeline.layer-gap.last {
		height: var(--track-layer-height);
		line-height: var(--track-layer-height);
		margin: 0;
	}

	.timeline.layer-gap.last div {
		display: none;
		margin-left: 20px;
	}

	.timeline.layer-gap.last.graggle div {
		display: initial;
	}

	.container {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.layer-unit {
		display: flex;
		align-items: center;
	}

	.layer-unit .view {
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		height: 100%;
		min-width: calc(var(--track-layer-height) * 16 / 9);
	}
</style>