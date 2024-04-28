<template>
	<div class="timeline-layers" ref="layersRef">
		<timeline-layer v-for="(item,index) in layers" v-model="layers[index]" :drop-data="dragData" @on-drag="onDrag"
			@on-drop="onDrop"></timeline-layer>
		<div v-if="dragData">
			{{dragData.position}}
		</div>
		<div class="virtual-location" ref="virtualLocationRef">
			<div v-if="dragData">
				{{dragData.data}}
			</div>
		</div>
	</div>
</template>

<script setup>
	import TimelineLayer from './layer.vue'

	import {
		ref,
		onMounted
	} from 'vue'

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

	const onDrop = (event) => {
		const index = layers.value.findIndex(layer => layer.findIndex(unit => unit.id == event.data.id) > -1)
		layers.value.splice(index, 0, [event.data]);
	}
	onMounted(() => {
		let drop = false
		const renderDrag = (event) => {
			if (drop && dragData.value) {
				if (dragData.value.position.dragging) {
					const mouseX = event.pageX;
					const mouseY = event.pageY;
					const rect = dragData.value.unit.$el.getBoundingClientRect()
					if (mouseY > (rect.top + dragData.value.position.h) ||
						mouseY < (rect.top)) {
						virtualLocationRef.value.style.display = 'initial';
						virtualLocationRef.value.style.width = dragData.value.position.w + 'px';
						virtualLocationRef.value.style.height = dragData.value.position.h + 'px';
						virtualLocationRef.value.style.top = (mouseY - dragData.value.position.h / 2) + 'px';
						virtualLocationRef.value.style.left = (mouseX - dragData.value.position.w / 2) + 'px';
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