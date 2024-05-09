<template>
	<!-- 图层 -->
	<div class="timeline layer container" ref="containerRef">
		<layer-unit v-for="(item,index) in modelValue" :key="item.id" :data="item" @on-drag="emits('onDrag', $event)">
			<div class="view" v-html="item.view"></div>
		</layer-unit>
	</div>
	<!-- 图层间隙，插入元素 -->
	<div class="timeline layer-gap" ref="layerGapRef"></div>
</template>

<script setup>
	import LayerUnit from './unit.vue'
	import {
		ref,
		watch,
		onMounted
	} from 'vue'

	const emits = defineEmits(['onDrag', 'onDrop'])
	const props = defineProps({
		modelValue: Array,
		dropData: Object
	})
	const containerRef = ref()
	const layerGapRef = ref()

	onMounted(() => {
		// 拖拽至追加位置
		containerRef.value.addEventListener('mouseenter', (event) => {
			if (props.dropData && props.dropData.dragging) {
				containerRef.value.classList.add('graggle')
			} else {
				containerRef.value.classList.remove('graggle')
			}
		});
		containerRef.value.addEventListener('mouseleave', (event) => {
			containerRef.value.classList.remove('graggle')
		});
		containerRef.value.addEventListener('mouseup', (event) => {
			if (containerRef.value.classList.contains('graggle')) {
				emits('onDrop', {
					dropData: props.dropData,
					dropMode: 'appendUnit'
				})
			}
		});
		// 拖拽至新增位置
		layerGapRef.value.addEventListener('mouseenter', (event) => {
			if (props.dropData && props.dropData.dragging) {
				layerGapRef.value.classList.add('graggle')
			} else {
				layerGapRef.value.classList.remove('graggle')
			}
		});
		layerGapRef.value.addEventListener('mouseleave', (event) => {
			layerGapRef.value.classList.remove('graggle')
		});
		layerGapRef.value.addEventListener('mouseup', (event) => {
			if (layerGapRef.value.classList.contains('graggle')) {
				emits('onDrop', {
					dropData: props.dropData,
					dropMode: 'newLayer'
				})
			}
		});
	})
</script>

<style scoped>
	.timeline.layer {
		position: relative;
		background-color: var(--layer-bg);
		height: var(--track-layer);
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
	}
</style>