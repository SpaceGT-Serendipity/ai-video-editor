<template>
	<div class="timeline-layers" ref="layersRef">
		<layer-item v-for="(item,index) in layers" v-model="layers[index]" :last="layers.length==index+1"
			:drop-data="dragData" @on-drag="onDrag" @on-drop="onDrop($event,index)"></layer-item>
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

	const onDrag = (event) => {
		dragData.value = event
		// 告知上级有元素移动，更新时间轴长度
		emits('onDrag', event)
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
		}
	}
</script>

<style scoped>
</style>