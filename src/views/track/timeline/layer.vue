<template>
	<div class="timeline layer container" ref="containerRef">
		<layer-unit v-for="(item,index) in modelValue" :key="item.id" :title="item.name" :x="item.x" :w="item.w"
			@on-drag="(event) => emits('onDrag', {
				layer: containerRef,
				...event,
				data:item
			})"></layer-unit>
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

	onMounted(() => {
		layerGapRef.value.addEventListener('mouseup', (event) => {
			if (props.dropData) {
				emits('onDrop', props.dropData)
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

	.timeline.layer:hover {}

	.timeline.layer-gap {
		height: 4px;
		margin: 3px 0;
	}

	.timeline.layer-gap:hover {
		background-color: var(--el-color-warning);
	}

	.container {
		display: flex;
		gap: 10px;
		align-items: center;
	}
</style>