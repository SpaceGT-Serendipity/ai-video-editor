<template>
	<div class="timeline-layers" ref="layersRef">
		<layer-item v-for="(item,index) in layers" v-model="layers[index]" :last="layers.length==index+1"
			:drop-data="dragData" @on-drag="onDrag($event,index)" @on-drop="onDrop($event,index)"></layer-item>
	</div>
</template>

<script setup>
	import LayerItem from './item.vue'
	import {
		ref,
		onMounted,
		watch,
		nextTick
	} from 'vue'
	import {
		v4 as uuidv4
	} from 'uuid'

	const emits = defineEmits(['onDrag'])
	const props = defineProps({
		scale: {
			type: Number,
			default: 1
		}, // 刻度缩放 defult 1
		modelValue: {
			type: Array
		}
	})
	const layers = ref(props.modelValue)
	const layersRef = ref()
	const dragData = ref(null)

	watch(() => props.scale, (value) => {
		layers.value.forEach(layer => {
			layer.forEach(unit => unit.scale = value)
		})
	})

	const onDrag = (event, index) => {
		dragData.value = event
		// 告知上级有元素移动，更新时间轴长度
		emits('onDrag', event)
		// 拖拽结束后(不选择拖拽中进行节省性能,所以拖拽中可以重合,用户体验良好)进行一个x坐标的排序，并且如果有重合调整坐标，保证友好的顺序以及不重合。
		if (!event.dragging) {
			sortLayers()
		}
	}
	const onDrop = (event, newIndex) => {
		// 元素放置到新图层
		if (event.dropMode == 'newLayer')
			layers.value.splice(newIndex + 1, 0, [event.dropData.clone()]);
		// 元素追加到现有图层
		if (event.dropMode == 'appendUnit')
			layers.value[newIndex].push(event.dropData.clone())
		// 删除之前位置的元素
		for (let i = 0; i < layers.value.length; i++) {
			const layer = layers.value[i];
			for (let j = 0; j < layer.length; j++) {
				// 删除元素
				if (layer[j].id == event.dropData.id) layer.splice(j, 1)
			}
			// 清除空图层
			if (layer.length == 0) layers.value.splice(i, 1)
			// 拖拽结束后(不选择拖拽中进行节省性能,所以拖拽中可以重合,用户体验良好)进行一个x坐标的排序，并且如果有重合调整坐标，保证友好的顺序以及不重合。
			sortLayers()
		}
	}

	const sortLayers = () => {
		for (let i = 0; i < layers.value.length; i++) {
			layers.value[i].sort((a, b) => a.x - b.x)
		}
		smoothnessLayers()
	}
	const smoothnessLayers = () => {
		for (let i = 0; i < layers.value.length; i++) {
			const layer = layers.value[i]
			for (let j = 0; j < layer.length - 1; j++) {
				const current = layer[j];
				const next = layer[j + 1];
				if (current.x + current.w > next.x) next.x = current.x + current.w
			}
		}
	}
</script>

<style scoped>
</style>