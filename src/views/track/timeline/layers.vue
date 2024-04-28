<template>
	<div class="timeline-layers" ref="layersRef">
		<timeline-layer v-for="(item,index) in layers" v-model="layers[index]" :drop-data="dragData" @on-drag="onDrag"
			@on-drop="onDrop($event,index)"></timeline-layer>
		<div class="virtual-location" ref="virtualLocationRef">
			<div v-if="dragData"> {{dragData.data.name}} </div>
		</div>
	</div>
</template>

<script setup>
	import TimelineLayer from './layer.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		v4 as uuidv4
	} from 'uuid'

	const layersRef = ref()
	const virtualLocationRef = ref()
	const layers = ref([
		[{
			name: 'Joao',
			id: '1',
			x: 100,
			w: 200
		}, {
			name: 'Jean',
			id: '2',
			x: 500,
			w: 300
		}],
		[{
			name: '2-Joao',
			id: '2-1',
			x: 0,
			w: 100
		}, {
			name: '2-Jean',
			id: '2-2',
			x: 200,
			w: 200
		}]
	])
	const dragData = ref(null)

	const onDrag = (event) => {
		dragData.value = event
	}

	const onDrop = (event, newIndex) => {
		if (event.dropMode == 'newLayer')
			layers.value.splice(newIndex + 1, 0, [{
				...event.data,
				id: uuidv4()
			}]);
		if (event.dropMode == 'appendUnit')
			layers.value[newIndex].push({
				...event.data,
				id: uuidv4()
			})
		for (let i = 0; i < layers.value.length; i++) {
			const layer = layers.value[i];
			for (let j = 0; j < layer.length; j++) {
				const unit = layer[j];
				if (unit.id == event.data.id) {
					layer.splice(j, 1)
				}
			}
			if (layer.length == 0) {
				layers.value.splice(i, 1)
			}
		}
	}
	onMounted(() => {
		let drop = false
		const renderDrag = (event) => {
			if (drop && dragData.value) {
				if (dragData.value.position.dragging) {
					const mouseY = event.pageY;
					const rect = dragData.value.unit.$el.getBoundingClientRect()
					if (mouseY > (rect.top + dragData.value.position.h) ||
						mouseY < (rect.top)) {
						virtualLocationRef.value.style.display = 'initial';
						virtualLocationRef.value.style.width = rect.width + 'px';
						virtualLocationRef.value.style.height = rect.width.height + 'px';
						virtualLocationRef.value.style.left = rect.left + 'px';
						virtualLocationRef.value.style.top = (mouseY - dragData.value.position.h / 2) + 'px';
						return;
					}
				}
			}
			virtualLocationRef.value.style.display = 'none'
		}
		layersRef.value.addEventListener('mousedown', (event) => {
			drop = true
			renderDrag(event)
		})
		layersRef.value.addEventListener('mousemove', (event) => {
			if (drop) renderDrag(event)
		})
		layersRef.value.addEventListener('mouseup', (event) => {
			drop = false
			renderDrag(event)
		})
		layersRef.value.addEventListener('mouseleave', (event) => {
			drop = false
			renderDrag(event)
		})
	})
</script>

<style scoped>
	.virtual-location {
		position: absolute;
		display: none;
		width: 200px;
		height: 50px;
		top: 50%;
		background-color: #9996;
		border-radius: 5px;
		pointer-events: none;
	}
</style>