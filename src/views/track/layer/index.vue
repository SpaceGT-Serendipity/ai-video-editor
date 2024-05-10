<template>
	<div class="timeline-layers" ref="layersRef">
		<layer-item v-for="(item,index) in layers" v-model="layers[index]" :last="layers.length==index+1" :drop-data="dragData" @on-drag="onDrag"
			@on-drop="onDrop($event,index)"></layer-item>
		<div class="virtual-location" ref="virtualLocationRef">
			<div v-if="dragData" v-html="dragData.view"></div>
		</div>
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
	const virtualLocationRef = ref()
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
	/*
		拖拽元素事件虚拟位置显示
	*/
	const renderVirtualLocation = () => {
		let drop = false
		const renderDrag = (event) => {
			if (drop && dragData.value && dragData.value.dragging) {
				const mouseY = event.pageY;
				const unitRef = dragData.value.instance.setupState.unitRef
				const rect = unitRef.$el.getBoundingClientRect()
				if (mouseY > (rect.top + dragData.value.h) || mouseY < (rect.top)) {
					virtualLocationRef.value.style.display = 'flex';
					virtualLocationRef.value.style.width = rect.width + 'px';
					virtualLocationRef.value.style.height = rect.width.height + 'px';
					virtualLocationRef.value.style.left = rect.left + 'px';
					virtualLocationRef.value.style.top = (mouseY - dragData.value.h / 2) + 'px';
					return;
				} else {
					virtualLocationRef.value.style.display = 'none'
				}
			}
		}
		layersRef.value.addEventListener('mousedown', (event) => drop = true)
		layersRef.value.addEventListener('mousemove', (event) => {
			if (drop) renderDrag(event)
			else virtualLocationRef.value.style.display = 'none'
		})
		layersRef.value.addEventListener('mouseup', (event) => {
			drop = false
			virtualLocationRef.value.style.display = 'none'
		})
		layersRef.value.addEventListener('mouseleave', (event) => virtualLocationRef.value.style.display = 'none')
	}
	onMounted(() => {
		renderVirtualLocation()
	})
</script>

<style scoped>
	.virtual-location {
		position: absolute;
		display: none;
		width: 200px;
		height: 50px;
		top: 50%;
		background-color: #8885;
		opacity: 0.7;
		border-radius: 5px;
		pointer-events: none;
		font-size: 14px;
		align-items: center;
		z-index: 2;
	}

	.virtual-location * {
		height: 100%;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
