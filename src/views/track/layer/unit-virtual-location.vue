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
	import {
		useTrackStore
	} from '../../../store/track.js'
	import {
		useEditorDataStore
	} from '../../../store/editor.js'

	const props = defineProps({
		dragData: Object
	})
	const trackStore = useTrackStore()
	const editorDataStore = useEditorDataStore()
	const virtualLocationRef = ref()

	/* 拖拽元素事件虚拟位置显示 */
	const renderVirtualLocation = () => {
		const parentElement = virtualLocationRef.value.parentElement.parentElement;
		let drop = false
		const renderDrag = (event) => {
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