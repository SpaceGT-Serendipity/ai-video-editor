<template>
	<div class="window-resize" :class="{
		'column':direction=='column',
		'row':direction=='row'
	}" ref="windowResizeRef">
		<div class="fill left"></div>
		<div class="fill right"></div>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'

	const props = defineProps({
		direction: {
			type: String,
			default: 'column' // row column
		},
	})
	const windowResizeRef = ref()
	const parentDocument = ref()
	const frontDocument = ref()
	const backDocument = ref()
	const dragging = ref(false)
	const startPosition = reactive({
		x: 0,
		y: 0,
		front: {
			width: 0,
			height: 0
		},
		back: {
			width: 0,
			height: 0
		}
	})

	const percentageFormatting = (numerator, denominator) => {
		return (numerator / denominator * 100) + '%'
	}
	const resize = (distance) => {
		const parentWidth = parentDocument.value.clientWidth
		const parentHeight = parentDocument.value.clientHeight
		if (props.direction == 'row') {
			frontDocument.value.style.width =
				percentageFormatting(startPosition.front.width + distance, parentWidth)
			backDocument.value.style.width =
				percentageFormatting(startPosition.back.width - distance, parentWidth)
		} else
		if (props.direction == 'column') {
			frontDocument.value.style.height =
				percentageFormatting(startPosition.front.height + distance, parentHeight)
			backDocument.value.style.height =
				percentageFormatting(startPosition.back.height - distance, parentHeight)
		}

	}
	const adjacentElement = () => {
		const elements = parentDocument.value.children;
		let index = 0
		while (index < elements.length) {
			if (elements.item(index) == windowResizeRef.value) {
				frontDocument.value = elements.item(index - 1)
				backDocument.value = elements.item(index + 1)
				break;
			}
			index++;
		}
		startPosition.front.width = frontDocument.value.clientWidth;
		startPosition.front.height = frontDocument.value.clientHeight;
		startPosition.back.width = backDocument.value.clientWidth;
		startPosition.back.height = backDocument.value.clientHeight;
	}

	onMounted(() => {
		parentDocument.value = windowResizeRef.value.parentElement;
		windowResizeRef.value.addEventListener('mousedown', (event) => {
			adjacentElement()
			startPosition.x = event.pageX || event.clientX + document.body.scrollLeft;
			startPosition.y = event.pageY || event.clientY + document.body.scrollTop;
			dragging.value = true
			if (props.direction == 'row')
				parentDocument.value.style.cursor = 'col-resize'
			else if (props.direction == 'column')
				parentDocument.value.style.cursor = 'row-resize'
		})
		parentDocument.value.addEventListener('mousemove', (event) => {
			if (dragging.value) {
				const currentPosition = {
					x: event.pageX || event.clientX + document.body.scrollLeft,
					y: event.pageY || event.clientY + document.body.scrollTop
				}
				let distance = 0
				if (props.direction == 'row')
					distance = (Math.abs(currentPosition.x) - Math.abs(startPosition.x))
				else if (props.direction == 'column')
					distance = (Math.abs(currentPosition.y) - Math.abs(startPosition.y))

				resize(distance)
			}
		})
		parentDocument.value.addEventListener('mouseup', (event) => {
			dragging.value = false
			parentDocument.value.style.cursor = 'initial'
		});
	})
</script>

<style scoped>
	.window-resize {
		position: relative;
	}

	.window-resize.column {
		height: 4px;
		background-color: var(--el-border-color);
		cursor: row-resize;
		flex: 0 0 4px;
	}

	.window-resize.row {
		width: 4px;
		background-color: var(--el-border-color);
		cursor: col-resize;
		flex: 0 0 4px;
	}
</style>