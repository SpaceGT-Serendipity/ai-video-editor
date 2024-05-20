<template>
	<!-- 图层 -->
	<div class="timeline layer container" ref="containerRef">
		<layer-unit v-for="(item,index) in modelValue.units" :key="item.id" :data="item" @on-drag="emits('onDrag', $event)">
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
		onMounted,
		computed,
		getCurrentInstance
	} from 'vue'

	const instance = getCurrentInstance()
	const emits = defineEmits(['onDrag', 'onDrop'])
	const props = defineProps({
		modelValue: Object,
		dropData: Object,
		last: Boolean
	})
	const containerRef = ref()
	const layerGapRef = ref()

	onMounted(() => {
		props.modelValue.instance = instance
		// 拖拽至追加位置
		containerRef.value.addEventListener('mouseenter', (event) => {
			if (props.dropData && props.dropData.track.dragging) {
				containerRef.value.classList.add('graggle')
			} else {
				containerRef.value.classList.remove('graggle')
			}
		});
		containerRef.value.addEventListener('mouseup', (event) => {
			if (containerRef.value.classList.contains('graggle')) {
				emits('onDrop', {
					dropData: props.dropData,
					dropMode: 'appendUnit'
				})
			}
			containerRef.value.classList.remove('graggle')
		});
		containerRef.value.addEventListener('mouseleave', (event) => {
			containerRef.value.classList.remove('graggle')
		});
		// 拖拽至新增位置
		layerGapRef.value.addEventListener('mouseenter', (event) => {
			if (props.dropData && props.dropData.track.dragging) {
				layerGapRef.value.classList.add('graggle')
			} else {
				layerGapRef.value.classList.remove('graggle')
			}
		});
		layerGapRef.value.addEventListener('mouseup', (event) => {
			if (layerGapRef.value.classList.contains('graggle')) {
				emits('onDrop', {
					dropData: props.dropData,
					dropMode: 'newLayer'
				})
			}
			layerGapRef.value.classList.remove('graggle')
		});
		layerGapRef.value.addEventListener('mouseleave', (event) => {
			layerGapRef.value.classList.remove('graggle')
		});
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
		min-width: calc(var(--track-layer-height) * 16 / 9) ;
	}
	
	
</style>