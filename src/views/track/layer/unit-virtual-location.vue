<template>
	<div class="virtual-location" ref="virtualLocationRef">
		<div v-if="dragData" v-html="dragData.view"></div>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onBeforeUnmount
	} from 'vue'
	import {
		useTrackStore
	} from '../../../store/track.js'

	const props = defineProps({
		dragData: Object
	})
	const trackStore = useTrackStore()
	const virtualLocationRef = ref()

	let parentElement = null;
	let drop = false

	function renderDrag(event) {
		if (drop && props.dragData && props.dragData.track.dragging) {
			const mouseY = event.pageY;
			const rect = props.dragData.track.instance.getBoundingClientRect()
			if (mouseY > (rect.top + props.dragData.track.h) || mouseY < (rect.top)) {
				const parentX = parentElement.offsetLeft + trackStore.trackTimelineScrollbarPaddingLeft;
				const parentY = parentElement.offsetTop;
				const parentScrollX = parentElement.scrollLeft;
				virtualLocationRef.value.style.display = 'flex';
				virtualLocationRef.value.style.width = rect.width + 'px';
				virtualLocationRef.value.style.height = rect.width.height + 'px';
				virtualLocationRef.value.style.left = (rect.left - parentX + parentScrollX) + 'px';
				virtualLocationRef.value.style.top = (mouseY - parentY - props.dragData.track.h / 2) + 'px';
				return;
			} else {
				virtualLocationRef.value.style.display = 'none'
			}
		}
	}

	function handleMousedown(event) {
		drop = true
	}

	function handleMousemove(event) {
		if (drop) renderDrag(event)
		else virtualLocationRef.value.style.display = 'none'
	}

	function handleMouseup(event) {
		drop = false
		virtualLocationRef.value.style.display = 'none'
	}

	function handleMouseleave(event) {
		virtualLocationRef.value.style.display = 'none'
	}

	onMounted(() => {
		/* 拖拽元素事件显示虚拟位置 */
		parentElement = virtualLocationRef.value.parentElement.parentElement;
		parentElement.addEventListener('mousedown', handleMousedown)
		parentElement.addEventListener('mousemove', handleMousemove)
		parentElement.addEventListener('mouseup', handleMouseup)
		parentElement.addEventListener('mouseleave', handleMouseleave)
	})

	onBeforeUnmount(() => {
		parentElement.removeEventListener('mousedown', handleMousedown)
		parentElement.removeEventListener('mousemove', handleMousemove)
		parentElement.removeEventListener('mouseup', handleMouseup)
		parentElement.removeEventListener('mouseleave', handleMouseleave)
	})
</script>

<style>
</style>