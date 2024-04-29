<template>
	<div class="timeline layer container" ref="containerRef">
		<layer-unit v-for="(item,index) in modelValue" :key="item.id" :x="item.x" :w="item.w"
			@on-drag="onDrag($event,item)" @on-resize="onResize($event,index)">
			<div class="name">{{item.name}}</div>
		</layer-unit>
	</div>
	<div class="timeline layer-gap" ref="layerGapRef"></div>
</template>

<script setup>
	import LayerUnit from './layer-unit.vue'
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

	const onDrag = (event, data) => {
		emits('onDrag', {
			layer: containerRef.value,
			...event,
			data
		})
	}
	const onResize = (unitPosition, unitIndex) => {
		props.modelValue[unitIndex].x = unitPosition.x
		props.modelValue[unitIndex].w = unitPosition.w
	}

	onMounted(() => {
		layerGapRef.value.addEventListener('mouseenter', (event) => {
			if (props.dropData && props.dropData.position.dragging) {
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
					...props.dropData,
					dropMode: 'newLayer'
				})
			}
		});

		containerRef.value.addEventListener('mouseenter', (event) => {
			if (props.dropData && props.dropData.position.dragging) {
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
					...props.dropData,
					dropMode: 'appendUnit'
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

	.layer-unit .name {
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
</style>