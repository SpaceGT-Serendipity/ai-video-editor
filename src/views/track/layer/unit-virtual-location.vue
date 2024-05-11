<template>
	<div class="virtual-location" ref="virtualLocationRef">
		<div v-if="dragData" v-html="dragData.view"></div>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const props = defineProps({
		dragData: Object
	})

	const virtualLocationRef = ref()

	/* 拖拽元素事件虚拟位置显示 */
	const renderVirtualLocation = () => {
		const parentElement = virtualLocationRef.value.parentElement.parentElement;
		let drop = false
		const renderDrag = (event) => {
			if (drop && props.dragData && props.dragData.dragging) {
				const mouseY = event.pageY;
				const parentX = parentElement.offsetLeft;
				const parentY = parentElement.offsetTop
				const parentScrollX = parentElement.scrollLeft
				const unitRef = props.dragData.instance.setupState.unitRef
				const rect = unitRef.$el.getBoundingClientRect()
				if (mouseY > (rect.top + props.dragData.h) || mouseY < (rect.top)) {
					virtualLocationRef.value.style.display = 'flex';
					virtualLocationRef.value.style.width = rect.width + 'px';
					virtualLocationRef.value.style.height = rect.width.height + 'px';
					virtualLocationRef.value.style.left = (rect.left - parentX + parentScrollX) + 'px';
					virtualLocationRef.value.style.top = (mouseY - parentY - props.dragData.h / 2) + 'px';
					return;
				} else {
					virtualLocationRef.value.style.display = 'none'
				}
			}
		}
		parentElement.addEventListener('mousedown', (event) => drop = true)
		parentElement.addEventListener('mousemove', (event) => {
			if (drop) renderDrag(event)
			else virtualLocationRef.value.style.display = 'none'
		})
		parentElement.addEventListener('mouseup', (event) => {
			drop = false
			virtualLocationRef.value.style.display = 'none'
		})
		parentElement.addEventListener('mouseleave', (event) => virtualLocationRef.value.style.display = 'none')
	}

	onMounted(() => {
		renderVirtualLocation()
	})
</script>

<style>
</style>